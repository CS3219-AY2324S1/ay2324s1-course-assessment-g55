import {Question, questions} from "@/data/question";

export default function QuestionsPage() {
  const toReturn = questions.map(q => QuestionComponent(q));
  return (<main className="flex min-h-screen flex-col items-center p-24">
    {toReturn}
  </main>);
}

function QuestionComponent(question: Question) {
  return <>
    <div>{question.id}. {question.title} </div>
    <div>Difficulty: {question.complexity}</div>
    <div>{question.description}</div>
    <div>Categories: {question.categories.reduce((acc, c) => acc + ", " + c)}
    </div>
  </>;
}

