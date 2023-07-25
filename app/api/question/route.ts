import { questionAI } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
   const { question } = await request.json()
   const user = await getUserByClerkId()

   if(!user){
      return NextResponse.json({ error: "User not found" })
   }

   const entries = await prisma.journalEntry.findMany({
      where: {
         userId: user.id
      },
      select: {
         id: true,
         content: true,
         createdAt: true
      }
   })

   const answer = await questionAI(question, entries)

   return NextResponse.json({ data: answer })
}