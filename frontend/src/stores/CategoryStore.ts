import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import categories_json from '@/assets/categories.json'
import type { CategoryProgress, CategoryStateValue } from '@/models/Categories'

export const useCategoryStore = defineStore('category', () => {
  /**
   * categories.yaml is the single source of truth for the categories: the order in which the
   * categories first appear there is the order in which the user traverses them.
   */
  const categoryOrder = [...new Set(categories_json.map((category) => category.category))]
  const startCategory = categoryOrder[0] ?? ''
  const startSubCategory = categories_json[0]?.subcategory ?? ''
  const initialPreviousCategory = sessionStorage.getItem('previousCategory') ?? startCategory
  const initialPreviousSubCategory =
    sessionStorage.getItem('previousSubCategory') ?? startSubCategory
  const initialCurrentCategory = sessionStorage.getItem('currentCategory') ?? startCategory
  const initialCurrentSubCategory = sessionStorage.getItem('currentSubCategory') ?? startSubCategory
  const initialCategoryTrace = JSON.parse(
    sessionStorage.getItem('categoryTrace') ?? JSON.stringify([startCategory])
  )
  const initialSubCategoryTrace = JSON.parse(
    sessionStorage.getItem('subCategoryTrace') ?? JSON.stringify([startSubCategory])
  )
  const previousCategory = ref(String(initialPreviousCategory))
  const previousSubCategory = ref(String(initialPreviousSubCategory))
  const currentCategory = ref(String(initialCurrentCategory))
  const currentSubCategory = ref(String(initialCurrentSubCategory))
  const categoryTrace = ref(initialCategoryTrace)
  const subCategoryTrace = ref(initialSubCategoryTrace)

  /**
   * The progress per category, in the order of categories.yaml. A category is only completed once
   * the user has moved on to a later category, so a category stays "doing" for every question
   * within that category.
   */
  const categoryState = computed<CategoryProgress[]>(() => {
    const currentIndex = Math.max(categoryOrder.indexOf(currentCategory.value), 0)
    return categoryOrder.map((category, index) => {
      let state: CategoryStateValue = 'incomplete'
      if (index < currentIndex) {
        state = 'completed'
      } else if (index === currentIndex) {
        state = 'doing'
      }
      return { category, state }
    })
  })

  function updateCurrentCategory(category: string | undefined, subcategory: string | undefined) {
    if (category && subcategory) {
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
    }
  }

  function revertCurrentCategory() {
    /**
     * Go back one step in the trace, so the currentCategory is the category of the question the
     * user returns to
     */
    // Categories section
    categoryTrace.value.pop()
    currentCategory.value = categoryTrace.value[categoryTrace.value.length - 1] ?? startCategory
    previousCategory.value = categoryTrace.value[categoryTrace.value.length - 2] ?? startCategory
    // Subcategories section
    if (subCategoryTrace.value.length - 1 > 0) {
      currentSubCategory.value = subCategoryTrace.value[subCategoryTrace.value.length - 1]
    } else {
      currentSubCategory.value = startSubCategory
    }
    subCategoryTrace.value.pop()

    if (subCategoryTrace.value.length - 1 > 0) {
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
