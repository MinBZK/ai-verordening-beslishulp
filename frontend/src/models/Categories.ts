import * as t from 'io-ts'

// Define your types
export const Category = t.type({
  questionId: t.string,
  category: t.string,
  subcategory: t.string
})
export type Category = t.TypeOf<typeof Category>

export const Categories = t.array(Category)
export type Categories = t.TypeOf<typeof Categories>

// The progress a user has made in a category, used by the progress tracker
export type CategoryStateValue = 'completed' | 'doing' | 'incomplete'

export interface CategoryProgress {
  category: string
  state: CategoryStateValue
}
