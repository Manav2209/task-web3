import { 
    CreateEventInput, 
    EventDTO, 
    PaginatedResponse, 
    UpdateEventInput 
} from "../types/event";
const BASE_URL= "/api/events";

export async function fetchEvents( page : number , limit : number) : Promise<PaginatedResponse<EventDTO>> {

    const res = await fetch(`${BASE_URL}/?page=${page}&limit=${limit}`);
    if (!res.ok) {
        throw new Error("Failed to fetch events");
        }
    return res.json();
}
export async function fetchEventById (id : string) :Promise<EventDTO> {
    const res = await fetch(`${BASE_URL}/?id:${id}`);
    if(!res.ok){
        throw new Error(`Failed to fetch event by ${id}`)
    }
    return res.json();
}

export async function createEvent(input: CreateEventInput): Promise<EventDTO> {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    if (!res.ok) {
        throw new Error("Failed to create event");
    }
    return res.json();
}

export async function updateEvent ( id : string ,input : UpdateEventInput): Promise<EventDTO>{
    const res = await fetch(BASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    if (!res.ok) {
        throw new Error("Failed to create event");
    }
    return res.json();
}

export async function deleteEvent(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Failed to delete event");
    }
}