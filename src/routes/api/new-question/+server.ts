import {PrismaClient} from '@prisma/client'
export const POST = async(event : any) => {
    const body = await event.request.json()
    const res = new Response()
    const prisma = new PrismaClient
    const tags = body.tags.toString()
    const addQuestion = await prisma.acronymQuestions.create({
        data :{
            question: body.question,
            answer: body.answer,
            tags: tags
        }
    })
    
    return res
}
