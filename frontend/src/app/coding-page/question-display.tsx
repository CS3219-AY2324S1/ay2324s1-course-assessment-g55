import { Box } from '@chakra-ui/react';
import { QuestionType, questions } from "@/data/question";
import './question-display.css'

interface QuestionDisplayProps {
  id: string;
}

export function QuestionDisplay({ id }: QuestionDisplayProps) {

  const question: QuestionType | undefined = questions.find(q => q.id === id);
  const paragraphs = question?.description?.split('\n') ?? [];

  const formattedDescription = paragraphs.map((paragraph) => {
    if (paragraph.startsWith('Example')) {
      return (
        <>
          <br/>
          <h2 className="h2">{paragraph}</h2>
        </>
      );
    }

    if (paragraph.startsWith('Constraints:')) {
      return (
        <>
          <br/>
          <h2 className="h2">{paragraph}</h2>
        </>
      );
    }

    return <p>{paragraph}</p>;
  });

  return (
    <Box p={8}>
      {question ? (
        <div>
          <h1 className="h1">{question.title}</h1>
          {formattedDescription}
        </div>
      ) : (
        <p>Question not found</p>
      )}
    </Box>
  );
}