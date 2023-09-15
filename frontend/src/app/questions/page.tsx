'use client'

import { Question, questions as initialQuestions, questions } from "@/data/question";
import { deleteFromArray } from "@/data/utils";
import { Dispatch, SetStateAction, useState } from 'react';

export default function QuestionsPage() {
  const [questions, setQuestions] = useState(initialQuestions);
  const toReturn = questions.map((question, idx) => QuestionItem({ idx, question, setQuestions }));
  return (<main className="flex min-h-screen flex-col items-center p-24">
    <QuestionForm questions={questions} setQuestions={setQuestions} />
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
    <div>Categories: {question.categories.reduce((acc, c) => acc + ", " + c, "")} </div>
    <button className="btn btn-blue" type="button" onClick={() => setQuestions(deleteFromArray(questions, idx))}>delete</button>
  </>;
}
function QuestionForm(props: {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}
) {
  const tmp: Question = {
    id: "",
    title: "",
    description: "",
    categories: [],
    complexity: "",
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
      <select name="complexity" onChange={e => setQuestion({ ...question, complexity: e.currentTarget.value })}>
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
  return <div className="flex" style={{ border: "1px solid black", marginRight: "5px" }}>
    <div style={{ marginRight: "2px" }}>{name}</div>
    <button type="button" className="btn-blue" onClick={() => changeCategories(idx)}> x</button>
  </div >
}

