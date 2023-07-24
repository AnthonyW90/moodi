import { OpenAI } from "langchain/llms/openai"
import { StructuredOutputParser } from "langchain/output_parsers"
import { PromptTemplate } from "langchain/prompts"
import z from "zod"

const parser = StructuredOutputParser.fromZodSchema(
   z.object({
      mood: z.string().describe('the mood of the person who wrote the journal entry.'),
      summary: z.string().describe('quick summary of the entire journal entry.'),
      subject: z.string().describe('the subject of the journal entry.'),
      color: z.string().describe('a hexadecimal color that represents the mood of the journal entry.'),
      negative: z.boolean().describe('is the journal entry negative? (i.e. does it contain negative emotions?).'),
      intensity: z.number().describe('on a scale of 1 to 10, how intense is the mood of the journal entry? 1 being the lowest, 10 being the most intense. (i.e. how strong is the emotion?).'),
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