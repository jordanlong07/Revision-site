import {PrismaClient} from '@prisma/client'
export const load = async() => {
    const prisma = new PrismaClient
    interface questionType {
        [key: number]: {
        question: string 
        answer: string,
        tags: string
        }
     }
    const getQuestions : questionType = await prisma.acronymQuestions.findMany()
    return {
        allQuestions: getQuestions,
    }
    
}