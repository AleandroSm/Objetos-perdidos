"use server"

import { db } from "@/db/drizzle"
import { objetos } from "@/db/schema"

export const getObjects = async () => {
    const objects = await db.select().from(objetos)
    return objects
} 


export const addObject = async (name:string,description:string| null,localization:string, date: Date | null, category: string | null) => {
    await db.insert(objetos).values({
        name_object: name,
        description,
        localization,
        date: date?.toISOString().split("t")[0],
        category
    })
}