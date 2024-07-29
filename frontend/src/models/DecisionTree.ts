import * as t from 'io-ts'

// Define your types
export const Answer = t.type({
  answer: t.string,
  nextQuestionId: t.union([t.string, t.undefined]),
  nextConclusionId: t.union([t.string, t.undefined]),
  result: t.union([t.string, t.undefined]),
  subresult: t.union([t.string, t.undefined]),  // TODO: Remove also from base.schema.json
  answerComment: t.union([t.string, t.undefined]),
  labels: t.union([t.array(t.string), t.undefined]),
  redirects: t.union([t.array(t.string), t.undefined])
})
export type Answer = t.TypeOf<typeof Answer>

export const Source = t.type({
  source: t.string,
  url: t.string
})
export type Source = t.TypeOf<typeof Source>

export const Question = t.type({
  questionId: t.string,
  question: t.string,
  sources: t.union([t.array(Source), t.undefined]),
  description: t.union([t.string, t.undefined]),
  questionType: t.string,
  answers: t.array(Answer)
})
export type Question = t.TypeOf<typeof Question>

export const Conclusion = t.type({
  conclusionId: t.string,
  conclusion: t.string,
  obligation: t.string,
  sources: t.union([t.array(Source), t.undefined]),
  questionType: t.string
})
export type Conclusion = t.TypeOf<typeof Conclusion>


export const Questions = t.array(Question)
export type Questions = t.TypeOf<typeof Questions>

export const DecisionTree = t.type({
  version: t.string,
  name: t.string,
  questions: Questions
})
export type DecisionTree = t.TypeOf<typeof DecisionTree>
