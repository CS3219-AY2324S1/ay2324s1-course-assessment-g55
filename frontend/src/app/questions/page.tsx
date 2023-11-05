'use client';

import { Box, Flex, Link, Button } from '@chakra-ui/react';
import { QuestionList } from './question-list';
import { QuestionForm } from './question-form';
import { useGetQuestions } from './api';

export default function QuestionsPage() {
  const { data: questions } = useGetQuestions();

  return (
    <main>
      <Flex justifyContent="flex-start" p={4}>
        <Link href="/">
          <Button colorScheme="gray" mr={4}>
            Home
          </Button>
        </Link>
      </Flex>
      <Flex direction='column' align='center' className='gap-4'>
        <Box w='60%' p="4">
          <QuestionForm questions={questions ?? []} />
        </Box>
        <Box w='80%' p="4">
          <QuestionList questions={questions ?? []} />
        </Box>
      </Flex>
    </main>
  );
}
