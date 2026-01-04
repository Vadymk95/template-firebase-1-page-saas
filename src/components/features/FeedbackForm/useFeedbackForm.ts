import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import type { FeedbackSource } from '@/constants/feedback';
import { useFeedbackStore } from '@/store/feedback/feedbackStore';

const createFeedbackSchema = (
    tErrors: (key: string, options?: Record<string, unknown>) => string
) =>
    z.object({
        email: z.string().email(tErrors('errors:validation.email')),
        message: z.string().min(10, tErrors('errors:validation.minLength', { min: 10 })),
        rating: z.number().min(1).max(5).optional()
    });

export type FeedbackFormValues = z.infer<ReturnType<typeof createFeedbackSchema>>;

interface UseFeedbackFormProps {
    source: FeedbackSource;
    onSuccess?: () => void;
}

export const useFeedbackForm = ({ source, onSuccess }: UseFeedbackFormProps) => {
    const { t: tErrors } = useTranslation(['errors']);
    const [rating, setRating] = useState<number | undefined>(undefined);
    const [isSuccess, setIsSuccess] = useState(false);

    const sendFeedback = useFeedbackStore.use.sendFeedback();
    const isSubmitting = useFeedbackStore.use.isSubmitting();
    const error = useFeedbackStore.use.error();
    const resetStore = useFeedbackStore.use.reset();

    const feedbackSchema = createFeedbackSchema(tErrors);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm<FeedbackFormValues>({
        resolver: zodResolver(feedbackSchema),
        mode: 'onBlur',
        defaultValues: {
            email: '',
            message: '',
            rating: undefined
        }
    });

    const handleRating = (value: number) => {
        setRating(value);
        setValue('rating', value, { shouldValidate: false });
    };

    const onSubmit = async (data: FeedbackFormValues) => {
        try {
            await sendFeedback({ ...data, source });
            setIsSuccess(true);
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error(err);
            resetStore();
        }
    };

    const handleReset = () => {
        setIsSuccess(false);
        setRating(undefined);
        reset({
            email: '',
            message: '',
            rating: undefined
        });
        resetStore();
    };

    return {
        rating,
        isSubmitting,
        isSuccess,
        error,
        register,
        handleSubmit: handleSubmit(onSubmit),
        handleRating,
        handleReset,
        errors
    };
};
