import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { User } from "@prisma/client"
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

   return NextResponse.json({ data: updatedEntry })
}