import * as t from 'io-ts'

// Define your types
export const Answer = t.type({
  answer: t.string,
  nextQuestionId: t.union([t.string, t.undefined]),
  result: t.union([t.string, t.undefined])
})
export type Answer = t.TypeOf<typeof Answer>

export const Question = t.type({
  questionId: t.string,
  question: t.string,
  questionType: t.string,
  answers: t.array(Answer)
})
export type Question = t.TypeOf<typeof Question>

export const Questions = t.array(Question)
export type Questions = t.TypeOf<typeof Questions>

export const DecisionTree = t.type({
  version: t.string,
  name: t.string,
  questions: Questions
})
export type DecisionTree = t.TypeOf<typeof DecisionTree>
