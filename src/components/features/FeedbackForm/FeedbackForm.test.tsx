import { fireEvent, screen, waitFor } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { FEEDBACK_SOURCES } from '@/constants/feedback';
import { renderWithProviders } from '@/test/test-utils';

import { FeedbackForm } from './';

vi.mock('@/store/feedback/feedbackStore', () => ({
    useFeedbackStore: {
        use: {
            sendFeedback: vi.fn(() => Promise.resolve()),
            isSubmitting: vi.fn(() => false),
            error: vi.fn(() => null),
            reset: vi.fn(() => {})
        }
    }
}));

vi.mock('lucide-react', () => ({
    Loader2: () => <div data-testid="loader" />,
    Send: () => <div data-testid="send-icon" />,
    Star: ({ className, ...props }: ComponentProps<'div'>) => (
        <div data-testid="star" className={className} {...props} />
    )
}));

describe('FeedbackForm', () => {
    it('renders form fields', () => {
        renderWithProviders(<FeedbackForm source={FEEDBACK_SOURCES.FOOTER} />);

        expect(screen.getByPlaceholderText(/Your email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/What can be improved/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Send feedback/i })).toBeInTheDocument();
    });

    it('shows validation errors for invalid email', async () => {
        renderWithProviders(<FeedbackForm source={FEEDBACK_SOURCES.FOOTER} />);

        const emailInput = screen.getByPlaceholderText(/Your email/i);
        const messageInput = screen.getByPlaceholderText(/What can be improved/i);

        fireEvent.change(messageInput, {
            target: { value: 'Valid message with enough characters' }
        });
        fireEvent.blur(messageInput);

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.blur(emailInput);

        await waitFor(
            () => {
                expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
            },
            { timeout: 2000 }
        );
    });

    it('shows validation errors for short message', async () => {
        renderWithProviders(<FeedbackForm source={FEEDBACK_SOURCES.FOOTER} />);

        const messageInput = screen.getByPlaceholderText(/What can be improved/i);
        const submitBtn = screen.getByRole('button', { name: /Send feedback/i });

        fireEvent.change(messageInput, { target: { value: 'short' } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText(/Value is too short/i)).toBeInTheDocument();
        });
    });

    it('handles rating selection', async () => {
        renderWithProviders(<FeedbackForm source={FEEDBACK_SOURCES.FOOTER} />);

        const stars = screen.getAllByTestId('star');
        fireEvent.click(stars[4].parentElement!);
    });
});
