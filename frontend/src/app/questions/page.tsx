'use client';

import { QuestionType, questions as initialQuestions } from '@/data/question';
import { deleteFromArray } from '@/data/utils';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { QuestionList } from './question-list';
import { QuestionForm } from './question-form';
import { Auth } from '../api/auth/Auth';

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const auth = Auth();

  useEffect(() => {
    setQuestions(getQuestions());
  }, []);

  useEffect(() => {
    window.localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const deleteQuestion = (rowNum: number) =>
    setQuestions(deleteFromArray(questions, rowNum));

  return (
    <main>
      <Flex direction='column' align='center' className='gap-4'>
        <Box w='60%'>
          <QuestionForm questions={questions} setQuestions={setQuestions} />
        </Box>
        <Box w='80%'>
          <QuestionList questions={questions} deleteQuestion={deleteQuestion} />
        </Box>
        <Box w='80%'>
          <Button onClick={auth.redirectToLogin}>Login</Button>
          <Button onClick={auth.redirectToLogout}>Logout</Button>
        </Box>
      </Flex>
    </main>
  );
}

function getQuestions() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return initialQuestions;
  }
  const cookieQuestions = window.localStorage.getItem('questions');
  if (cookieQuestions == null) {
    return initialQuestions;
  }
  return JSON.parse(cookieQuestions);
}
