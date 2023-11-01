'use client';

import { Box, Flex } from '@chakra-ui/react';
import { QuestionList } from './question-list';
import { QuestionForm } from './question-form';
import { useGetQuestions } from './api';

export default function QuestionsPage() {
  const { data: questions } = useGetQuestions();

  return (
    <main>
      <Flex direction='column' align='center' className='gap-4'>
        <Box w='60%'>
          <QuestionForm questions={questions ?? []} />
        </Box>
        <Box w='80%'>
          <QuestionList questions={questions ?? []} />
        </Box>
      </Flex>
    </main>
  );
}
