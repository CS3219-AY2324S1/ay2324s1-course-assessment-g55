'use client'

import { Question, questions as initialQuestions, questions } from "@/data/question";
import { deleteFromArray } from "@/data/utils";
import { Dispatch, SetStateAction, useState } from 'react';

export default function QuestionsPage() {
  const [questions, setQuestions] = useState(initialQuestions);
  const toReturn = questions.map((question, idx) => QuestionItem({ idx, question, setQuestions }));
  return (<main className="flex min-h-screen flex-col items-center p-24">
    {toReturn}
  </main>);
}

function QuestionItem(props: {
  idx: number;
  question: Question;
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}
) {
  const { idx, question, setQuestions } = props;
  return <>
    <div>{question.id}. {question.title} </div>
    <div>Difficulty: {question.complexity}</div>
    <div>{question.description}</div>
    <div>Categories: {question.categories.reduce((acc, c) => acc + ", " + c)} </div>
    <button type="button" onClick={() => setQuestions(deleteFromArray(questions, idx))}>delete</button>
  </>;
}
