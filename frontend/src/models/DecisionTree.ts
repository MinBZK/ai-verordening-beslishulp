import * as t from 'io-ts'

// Define your types
export const Redirect = t.type({
  nextQuestionId: t.union([t.string, t.undefined]),
  nextConclusionId: t.union([t.string, t.undefined]),
  if: t.string
})
export type Redirect = t.TypeOf<typeof Redirect>

export const Answer = t.type({
  answer: t.string,
  nextQuestionId: t.union([t.string, t.undefined]),
  nextConclusionId: t.union([t.string, t.undefined]),
  subresult: t.union([t.string, t.undefined]),
  labels: t.union([t.array(t.string), t.undefined]),
  redirects: t.union([t.array(Redirect), t.undefined])
})
export type Answer = t.TypeOf<typeof Answer>

export const Source = t.type({
  source: t.string,
  url: t.union([t.string, t.undefined])
})
export type Source = t.TypeOf<typeof Source>

export const Question = t.type({
  questionId: t.string,
  question: t.string,
  explanation: t.string,
  sources: t.union([t.array(Source), t.undefined]),
  description: t.union([t.string, t.undefined]),
  answers: t.array(Answer)
})
export type Question = t.TypeOf<typeof Question>

export const Questions = t.array(Question)
export type Questions = t.TypeOf<typeof Questions>

export const Conclusion = t.type({
  conclusionId: t.string,
  conclusion: t.string,
  conclusionComment: t.union([t.string, t.undefined]),
  obligation: t.string,
  sources: t.union([t.array(Source), t.undefined])
})
export type Conclusion = t.TypeOf<typeof Conclusion>

export const Conclusions = t.array(Conclusion)
export type Conclusions = t.TypeOf<typeof Conclusions>

export const DecisionTree = t.type({
  version: t.string,
  name: t.string,
  questions: Questions,
  conclusions: Conclusions
})
export type DecisionTree = t.TypeOf<typeof DecisionTree>
