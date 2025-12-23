import { NextRequest, NextResponse } from "next/server";
import { EventService } from "@/lib/service/eventService";
import { updateEventSchema } from "@/lib/validation/eventValidation";

type RouteParams = {
  params: { id: string };
};

// GET /api/events/:id
export async function GET(req: NextRequest,{ params }: RouteParams) {
  try {
    const event = await EventService.getEventById(params.id);

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: `Event with id '${params.id}' not found`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: event,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`[GET /api/events/${params.id}]`, error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch event",
      },
      { status: 500 }
    );
  }
}

// PUT /api/events/:id
export async function PUT(req: NextRequest,{ params }: RouteParams) {
  try {
    const body = await req.json();

    const parsed = updateEventSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid event data",
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const event = await EventService.updateEvent(
      params.id,
      parsed.data
    );

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: `Event with id '${params.id}' not found`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: event,
        message: "Event updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`[PUT /api/events/${params.id}]`, error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update event",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/events/:id
export async function DELETE( req: NextRequest,{ params }: RouteParams) {
  try {
    const deleted = await EventService.deleteEvent(params.id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message: `Event with id '${params.id}' not found`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: { id: params.id },
        message: "Event deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`[DELETE /api/events/${params.id}]`, error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete event",
      },
      { status: 500 }
    );
  }
}
