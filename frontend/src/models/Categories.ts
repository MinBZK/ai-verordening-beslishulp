import * as t from 'io-ts'

// Define your types
export const Category = t.type({
  questionId: t.string,
  topic: t.string,
  topic_details: t.string
})
export type Category = t.TypeOf<typeof Category>

export const Categories = t.array(Category)
export type Categories = t.TypeOf<typeof Categories>
