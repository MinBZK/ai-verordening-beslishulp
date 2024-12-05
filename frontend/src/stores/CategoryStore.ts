import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const startCategory = 'AI-verordening van toepassing?'
  const startSubCategory = 'Soort toepassing'
  const initialPreviousCategory = sessionStorage.getItem('previousCategory') ?? startCategory
  const initialPreviousSubCategory = sessionStorage.getItem('previousSubCategory') ?? startSubCategory
  const initialCurrentCategory = sessionStorage.getItem('currentCategory') ?? startCategory
  const initialCurrentSubCategory = sessionStorage.getItem('currentSubCategory') ?? startSubCategory
  const initialCategoryTrace = JSON.parse(sessionStorage.getItem('categoryTrace') ?? '["AI-verordening van toepassing?"]')
  const initialSubCategoryTrace = JSON.parse(sessionStorage.getItem('subCategoryTrace') ?? '["Soort toepassing"]')
  const initialCategoryStateString = `{
  "ai_act_applicable_state": "doing",
  "risk_group_state": "incomplete"
}`
  const categoryMapper = {
    'AI-verordening van toepassing?': 'ai_act_applicable_state',
    'Welke risicogroep geldt?': 'risk_group_state'
  }

  const initialCategoryState = JSON.parse(sessionStorage.getItem('categoryState') ?? initialCategoryStateString)
  const previousCategory = ref(String(initialPreviousCategory))
  const previousSubCategory = ref(String(initialPreviousSubCategory))
  const currentCategory = ref(String(initialCurrentCategory))
  const currentSubCategory = ref(String(initialCurrentSubCategory))
  const categoryTrace = ref(initialCategoryTrace)
  const subCategoryTrace = ref(initialSubCategoryTrace)
  const categoryState = ref(initialCategoryState)


  function updateCurrentCategory(category: string | undefined, subcategory: string |undefined) {
    if(category && subcategory) {
      previousCategory.value = currentCategory.value
      previousSubCategory.value = currentSubCategory.value
      currentCategory.value = category
      currentSubCategory.value = subcategory
      categoryTrace.value.push(category)
      subCategoryTrace.value.push(subcategory)
      sessionStorage.setItem('categoryTrace', JSON.stringify(categoryTrace.value))
      sessionStorage.setItem('subCategoryTrace', JSON.stringify(subCategoryTrace.value))
      sessionStorage.setItem('previousCategory', previousCategory.value)
      sessionStorage.setItem('previousSubCategory', previousSubCategory.value)
      sessionStorage.setItem('currentCategory', currentCategory.value)
      sessionStorage.setItem('currentSubCategory', currentSubCategory.value)
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
      sessionStorage.setItem('categoryState', JSON.stringify(categoryState.value))
    }
  }

  function revertCategoryState() {
    /**
     * Update the CategoryState by looking at the currentCategory only
     */
    const currentCategoryKey = categoryMapper[currentCategory.value as keyof typeof categoryMapper]
    const previousCategoryKey = categoryMapper[previousCategory.value as keyof typeof categoryMapper]
    if (previousCategoryKey != currentCategoryKey) {
      categoryState.value[currentCategoryKey] = "incomplete"
      categoryState.value[previousCategoryKey] = "doing"
      sessionStorage.setItem('categoryState', JSON.stringify(categoryState.value))
    }
  }

  function revertCurrentCategory() {
    /**
     * Set the currentCategory back to incomplete when the previousCategory is different
     */
    // Categories section
    revertCategoryState()
    if(categoryTrace.value.length - 1 > 0){
      currentCategory.value = categoryTrace.value[categoryTrace.value.length - 1]
    }else{
      currentCategory.value = startCategory
    }
    categoryTrace.value.pop()

    if(categoryTrace.value.length - 1 > 0) {
      previousCategory.value = categoryTrace.value[categoryTrace.value.length - 1]
    } else {
      previousCategory.value = startCategory
    }
    // Subcategories section
    if(subCategoryTrace.value.length - 1 > 0){
      currentSubCategory.value = subCategoryTrace.value[subCategoryTrace.value.length - 1]
    }else{
      currentSubCategory.value = startSubCategory
    }
    subCategoryTrace.value.pop()

    if(subCategoryTrace.value.length - 1 > 0) {
      previousSubCategory.value = subCategoryTrace.value[subCategoryTrace.value.length - 1]
    } else {
      previousSubCategory.value = startSubCategory
    }

    sessionStorage.setItem('categoryTrace', JSON.stringify(categoryTrace.value))
    sessionStorage.setItem('subCategoryTrace', JSON.stringify(subCategoryTrace.value))
    sessionStorage.setItem('previousCategory', previousCategory.value)
    sessionStorage.setItem('previousSubCategory', previousSubCategory.value)
    sessionStorage.setItem('currentCategory', currentCategory.value)
    sessionStorage.setItem('currentSubCategory', currentSubCategory.value)
  }

  function reset() {
    currentCategory.value = startCategory
    currentSubCategory.value = startSubCategory
    previousCategory.value = startCategory
    previousSubCategory.value = startSubCategory
    categoryState.value = JSON.parse(initialCategoryStateString)
    categoryTrace.value = [startCategory]
    subCategoryTrace.value = [startSubCategory]
    sessionStorage.removeItem('currentCategory')
    sessionStorage.removeItem('currentSubCategory')
    sessionStorage.removeItem('previousCategory')
    sessionStorage.removeItem('previousSubCategory')
    sessionStorage.removeItem('categoryState')
    sessionStorage.removeItem('subCategoryState')
    sessionStorage.removeItem('categoryTrace')
    sessionStorage.removeItem('subCategoryTrace')
  }

  return { categoryState, previousSubCategory, revertCurrentCategory, updateCurrentCategory, reset }
})
