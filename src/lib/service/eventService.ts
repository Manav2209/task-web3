import { db }  from "@/db"
import { eventsTable } from "@/db/schema";
import { desc, sql ,eq } from "drizzle-orm"
import { v4 as  uuidv4 } from "uuid";
import { EventDTO, PaginatedResponse, PaginationParams ,CreateEventInput, UpdateEventInput} from "../types/event";

export class EventService{

    static async createEvent(input: CreateEventInput): Promise<EventDTO> {
        
        const id = uuidv4();
        const now = new Date();
    
        await db.insert(eventsTable).values({
            id,
            title: input.title,
            description: input.description || null,
            coverImageUrl: input.coverImageUrl || null,
            location: input.location,
            startDate: new Date(input.startDate),
            endDate: new Date(input.endDate),
            metadata: input.metadata || null,
            status: "DRAFT",
            createdAt: now,
            updatedAt: now,
        });
    
        return this.getEventById(id);
    }

    static async getEventById (id : string){
        const event= await db.select().from(eventsTable).where(eq(eventsTable.id, id)).limit(1);
        return event[0] as EventDTO
    }
    

    static async getAllEvents(params: PaginationParams):  Promise<PaginatedResponse<EventDTO>>{
        const page = params.page!;
        const limit = params.limit!;
        const offset = (page - 1) * limit;

        const events = await db.select().
        from(eventsTable).
        orderBy(desc(eventsTable.createdAt)).
        limit(limit).
        offset(offset);

        const countResult = await db
            .select({ count: sql<number>`COUNT(*)` })
            .from(eventsTable);

        const total = countResult[0]?.count || 0;

        return {
            data: events as EventDTO[],
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                },
            };
    }

    static async updateEvent(id: string , input: UpdateEventInput): Promise<EventDTO | null> {
        // Check if event exists
        const existingEvent = await this.getEventById(id);
        if (!existingEvent) return null;
    
        const updateData: Record<string, unknown> = {
            updatedAt: new Date(),
        };
    
        if (input.title !== undefined) updateData.title = input.title;
        if (input.description !== undefined)
            updateData.description = input.description || null;
        if (input.coverImageUrl !== undefined)
            updateData.coverImageUrl = input.coverImageUrl || null;
        if (input.location !== undefined) updateData.location = input.location;
        if (input.startDate !== undefined)
            updateData.startDate = new Date(input.startDate);
        if (input.endDate !== undefined)
            updateData.endDate = new Date(input.endDate);
        if (input.status !== undefined) updateData.status = input.status;
        if (input.metadata !== undefined) updateData.metadata = input.metadata;
    
        await db
            .update(eventsTable)
            .set(updateData)
            .where(eq(eventsTable.id, id));
        
        return this.getEventById(id);
        
    }
    
    static async deleteEvent(id: string): Promise<boolean> {
            // Check if event exists
            const event = await this.getEventById(id);
            if (!event) return false;
        
            await db.delete(eventsTable).where(eq(eventsTable.id, id));
            return true;
        }
}