'use server';

/**
 * @fileOverview A flow that summarizes project descriptions for a portfolio.
 *
 * - summarizeProjectDescription - A function that summarizes a project description.
 * - SummarizeProjectDescriptionInput - The input type for the summarizeProjectDescription function.
 * - SummarizeProjectDescriptionOutput - The return type for the summarizeProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProjectDescriptionInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('The project description to summarize.'),
});
export type SummarizeProjectDescriptionInput = z.infer<
  typeof SummarizeProjectDescriptionInputSchema
>;

const SummarizeProjectDescriptionOutputSchema = z.object({
  summary: z.string().describe('The summarized project description.'),
});
export type SummarizeProjectDescriptionOutput = z.infer<
  typeof SummarizeProjectDescriptionOutputSchema
>;

export async function summarizeProjectDescription(
  input: SummarizeProjectDescriptionInput
): Promise<SummarizeProjectDescriptionOutput> {
  return summarizeProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProjectDescriptionPrompt',
  input: {schema: SummarizeProjectDescriptionInputSchema},
  output: {schema: SummarizeProjectDescriptionOutputSchema},
  prompt: `Summarize the following project description in a concise and impactful way for a professional portfolio:

{{projectDescription}}`,
});

const summarizeProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'summarizeProjectDescriptionFlow',
    inputSchema: SummarizeProjectDescriptionInputSchema,
    outputSchema: SummarizeProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
