import { EventStatus } from "@/db/schema";


export type EventDTO = {
    id: string;
    title: string;
    description: string | null;
    coverImageUrl: string | null;
    location: string;
    status: EventStatus;
    metadata: unknown | null;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateEventInput = {
  title: string;
  description?: string;
  coverImageUrl?: string;
  location: string;
  startDate: Date | string;
  endDate: Date | string;
  metadata?: unknown;
};

export type UpdateEventInput = Partial<CreateEventInput> & {
  status?: EventStatus;
};

export type PaginationParams = {
    page?: number;
    limit?: number;
};

export type PaginatedResponse<T> = {
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };