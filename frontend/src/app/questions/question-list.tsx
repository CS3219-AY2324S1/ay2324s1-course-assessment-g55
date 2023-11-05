import { QuestionType } from '@/data/question';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useDeleteQuestion } from './api';

function QuestionRow(props: {
  question: QuestionType;
  deleteQuestion: (idx: number) => void;
}) {
  const { question, deleteQuestion } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const row = (
    <Tr>
      <Td>
        <Button onClick={onOpen}>{question.information.title}</Button>
      </Td>
      <Td>{question.information.complexity}</Td>
      <Td>
        <Button
          size='sm'
          color='red'
          onClick={() => deleteQuestion(question.id)}
        >
          <DeleteIcon />
        </Button>
      </Td>
    </Tr>
  );
  return (
    <>
      {row}
      <QuestionItem question={question} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
export function QuestionList(props: { questions: QuestionType[] }) {
  const { questions } = props;

  const { mutate: deleteQuestionMutation } = useDeleteQuestion();

  return (
    <TableContainer>
      <Table variant='simple' size='lg'>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th width='40px'>Complexity</Th>
            <Th width='20px'>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {questions.map((question, rowNum) => (
            <QuestionRow
              key={`question-${rowNum}`}
              question={question}
              deleteQuestion={deleteQuestionMutation}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function QuestionItem(props: {
  question: QuestionType;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { question, isOpen, onClose } = props;
  return (
    <>
      <Modal size='xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {' '}
            {question.id}. {question.information.title}{' '}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div> Difficulty: {question.information.complexity} </div>

            <div className='whitespace-pre-line py-3'>
              <h2>Description</h2>
              <p>{question.details.description}</p>
            </div>
            <div>
              {' '}
              {question.information.categories.length == 0
                ? 'No categories!'
                : `Categories: ${question.information.categories.reduce(
                    (acc, c) => acc + ', ' + c
                  )}`}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
