import { OpenAI } from "langchain/llms/openai"
import { StructuredOutputParser } from "langchain/output_parsers"
import { PromptTemplate } from "langchain/prompts"
import { Document } from "langchain/document"
import { loadQARefineChain } from "langchain/chains"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { MemoryVectorStore } from "langchain/vectorstores/memory"
import z from "zod"

import { JournalEntry } from "@prisma/client"

const parser = StructuredOutputParser.fromZodSchema(
   z.object({
      mood: z.string().describe('the mood of the person who wrote the journal entry.'),
      summary: z.string().describe('quick summary of the entire journal entry.'),
      subject: z.string().describe('the subject of the journal entry.'),
      color: z.string().describe('a hexadecimal color that represents the mood of the journal entry.'),
      negative: z.boolean().describe('is the journal entry negative? (i.e. does it contain negative emotions?).'),
      intensity: z.number().describe('on a scale of 1 to 10, how intense is the mood of the journal entry? 1 being the lowest, 10 being the most intense. (i.e. how strong is the emotion?).'),
      sentimentScore: z.number().describe('sentiment of the entry on a scale of -10 to 10, where -10 is the most negative, 0 is neutral, and 10 is the most positive.'),
   })
)

const getPrompt = async (content: string) => {
   const formattedInstructions = parser.getFormatInstructions()
   
   const prompt = new PromptTemplate({
      template: "Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n {formattedInstructions} \n {entry}",
      inputVariables: ['entry'],
      partialVariables: {formattedInstructions},
   })

   const input = await prompt.format({
      entry: content
   })

   return input
}

export const analyze = async (prompt: string) => {
   const input = await getPrompt(prompt)
   const model = new OpenAI({
      temperature: 0,
      modelName: "gpt-3.5-turbo"
   })

   const result = await model.call(input)

   try {
      return parser.parse(result)
   } catch (error) {
      console.log(error)
   }
}

type Entry = {
   id: string,
   content: string,
   createdAt: Date
}

export const questionAI = async (question: string, entries: Entry[]) => {
   const docs = entries.map(entry => {
      return new Document({
         pageContent: entry.content,
         metadata: {
            id: entry.id,
            createdAt: entry.createdAt,
         }
      })
   })

   const model = new OpenAI({
      temperature: 0,
      modelName: "gpt-3.5-turbo"
   })

   const chain = loadQARefineChain(model)

   const embeddings = new OpenAIEmbeddings()

   const store = await MemoryVectorStore.fromDocuments(docs, embeddings)

   const relevantDocs = await store.similaritySearch(question)

   const result = await chain.call({
      input_documents: relevantDocs,
      question
   })

   return result.output_text
}