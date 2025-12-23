import { NextRequest, NextResponse } from "next/server";
import {
    createEventSchema,
    paginationSchema,
} from "@/lib/validation/eventValidation";
import { EventService } from "@/lib/service/eventService";


// to get all the events
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const params = {
        page: searchParams.get("page"),
        limit: searchParams.get("limit"),
        };

        const validatedParams = paginationSchema.safeParse(params);
        if(!validatedParams.success){
          return NextResponse.json(
            {
              success: false,
              message: "Invalid pagination parameters",
              errors: validatedParams.error.flatten(),
            },
            { status: 400 }
          );
        }
        const result = await EventService.getAllEvents(validatedParams.data);

        return NextResponse.json(
          {
            success: true,
            data: result,
          },
          { status: 200 }
        );
    
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch events",
        },
        { status: 500 }
      );
    }
}

// to create event
export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const validationResult = createEventSchema.safeParse(body);
      if (!validationResult.success) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid event data",
            errors: validationResult.error.flatten(),
          },
          { status: 400 }
        );
      }
      const event = await EventService.createEvent(validationResult.data);
      return NextResponse.json(
        {
          success: true,
          data: event,
          message: "Event created successfully",
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("[POST /api/events]", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create event",
        },
        { status: 500 }
      );
    }
  }
