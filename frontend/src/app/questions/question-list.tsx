import { QuestionType } from "@/data/question";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";

function QuestionRow(props: {
  rowNum: number;
  question: QuestionType;
  deleteQuestion: (idx: number) => void;
}) {
  const { rowNum, question, deleteQuestion } = props;
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
        <Button size='sm' leftIcon={<DeleteIcon />} color='red' onClick={() => deleteQuestion(rowNum)} />
      </Td>
    </Tr>
    ;
  return <>
    {row}
    <QuestionItem question={question} isOpen={isOpen} onClose={onClose} />
  </>;
}
export function QuestionList(props: {
  questions: QuestionType[];
  deleteQuestion: (row: number) => void;
}) {
  const { questions, deleteQuestion } = props;

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
          <QuestionRow key={`question-${rowNum}`} question={question} rowNum={rowNum} deleteQuestion={deleteQuestion} />)}
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

