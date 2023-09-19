import { QuestionType } from "@/data/question";
import { deleteFromArray } from "@/data/utils";
import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, Tag, TagCloseButton, TagLabel, Textarea, } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export function QuestionForm(props: {
  questions: QuestionType[];
  setQuestions: Dispatch<SetStateAction<QuestionType[]>>;
}
) {
  const { questions, setQuestions } = props;
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [isCategoryError, setIsCategoryError] = useState(false);
  const { handleSubmit, register, formState: { errors }, setError, reset } = useForm();

  const addCategory = () => {
    if (category.trim().length == 0) {
      setIsCategoryError(true);
      return
    }
    setCategory("");
    setIsCategoryError(false);
    if (categories.includes(category)) {
      return
    }
  };
  const changeCategories = (idx: number) => {
    const newCategories = deleteFromArray(categories, idx);
    setCategories(newCategories);
  }

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    const question: QuestionType =
    {
      id: values.id,
      title: values.title,
      complexity: values.complexity,
      description: values.description,
      categories,
    };

    setCategory("");
    setCategories([]);
    reset();

    if (questions.some(({id}) => (id == question.id))) {
      setError('id', {
        type: "manual",
        message: "ID should be unique!"})
      return;
    }
    if (questions.some(({title}) => (title == question.title))) {
      setError('title', {
        type: "manual",
        message: "Title should be unique!"})
      return;
    }

    setQuestions([...questions, question]);
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <Flex direction='column' gap={"5"}>
      <FormControl isRequired isInvalid={errors.id !== undefined}>
        <FormLabel>ID</FormLabel>
        <Input id='' {...register('id', {
          required: 'This field is required',
        })}
        />
        <FormErrorMessage>
          {errors.id?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.title !== undefined}>
        <FormLabel>Question title</FormLabel>
        <Input id='title' {...register('title', {
          required: 'This field is required',
        })}
        />
        <FormErrorMessage>
          {errors.title?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.complexity !== undefined}>
        <FormLabel>Complexity</FormLabel>
        <Select id='complexity' placeholder='Select complexity'
          {...register('complexity', { required: 'Select one option', })}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </Select>
        <FormErrorMessage>
          {errors.complexity?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>Description </FormLabel>
        <Textarea name="description" />
      </FormControl>
      <FormControl isInvalid={isCategoryError}>
        <FormLabel>Category</FormLabel>
        <Flex align="center">
          <Input mr="4" name="categories" value={category} onChange={e => setCategory(e.currentTarget.value)} />
          <Button className="btn" onClick={addCategory}>Add</Button>
        </Flex>
        <FormHelperText>
          {
            categories.length == 0 ? <div>No categories</div> :
              <div className="flex">{categories.map((name, idx) =>
                CategoryLabel({ idx, name, changeCategories }))}
              </div>
          }
        </FormHelperText>
        <FormErrorMessage>
          Category cannot be empty
        </FormErrorMessage>
        <input type="hidden" value={[]} {...register('categories')} />
      </FormControl>
      <Button colorScheme="blue" ml="auto" mt={4} type='submit'>
        Add question
      </Button>
    </Flex>
  </form>
}

function CategoryLabel(props: {
  idx: number;
  name: string;
  changeCategories: (idx: number) => void;
}
) {
  const { idx, name, changeCategories } = props;
  return <div className="flex" >
    <Tag key={`tag-${idx}`} className="mr-1" size="sm" borderRadius='full' colorScheme='blue' >
      <TagLabel>{name}</TagLabel>
      <TagCloseButton onClick={() => changeCategories(idx)} />
    </Tag>
  </div >
}
