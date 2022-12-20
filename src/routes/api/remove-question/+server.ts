import {PrismaClient} from '@prisma/client'
export const POST = async(event) => {
    const body = await event.request.json()
    console.log(body)
    const res = new Response()
    const prisma = new PrismaClient
    const removeQuestion = await prisma.acronymQuestions.delete({
        where : {
            id : body
        }
    })
    
    
    return res
}
