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


// TODO: This data structure is not used right now
const stateValue = t.union([t.literal('completed'), t.literal('doing'), t.literal('incomplete')])

export const CategoryState = t.type({
  soort_toepassing_state: stateValue,
  open_source_state: stateValue,
  uitzonderingen_state: stateValue,
  publicatiecategorie_state: stateValue,
  systeemrisico_state: stateValue,
  transparantieverplichtingen_state: stateValue,
  rol_state: stateValue
})
export type CategoryState = t.TypeOf<typeof CategoryState>
