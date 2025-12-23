import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchEvents,
    fetchEventById,
    createEvent,
    updateEvent,
    deleteEvent,
} from "@/lib/api/events";
import type {  UpdateEventInput } from "@/lib/types/event";

export const eventKeys = {
    all: ["events"] as const,
    list: () => [...eventKeys.all, "list"] as const,
    detail: (id: string) => [...eventKeys.all, "detail", id] as const,
};

export function useEvents(page: number , limit : number) {
    return useQuery({
        queryKey: [...eventKeys.list(), page, limit],
        queryFn: () => fetchEvents(page, limit),
    });
}

export function useEvent(id: string) {
    return useQuery({
        queryKey: eventKeys.detail(id),
        queryFn: () => fetchEventById(id),
        enabled: !!id,
    });
}

export function useCreateEvent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createEvent,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: eventKeys.all });
        },
    });
}

export function useUpdateEvent(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: UpdateEventInput) => updateEvent(id, input),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: eventKeys.all });
        queryClient.invalidateQueries({
            queryKey: eventKeys.detail(id),
        });
        },
    });
}

export function useDeleteEvent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: eventKeys.all });
        },
    });
}
