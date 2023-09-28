import { QuestionSchema, QuestionType } from '@/data/question';
import axios from 'axios';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { z } from 'zod';

const QUERY_KEY = 'questions';
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const successResponseSchema = z.object({
  status: z.string(),
});

const questionApi = axios.create({ baseURL: 'http://localhost:4444' });

const getQuestions = async () => {
  const { data } = await questionApi.get(`/questions/`);
  return z.array(QuestionSchema).parse(data);
};

const getQuestion = async (questionId: number) => {
  const { data } = await questionApi.get(`/questions/${questionId}`);
  return QuestionSchema.safeParse(data);
};

const createQuestion = async (question: QuestionType) => {
  try {
    const { data } = await questionApi.post('/questions/', question, {
      headers: HEADERS,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

const deleteQuestion = async (questionId: number) => {
  const { data } = await questionApi.delete(`/questions/${questionId}`);
  return successResponseSchema.parse(data);
};

export const useGetQuestion = (questionId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY, questionId],
    queryFn: () => getQuestion(questionId),
  });
};

export const useGetQuestions = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getQuestions(),
  });
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY]);
    },
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY]);
    },
  });
};
