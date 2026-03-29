import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const formData = await req.formData()
        let event
        try {
            const rawEvent = Object.fromEntries(formData.entries())
            
            // Generate slug from title
            const slug = rawEvent.title 
                ? rawEvent.title.toString()
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '')
                : ''
            
            // Convert string fields that should be arrays
            event = {
                ...rawEvent,
                slug,
                agenda: rawEvent.agenda ? JSON.parse(rawEvent.agenda as string) : [],
                tags: rawEvent.tags ? JSON.parse(rawEvent.tags as string) : []
            }
        } catch (e) {
            return NextResponse.json(
                {
                    message: "Invalid Form Data Format",
                    error: e instanceof Error ? e.message : 'Unknown'
                }, { status: 400 })
        }
        const createdEvent = await Event.create(event)
        return NextResponse.json({
            message: 'Event Created Successfully',
            event: createdEvent
        }, { status: 201 })
    }
    catch (e) {
        console.error(e);
        return NextResponse.json(
            {
                message: 'Event Creation Failed',
                error: e instanceof Error ? e.message : 'Unknown'
            }, { status: 500 })
    }

}