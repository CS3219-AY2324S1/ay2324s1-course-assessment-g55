'use client'

import { QuestionType, questions as initialQuestions, questions } from "@/data/question";
import { deleteFromArray } from "@/data/utils";
import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tag, TagCloseButton, TagLabel, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons'

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    setQuestions(getQuestions());
  }, []);

  useEffect(() => {
    window.localStorage.setItem("questions", JSON.stringify(questions))
  }, [questions]);

  return (<main>
    <Flex direction="column" align="center">
      <QuestionForm questions={questions} setQuestions={setQuestions} />
      <Box w='80%'>
        <QuestionList questions={questions} setQuestions={setQuestions} />
      </Box>
    </Flex>
  </main>);
}

function QuestionRow(props: {
  rowNum: number;
  question: QuestionType;
  setQuestions: Dispatch<SetStateAction<QuestionType[]>>;
}) {
  const { rowNum, question, setQuestions } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const row =
    <Tr>
      <Td>
        <Button onClick={onOpen}>
          {`${question.id}. ${question.title}`}
        </Button>
      </Td>
      <Td>{question.complexity}</Td>
      <Td>
        <Button size='sm' leftIcon={<DeleteIcon />} color='red' onClick={() => setQuestions(deleteFromArray(questions, rowNum))} />
      </Td>
    </Tr>
    ;
  return <>
    {row}
    <QuestionItem question={question} isOpen={isOpen} onClose={onClose} />
  </>;
}
function QuestionList(props: {
  questions: QuestionType[];
  setQuestions: Dispatch<SetStateAction<QuestionType[]>>;
}) {
  const { questions, setQuestions } = props;

  return <TableContainer>
    <Table variant='simple' size='lg'>
      <Thead>
        <Tr>
          <Th>
            Title
          </Th>
          <Th width='40px'>
            Complexity
          </Th>
          <Th width='20px'>
            Actions
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {questions.map((question, rowNum) =>
          <QuestionRow key={`question-${rowNum}`} question={question} rowNum={rowNum} setQuestions={setQuestions} />)}
      </Tbody>
    </Table>
  </TableContainer>
}

function QuestionItem(props: {
  question: QuestionType;
  isOpen: boolean;
  onClose: () => void;
}
) {
  const { question, isOpen, onClose } = props;
  return (
    <>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> {question.id}. {question.title} </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div> Difficulty: {question.complexity} </div>

            <div className="whitespace-pre-line py-3">
              <h2>Description</h2>
              <p>{question.description}</p>
            </div>
            <div> {question.categories.length == 0 ? "No categories!" :
              `Categories: ${question.categories.reduce((acc, c) => acc + ", " + c)}`}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>)
}

function getQuestions() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return initialQuestions;
  }
  const cookieQuestions = window.localStorage.getItem("questions");
  if (cookieQuestions == null) {
    return initialQuestions;
  }
  return JSON.parse(cookieQuestions);
}

function QuestionForm(props: {
  questions: QuestionType[];
  setQuestions: Dispatch<SetStateAction<QuestionType[]>>;
}
) {
  const tmp: QuestionType = {
    id: "",
    title: "",
    description: "",
    categories: [],
    complexity: "Easy",
  }
  const { questions, setQuestions } = props;
  const [question, setQuestion] = useState(tmp);
  const [category, setCategory] = useState("");
  const addCategory = () => {
    setQuestion({ ...question, categories: [...question.categories, category] });
    setCategory("");
  };
  const changeCategories = (idx: number) => {
    const newCategories = deleteFromArray(question.categories, idx);
    setQuestion({ ...question, categories: newCategories });
  }
  const addQuestion = () => {
    if (question.id == "" || question.title == "" ||
      question.description == "" || question.complexity == "") {
      return;
    }
    setQuestions([...questions, question])
    setQuestion(tmp);
  };
  return <div>
    <div>
      <div>ID: </div>
      <input type="number" name="id" value={question.id} onChange={e => setQuestion({ ...question, id: e.currentTarget.value })} />
    </div>
    <div>
      <div >Title: </div>
      <input name="title" value={question.title} onChange={e => setQuestion({ ...question, title: e.currentTarget.value })} />
    </div>
    <div>
      <div >Description: </div>
      <textarea name="description" value={question.description} onChange={e => setQuestion({ ...question, description: e.currentTarget.value })} />
    </div>
    <div>
      <div >Categories: </div>
      <input name="categories" value={category} onChange={e => setCategory(e.currentTarget.value)} />
      <button className="btn" onClick={addCategory}>add</button>
      {
        question.categories.length == 0 ? <div>no categories</div> :
          <div className="flex">{question.categories.map((name, idx) =>
            CategoryLabel({ idx, name, changeCategories }))}
          </div>
      }
    </div>
    <div className="flex">
      <div style={{ marginRight: "2rem" }}>Difficulty: </div>
      <select name="complexity" value={question.complexity} onChange={e => setQuestion({ ...question, complexity: e.currentTarget.value })}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
    <div>
      <button className="btn btn-blue" onClick={addQuestion}>add question</button>
    </div>
  </div>;
}

function CategoryLabel(props: {
  idx: number;
  name: string;
  changeCategories: (idx: number) => void;
}
) {
  const { idx, name, changeCategories } = props;
  return <div className="flex" >
    <Tag className="mr-1" size="sm" borderRadius='full' colorScheme='blue' >
      <TagLabel>{name}</TagLabel>
      <TagCloseButton onClick={() => changeCategories(idx)} />
    </Tag>
  </div >
}
