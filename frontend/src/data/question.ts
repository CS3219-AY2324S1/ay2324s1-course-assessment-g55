import { z } from 'zod';

const QuestionDetailsSchema = z.object({
  description: z.string(),
});

const DifficultyEnumSchema = z.enum(['easy', 'medium', 'hard']);

const QuestionInformationSchema = z.object({
  title: z.string(),
  complexity: DifficultyEnumSchema,
  categories: z.array(z.string()),
  attempts: z.number(),
  createdAt: z.coerce.date(),
});

export const QuestionSchema = z.object({
  id: z.number(),
  information: QuestionInformationSchema,
  details: QuestionDetailsSchema,
});

// extract the inferred type
export type QuestionType = z.infer<typeof QuestionSchema>;

export const questions: Array<QuestionType> = [
  {
    id: 1,
    information: {
      title: 'Reverse a string',
      categories: ['Strings', 'Algorithms'],
      complexity: 'easy',
      attempts: 0,
      createdAt: new Date(),
    },
    details: {
      description: `Write a function that reverses a string. The input string is given as an array of characters s.
You must do this by modifying the input array in-place with O(1) extra
memory.

Example 1:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
Example 2:
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
Constraints:
 1 <= s.length <= 105
 s[i] is a printable ascii character.`,
    },
  },
];
