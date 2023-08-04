import { analyze } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { Analysis, User } from "@prisma/client"
import { NextResponse } from "next/server"

type Props = {
   params: {
      id: string
   }
}

export const PATCH = async (request: Request, { params }: Props) => {
   const { content } = await request.json()
   const user = await getUserByClerkId() as User
   const updatedEntry = await prisma.journalEntry.update({
      where: { 
         userId_id: {
            id: params.id,
            userId: user.id
         }
       },
       data: {
         content
       }
   })

   const analysis = await analyze(updatedEntry.content) as Analysis

   const updatedAnalysis = await prisma.analysis.upsert({
      where: {
         entryId: updatedEntry.id
      },
      create: {
         ...analysis,
         entryId: updatedEntry.id,
         userId: user.id
      },
      update: {
         ...analysis,
         userId: user.id
      }
   })

   return NextResponse.json({ data: {...updatedEntry, analysis: updatedAnalysis } })
}

export const DELETE = async (request: Request, { params }: Props) => {
   const user = await getUserByClerkId() as User
   const deletedEntry = await prisma.journalEntry.delete({
      where: {
         userId_id: {
            id: params.id,
            userId: user.id
         }
      }
   })

   return NextResponse.json({ data: deletedEntry })
}