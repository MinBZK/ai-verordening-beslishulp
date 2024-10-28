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


// TODO: This data structure is not used right now
const stateValue = t.union([t.literal('completed'), t.literal('doing'), t.literal('incomplete')])

export const CategoryState = t.type({
  ai_act_applicable_state: stateValue,
  risk_group_state: stateValue,
})

export type CategoryState = t.TypeOf<typeof CategoryState>
