import { QueryClient } from '@tanstack/react-query';

export const createQueryClient = (options?: {
    staleTime?: number;
    gcTime?: number;
    refetchOnWindowFocus?: boolean;
    retry?: number;
}) => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // Increased staleTime for better performance - data considered fresh for 5 minutes
                // Reduces unnecessary refetches and improves perceived performance
                staleTime: options?.staleTime ?? 5 * 60 * 1000,
                gcTime: options?.gcTime ?? 5 * 60 * 1000,
                retry: options?.retry ?? 1,
                refetchOnWindowFocus: options?.refetchOnWindowFocus ?? true,
                refetchOnReconnect: true,
                refetchOnMount: true
            },
            mutations: {
                retry: 0
            }
        }
    });
};

export const queryClient = createQueryClient();
