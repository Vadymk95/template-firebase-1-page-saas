import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { FeedbackSource } from '@/constants/feedback';
import { db } from '@/lib/firebase';

import { createSelectors } from '../utils/createSelectors';

export interface FeedbackData {
    email: string;
    message: string;
    rating?: number;
    source?: FeedbackSource;
}

interface FeedbackState {
    isSubmitting: boolean;
    error: string | null;
    sendFeedback: (data: FeedbackData) => Promise<void>;
    reset: () => void;
}

const useFeedbackStoreBase = create<FeedbackState>()(
    devtools(
        (set) => ({
            isSubmitting: false,
            error: null,
            sendFeedback: async (data: FeedbackData) => {
                set({ isSubmitting: true, error: null }, false, {
                    type: 'feedback-store/send/start'
                });

                try {
                    const feedbackData: Record<string, unknown> = {
                        email: data.email,
                        message: data.message,
                        createdAt: serverTimestamp(),
                        userAgent: navigator.userAgent
                    };

                    if (data.rating !== undefined && data.rating > 0) {
                        feedbackData.rating = data.rating;
                    }

                    if (data.source) {
                        feedbackData.source = data.source;
                    }

                    await addDoc(collection(db, 'feedbacks'), feedbackData);

                    set({ isSubmitting: false, error: null }, false, {
                        type: 'feedback-store/send/success'
                    });
                } catch (error) {
                    if (import.meta.env.DEV) {
                        console.error('Error sending feedback:', error);
                    }

                    const errorCode =
                        error instanceof Error
                            ? error.message.includes('permission')
                                ? 'permissionDenied'
                                : 'networkError'
                            : 'unknown';

                    set({ isSubmitting: false, error: errorCode }, false, {
                        type: 'feedback-store/send/error'
                    });

                    throw new Error(errorCode);
                }
            },
            reset: () => {
                set({ isSubmitting: false, error: null }, false, {
                    type: 'feedback-store/reset'
                });
            }
        }),
        { name: 'feedback-store' }
    )
);

export const useFeedbackStore = createSelectors(useFeedbackStoreBase);
