import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/test-utils';

import { HomePage } from './index';

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

describe('HomePage', () => {
    it('renders heading and description', () => {
        renderWithProviders(<HomePage />);

        expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument();
        expect(
            screen.getByText(/This is your enterprise-grade React template/i)
        ).toBeInTheDocument();
    });

    it('renders feedback section with form', () => {
        renderWithProviders(<HomePage />);

        expect(screen.getByRole('heading', { name: /Have suggestions\?/i })).toBeInTheDocument();
        expect(screen.getByText(/We are constantly improving the service/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Your email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/What can be improved/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Send feedback/i })).toBeInTheDocument();
    });
});
