import { auth } from "@clerk/nextjs"
import { prisma } from "./db"

export const getUserByClerkId = async (opts = {}) => {
   const { userId } = auth()

   if(!userId) return;

   const user = await prisma.user.findUniqueOrThrow({
      where: {
         clerkId: userId
      },
      ...opts
   })

   return user;
}