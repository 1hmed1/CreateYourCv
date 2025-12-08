'use server';

/**
 * @fileOverview Provides ATS compatibility feedback for a given CV.
 *
 * - analyzeCvForAtsCompatibility - A function that analyzes a CV and provides feedback on its ATS compatibility.
 * - AnalyzeCvForAtsCompatibilityInput - The input type for the analyzeCvForAtsCompatibility function.
 * - AnalyzeCvForAtsCompatibilityOutput - The return type for the analyzeCvForAtsCompatibility function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCvForAtsCompatibilityInputSchema = z.object({
  cvText: z.string().describe('The text content of the CV to analyze.'),
});
export type AnalyzeCvForAtsCompatibilityInput = z.infer<typeof AnalyzeCvForAtsCompatibilityInputSchema>;

const AnalyzeCvForAtsCompatibilityOutputSchema = z.object({
  isAtsFriendly: z.boolean().describe('Whether the CV is likely to be ATS-friendly.'),
  feedback: z.string().describe('Feedback on how to improve the CV for ATS compatibility.'),
});
export type AnalyzeCvForAtsCompatibilityOutput = z.infer<typeof AnalyzeCvForAtsCompatibilityOutputSchema>;

export async function analyzeCvForAtsCompatibility(input: AnalyzeCvForAtsCompatibilityInput): Promise<AnalyzeCvForAtsCompatibilityOutput> {
  return analyzeCvForAtsCompatibilityFlow(input);
}

const analyzeCvForAtsCompatibilityPrompt = ai.definePrompt({
  name: 'analyzeCvForAtsCompatibilityPrompt',
  input: {schema: AnalyzeCvForAtsCompatibilityInputSchema},
  output: {schema: AnalyzeCvForAtsCompatibilityOutputSchema},
  prompt: `You are an expert in Applicant Tracking Systems (ATS). Your task is to analyze the provided CV text and provide feedback on its compatibility with ATS systems.

  Assess whether the CV is likely to be parsed correctly by an ATS and provide specific feedback on how to improve its ATS compatibility. Focus on aspects like formatting, keywords, and structure.

  Provide a detailed explanation on your determination of whether the CV is ATS friendly.

  CV Text: {{{cvText}}}`,
});

const analyzeCvForAtsCompatibilityFlow = ai.defineFlow(
  {
    name: 'analyzeCvForAtsCompatibilityFlow',
    inputSchema: AnalyzeCvForAtsCompatibilityInputSchema,
    outputSchema: AnalyzeCvForAtsCompatibilityOutputSchema,
  },
  async input => {
    const {output} = await analyzeCvForAtsCompatibilityPrompt(input);
    return output!;
  }
);
