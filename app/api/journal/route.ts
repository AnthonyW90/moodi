import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db";
import { Analysis } from "@prisma/client";
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
         content: "Write about your day!"
      }
   })

   // const analysis = await analyze(journal.content) as Analysis
   // await prisma.analysis.create({
   //    data: {
   //       ...analysis,
   //       entryId: journal.id
   //    }
   // })

   revalidatePath('/journal')

   return NextResponse.json({ data: journal })
}