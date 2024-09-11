import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const initialPreviousCategory =localStorage.getItem('previousCategory') || 'Type AI-Systeem'
  const initialCurrentCategory = localStorage.getItem('currentCategory') || 'Type AI-Systeem'
  const initialCategoryTrace = JSON.parse(localStorage.getItem('categoryTrace') || '[]')
  const initialCategoryStateString = `{
  "soort_toepassing_state": "doing",
  "open_source_state": "incomplete",
  "publicatiecategorie_state": "incomplete",
  "systeemrisico_state": "incomplete",
  "transparantieverplichtingen_state": "incomplete",
  "rol_state": "incomplete"
}`
  const categoryMapper = {
    'Type AI-Systeem': 'soort_toepassing_state',
    'Open-source': 'open_source_state',
    'Publicatiecategorie': 'publicatiecategorie_state',
    'Systeemrisico': 'systeemrisico_state',
    'Transparantieverplichtingen': 'transparantieverplichtingen_state',
    'Rol': 'rol_state'
  }
  const initialCategoryState = JSON.parse(localStorage.getItem('categoryState') || initialCategoryStateString)

  const previousCategory = ref(String(initialPreviousCategory))
  const currentCategory = ref(String(initialCurrentCategory))
  const categoryTrace = ref(initialCategoryTrace)
  const categoryState = ref(initialCategoryState)

  function updateCurrentCategory(category: string) {
    previousCategory.value = currentCategory.value
    currentCategory.value = category
    categoryTrace.value.push(category)
    localStorage.setItem('categoryTrace', JSON.stringify(categoryTrace.value))
    localStorage.setItem('previousCategory', previousCategory.value)
    localStorage.setItem('currentCategory', currentCategory.value)
    updateCategoryState()
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

  function revertCurrentCategory() {
    /**
     * Set the currentCategory back to incomplete when the previousCategory is different
     */
    if (previousCategory.value != currentCategory.value) {
      const currentCategoryKey = categoryMapper[currentCategory.value as keyof typeof categoryMapper]
      categoryState.value[currentCategoryKey] = "incomplete"
      localStorage.setItem('categoryState', JSON.stringify(categoryState.value))
    }
    currentCategory.value = categoryTrace.value[categoryTrace.value.length - 1]
    categoryTrace.value.pop()
    previousCategory.value = categoryTrace.value[categoryTrace.value.length - 1]
    localStorage.setItem('categoryTrace', JSON.stringify(categoryTrace.value))
    localStorage.setItem('previousCategory', previousCategory.value)
    localStorage.setItem('currentCategory', currentCategory.value)
    updateCategoryState()
  }

  function reset() {
    currentCategory.value = 'Type AI-Systeem'
    previousCategory.value = 'Type AI-Systeem'
    categoryState.value = JSON.parse(initialCategoryStateString)
    categoryTrace.value = []
    localStorage.removeItem('currentCategory')
    localStorage.removeItem('previousCategory')
    localStorage.removeItem('categoryState')
    localStorage.removeItem('categoryTrace')
  }

  return { categoryState, revertCurrentCategory, updateCurrentCategory, reset }
})
