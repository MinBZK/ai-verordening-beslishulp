import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const startCategory = 'AI verordening van toepassing?'
  const startSubCategory = 'Soort toepassing'
  const initialPreviousCategory = localStorage.getItem('previousCategory') ?? startCategory
  const initialPreviousSubCategory = localStorage.getItem('previousSubCategory') ?? startSubCategory
  const initialCurrentCategory = localStorage.getItem('currentCategory') ?? startCategory
  const initialCurrentSubCategory = localStorage.getItem('currentSubCategory') ?? startSubCategory
  const initialCategoryTrace = JSON.parse(localStorage.getItem('categoryTrace') ?? '[]')
  const initialSubCategoryTrace = JSON.parse(localStorage.getItem('subCategoryTrace') ?? '[]')
  const initialCategoryStateString = `{
  "ai_act_applicable_state": "doing",
  "risk_group_state": "incomplete"
}`
  const categoryMapper = {
    'AI verordening van toepassing?': 'ai_act_applicable_state',
    'Welke risicogroep?': 'risk_group_state'
  }

  const subCategoryCategoryMapper = {
    'Rol': 'ai_act_applicable_state',
    'Operationeel': 'ai_act_applicable_state',
    'Soort toepassing': 'ai_act_applicable_state',
    'Risicogroep': 'risk_group_state',
    'Conformiteitsbeoordeling': 'risk_group_state',
    'Systeemrisico': 'risk_group_state',
    'Transparantieverplichting': 'risk_group_state'
  }

  const subCategoryCategoryMapperString = {
    'Rol': 'AI verordening van toepassing?',
    'Operationeel': 'AI verordening van toepassing?',
    'Soort toepassing': 'AI verordening van toepassing?',
    'Risicogroep': 'Welke risicogroep?',
    'Conformiteitsbeoordeling': 'Welke risicogroep?',
    'Systeemrisico': 'Welke risicogroep?',
    'Transparantieverplichting': 'Welke risicogroep?'
  }

  const initialCategoryState = JSON.parse(localStorage.getItem('categoryState') ?? initialCategoryStateString)
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
      localStorage.setItem('categoryTrace', JSON.stringify(categoryTrace.value))
      localStorage.setItem('subCategoryTrace', JSON.stringify(subCategoryTrace.value))
      localStorage.setItem('previousCategory', previousCategory.value)
      localStorage.setItem('previousSubCategory', previousSubCategory.value)
      localStorage.setItem('currentCategory', currentCategory.value)
      localStorage.setItem('currentSubCategory', currentSubCategory.value)
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
    const currentCategoryKey = categoryMapper[currentCategory.value as keyof typeof categoryMapper]
    const previousCategoryKey = categoryMapper[previousCategory.value as keyof typeof categoryMapper]
    if (previousCategoryKey != currentCategoryKey) {
      categoryState.value[currentCategoryKey] = "incomplete"
      categoryState.value[previousCategoryKey] = "doing"
      localStorage.setItem('categoryState', JSON.stringify(categoryState.value))
    }
  }

  function revertCurrentCategory() {
    /**
     * Set the currentCategory back to incomplete when the previousCategory is different
     */
    // Categories section
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
    // Subcategories section
    if(subCategoryTrace.value.length - 2 > 0){
      currentSubCategory.value = subCategoryTrace.value[subCategoryTrace.value.length - 2]
    }else{
      currentSubCategory.value = startSubCategory
    }
    subCategoryTrace.value.pop()

    if(subCategoryTrace.value.length - 2 > 0) {
      previousSubCategory.value = subCategoryTrace.value[subCategoryTrace.value.length - 2]
    } else {
      previousSubCategory.value = startSubCategory
    }

    localStorage.setItem('categoryTrace', JSON.stringify(categoryTrace.value))
    localStorage.setItem('subCategoryTrace', JSON.stringify(subCategoryTrace.value))
    localStorage.setItem('previousCategory', previousCategory.value)
    localStorage.setItem('previousSubCategory', previousSubCategory.value)
    localStorage.setItem('currentCategory', currentCategory.value)
    localStorage.setItem('currentSubCategory', currentSubCategory.value)
  }

  function reset() {
    currentCategory.value = startCategory
    currentSubCategory.value = startSubCategory
    previousCategory.value = startCategory
    previousSubCategory.value = startSubCategory
    categoryState.value = JSON.parse(initialCategoryStateString)
    categoryTrace.value = []
    subCategoryTrace.value = []
    localStorage.removeItem('currentCategory')
    localStorage.removeItem('currentSubCategory')
    localStorage.removeItem('previousCategory')
    localStorage.removeItem('previousSubCategory')
    localStorage.removeItem('categoryState')
    localStorage.removeItem('subCategoryState')
    localStorage.removeItem('categoryTrace')
    localStorage.removeItem('subCategoryTrace')
  }

  return { categoryState, previousSubCategory, revertCurrentCategory, updateCurrentCategory, reset }
})
