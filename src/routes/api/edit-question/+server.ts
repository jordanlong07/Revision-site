import {PrismaClient} from '@prisma/client'
import { dataset_dev } from 'svelte/internal'
export const POST = async(event : any) => {
    const body = await event.request.json()
    console.log(body)
    const res = new Response()
    const prisma = new PrismaClient
    const update = await prisma.acronymQuestions.update({
        where: {
            id: body.id
        },
        data: {
            question: body.question,
            answer: body.answer,
            tags: body.tags
        }
    })
    
    
    return res
}
