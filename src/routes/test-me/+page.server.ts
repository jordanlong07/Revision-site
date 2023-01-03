import {PrismaClient} from '@prisma/client'
export const load = async() => {
    const prisma = new PrismaClient
    interface questionType {
        [key: number]: {
        question: string 
        answer: string,
        tags: any
        }
     }

     const getTags = await prisma.acronymQuestions.findMany({
        select: {
            tags: true
        }
     })

    const getQuestions : questionType = await prisma.acronymQuestions.findMany()
    prisma.$disconnect()

    return {
        questionsRaw: getQuestions,
        allTagsRaw: getTags
    }
    
}