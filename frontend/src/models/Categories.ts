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

const stateValue = t.union([t.literal('completed'), t.literal('doing'), t.literal('incomplete')])
// 'rvo-progress-tracker__step--completed'
// 'rvo-progress-tracker__step--doing'
// 'rvo-progress-tracker__step--incomplete'
//

export const CategoryState = t.type({
  type_ai_systeem_state: stateValue,
  open_source_state: stateValue,
  uitzonderingsgrond_state: stateValue,
  risicocategorie_state: stateValue,
  systeemrisico_state: stateValue,
  transparantie_risico_state: stateValue,
  entiteit_rol_state: stateValue
})
export type CategoryState = t.TypeOf<typeof CategoryState>
