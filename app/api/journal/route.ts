import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
   const user = await getUserByClerkId()

   if(!user) return;

   const journal = await prisma.journalEntry.create({
      data: {
         user: {
            connect: {
               id: user.id
            }
         },
         content: "Hello world!"
      }
   })

   revalidatePath('/journal')

   return NextResponse.json({ data: journal })
}