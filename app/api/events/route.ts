import { Event, IEvent } from "@/database";
import connectDB from "@/lib/mongodb";
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const formData = await req.formData()
        let event: Partial<IEvent>
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
            
            if (!slug) {
                return NextResponse.json(
                    { message: "Title is required and must contain alphanumeric characters" },
                    { status: 400 }
                )
            }
            
            // Convert string fields that should be arrays and type the event object
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
        const file = formData.get('image') as File;
        if (!file) {
            return NextResponse.json(
                {
                    message: "Image file is required",
                }, { status: 400 })
        }
       const arrayBuffer = await file.arrayBuffer()
       const buffer = Buffer.from(arrayBuffer)
       const uploadResult = await new Promise((resolve, reject) => {
        // TODO: Implement Cloudinary upload
        cloudinary.uploader.upload_stream({
            resource_type: 'image',
            folder: 'DevEvent'
        }, (error, result) => {
            if (error) return reject(error)
            resolve(result)
        }).end(buffer)
       })
       event.image = (uploadResult as { secure_url: string }).secure_url

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
export async function GET(){
    try {
        await connectDB()
        const events = await Event.find().sort({ createdAt: -1 })
        return NextResponse.json({
            message: 'Events Fetched Successfully',
            events
        }, { status: 200 })
    }
    catch (e) {
        console.error(e);
        return NextResponse.json(
            {
                message: 'Events Fetching Failed',
                error: e instanceof Error ? e.message : 'Unknown'
            }, { status: 500 })
    }
}