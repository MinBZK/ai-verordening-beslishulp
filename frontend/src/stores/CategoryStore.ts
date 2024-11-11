import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const startCategory = 'AI verordening van toepassing?'
  const initialPreviousCategory = localStorage.getItem('previousCategory') ?? startCategory
  const initialCurrentCategory = localStorage.getItem('currentCategory') ?? startCategory
  const initialCategoryTrace = JSON.parse(localStorage.getItem('categoryTrace') ?? '[]')
  const initialCategoryStateString = `{
  "ai_act_applicable_state": "doing",
  "risk_group_state": "incomplete"
}`
  const categoryMapper = {
    'AI verordening van toepassing?': 'ai_act_applicable_state',
    'Welke risicogroep?': 'risk_group_state'
  }
  const initialCategoryState = JSON.parse(localStorage.getItem('categoryState') ?? initialCategoryStateString)

  const previousCategory = ref(String(initialPreviousCategory))
  const currentCategory = ref(String(initialCurrentCategory))
  const categoryTrace = ref(initialCategoryTrace)
  const categoryState = ref(initialCategoryState)


  function updateCurrentCategory(category: string | undefined) {
    if(category) {
      previousCategory.value = currentCategory.value
      currentCategory.value = category
      categoryTrace.value.push(category)
      localStorage.setItem('categoryTrace', JSON.stringify(categoryTrace.value))
      localStorage.setItem('previousCategory', previousCategory.value)
      localStorage.setItem('currentCategory', currentCategory.value)
      updateCategoryState()
    }
  }

  function updateCategoryState() {
    /**
     * Update the CategoryState by looking at the currentCategory only
     */
    const currentCategoryKey = categoryMapper[currentCategory.value as keyof typeof categoryMapper]
    const previousCategoryKey = categoryMapper[previousCategory.value as keyof typeof categoryMapper]
    if (previousCategoryKey != currentCategoryKey) {
      categoryState.value[previousCategoryKey] = "completed"
      categoryState.value[currentCategoryKey] = "doing"
      localStorage.setItem('categoryState', JSON.stringify(categoryState.value))
    }
  }

  function revertCategoryState() {
    /**
     * Update the CategoryState by looking at the currentCategory only
     */
    if (previousCategory.value != currentCategory.value) {
      const currentCategoryKey = categoryMapper[currentCategory.value as keyof typeof categoryMapper]
      const previousCategoryKey = categoryMapper[previousCategory.value as keyof typeof categoryMapper]
      categoryState.value[currentCategoryKey] = "incomplete"
      categoryState.value[previousCategoryKey] = "doing"
      localStorage.setItem('categoryState', JSON.stringify(categoryState.value))
    }
  }

  function revertCurrentCategory() {
    /**
     * Set the currentCategory back to incomplete when the previousCategory is different
     */
    revertCategoryState()
    if(categoryTrace.value.length - 2 > 0){
      currentCategory.value = categoryTrace.value[categoryTrace.value.length - 2]
    }else{
      currentCategory.value = startCategory
    }
    categoryTrace.value.pop()
    if(categoryTrace.value.length - 2 > 0) {
      previousCategory.value = categoryTrace.value[categoryTrace.value.length - 2]
    } else {
      previousCategory.value = startCategory
    }
    localStorage.setItem('categoryTrace', JSON.stringify(categoryTrace.value))
    localStorage.setItem('previousCategory', previousCategory.value)
    localStorage.setItem('currentCategory', currentCategory.value)
  }

  function reset() {
    currentCategory.value = startCategory
    previousCategory.value = startCategory
    categoryState.value = JSON.parse(initialCategoryStateString)
    categoryTrace.value = []
    localStorage.removeItem('currentCategory')
    localStorage.removeItem('previousCategory')
    localStorage.removeItem('categoryState')
    localStorage.removeItem('categoryTrace')
  }

  return { categoryState, previousCategory, revertCurrentCategory, updateCurrentCategory, reset }
})
