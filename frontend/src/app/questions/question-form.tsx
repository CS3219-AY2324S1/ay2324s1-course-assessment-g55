import { QuestionType } from '@/data/question';
import { deleteFromArray } from '@/data/utils';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useCreateQuestion } from './api';

export function QuestionForm(props: { questions: QuestionType[] }) {
  const { questions } = props;
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [isCategoryError, setIsCategoryError] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const { mutate: addQuestionMutation } = useCreateQuestion();

  const addCategory = () => {
    const tmp = category;
    setCategory('');
    if (tmp.trim().length == 0) {
      setIsCategoryError(true);
      return;
    }
    setIsCategoryError(false);
    if (categories.includes(category)) {
      return;
    }
    setCategories([...categories, tmp]);
  };

  const changeCategories = (idx: number) => {
    const newCategories = deleteFromArray(categories, idx);
    setCategories(newCategories);
  };

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    console.log('test');
    const question: QuestionType = {
      id: 0,
      information: {
        title: values.title,
        complexity: values.complexity,
        categories,
        attempts: 0,
        createdAt: new Date(),
      },
      details: {
        description: 'hello',
      },
    };

    if (
      questions.some(
        ({ information }) => information.title === question.information.title
      )
    ) {
      setError('title', {
        type: 'manual',
        message: 'Title should be unique!',
      });
      return;
    }

    try {
      addQuestionMutation(question);
    } catch (e) {
      console.log(e);
    }

    setCategory('');
    setCategories([]);
    reset();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}
    >
      <Flex direction='column' gap={'5'}>
        <FormControl isRequired isInvalid={errors.title !== undefined}>
          <FormLabel>Question title</FormLabel>
          <Input
            id='title'
            {...register('title', {
              required: 'This field is required',
            })}
          />
          <FormErrorMessage>
            {errors.title?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.complexity !== undefined}>
          <FormLabel>Complexity</FormLabel>
          <Select
            id='complexity'
            placeholder='Select complexity'
            {...register('complexity', { required: 'Select one option' })}
          >
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </Select>
          <FormErrorMessage>
            {errors.complexity?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Description </FormLabel>
          <Textarea name='description' />
        </FormControl>
        <FormControl isInvalid={isCategoryError}>
          <FormLabel>Category</FormLabel>
          <Flex align='center'>
            <Input
              mr='4'
              name='categories'
              value={category}
              onChange={(e) => setCategory(e.currentTarget.value)}
            />
            <Button className='btn' onClick={addCategory}>
              Add
            </Button>
          </Flex>
          <FormHelperText>
            {categories.length == 0 ? (
              <div>No categories</div>
            ) : (
              <div className='flex'>
                {categories.map((name, idx) =>
                  CategoryLabel({ idx, name, changeCategories })
                )}
              </div>
            )}
          </FormHelperText>
          <FormErrorMessage>Category cannot be empty</FormErrorMessage>
          <input type='hidden' value={[]} {...register('categories')} />
        </FormControl>
        <Button colorScheme='blue' ml='auto' mt={4} type='submit'>
          Add question
        </Button>
      </Flex>
    </form>
  );
}

function CategoryLabel(props: {
  idx: number;
  name: string;
  changeCategories: (idx: number) => void;
}) {
  const { idx, name, changeCategories } = props;
  return (
    <div className='flex'>
      <Tag
        key={`tag-${idx}`}
        className='mr-1'
        size='sm'
        borderRadius='full'
        colorScheme='blue'
      >
        <TagLabel>{name}</TagLabel>
        <TagCloseButton onClick={() => changeCategories(idx)} />
      </Tag>
    </div>
  );
}
