import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('question', () => {
  const initialLabelsBySubCategoryNTB = `{
    "Rol": ["nader te bepalen"],
    "Operationeel": ["nader te bepalen"],
    "Soort toepassing": ["nader te bepalen"],
    "Risicogroep": ["nader te bepalen"],
    "Conformiteitsbeoordeling": ["nader te bepalen"],
    "Systeemrisico": ["nader te bepalen"],
    "Transparantieverplichting": ["nader te bepalen"]
  }`

  const initialAcceptedDisclaimer = sessionStorage.getItem('acceptedDisclaimer') ?? '0' //TODO: figure out why this is 0
  const initialAnswers = JSON.parse(localStorage.getItem('answers') ?? '[]')
  const initialLabels = JSON.parse(localStorage.getItem('labels') ?? '{}')
  const initialLabelsBySubCategory = JSON.parse(localStorage.getItem('labelsbysubcategory') ?? initialLabelsBySubCategoryNTB)
  const initialQuestionId = localStorage.getItem('currentquestion') ?? '1.2' //TODO: check if this is correct
  const initialConclusionId = localStorage.getItem('currentconclusion') ?? ''

  const AcceptedDisclaimer = ref(String(initialAcceptedDisclaimer))
  const QuestionId = ref<any>(initialQuestionId)
  const ConclusionId = ref(String(initialConclusionId))
  const answers = ref(initialAnswers)
  const labels = ref(initialLabels)
  const LabelsBySubCategory =  ref(initialLabelsBySubCategory)

  function setQuestionId(id: string | null) {
    QuestionId.value = id
    localStorage.setItem('currentquestion', QuestionId.value)
  }

  function setConclusionId(id: string) {
    ConclusionId.value = id
    localStorage.setItem('currentconclusion', ConclusionId.value)
  }

  function getLabelsBySubCategory() {
    // TODO: Research whether this variable can be access directly through refs
    return LabelsBySubCategory.value
  }


  function getJsonLabels() {
    const label_dict = JSON.parse(localStorage.getItem('labels') ?? '{}')
    const label_list = Object.values(label_dict).map(String)
    return label_list
  }

  function addLabel(label: string, question_id: string) {
    if (!labels.value[question_id]) {
      labels.value[question_id] = []
    }
    labels.value[question_id].push(label)
    localStorage.setItem('labels', JSON.stringify(labels.value))
  }

  function addLabelBySubCategory(label: string, subcategory: string | undefined) {
    if (subcategory) {
      if (JSON.stringify(LabelsBySubCategory.value[subcategory]) === JSON.stringify(['nader te bepalen'])) {
        LabelsBySubCategory.value[subcategory] = []
      }
      LabelsBySubCategory.value[subcategory].push(label)
      localStorage.setItem('labelsbysubcategory', JSON.stringify(LabelsBySubCategory.value))
    }
  }

  function updateLabelsAtConclusion() {
    /**
     * This function will change all the "nader te bepalen" labels to "niet van toepassing" when
     * the conclusion of the decision tree has been reached.
     */
    for (let key in LabelsBySubCategory.value) {
      if (JSON.stringify(LabelsBySubCategory.value[key]) === JSON.stringify(['nader te bepalen'])) {
        LabelsBySubCategory.value[key] = ['niet van toepassing']
      }
    }
    localStorage.setItem('labelsbysubcategory', JSON.stringify(LabelsBySubCategory.value))
  }

  function revertLabelsAtConclusion() {
    /**
     * This function will change all the "niet van toepassing" labels to "nader te bepalen" when
     * the back button has been clicked at the conclusion of the decision tree.
     */
    for (let key in LabelsBySubCategory.value) {
      if (JSON.stringify(LabelsBySubCategory.value[key]) === JSON.stringify(['niet van toepassing'])) {
        LabelsBySubCategory.value[key] = ['nader te bepalen']
      }
    }
    localStorage.setItem('labelsbysubcategory', JSON.stringify(LabelsBySubCategory.value))
  }

  function addAnswer(id: string) {
    answers.value.push(id)
    localStorage.setItem('answers', JSON.stringify(answers.value))
  }

  function revertAnswer(previousSubCategory: string) {
    QuestionId.value = answers.value[answers.value.length - 1]
    answers.value.pop()
    if (labels.value[QuestionId.value]) {
      const label: string = labels.value[QuestionId.value]
      LabelsBySubCategory.value[previousSubCategory].pop(label)
      if (LabelsBySubCategory.value[previousSubCategory].length === 0) {
        LabelsBySubCategory.value[previousSubCategory].push('nader te bepalen')
      }
      delete labels.value[QuestionId.value]
    }
    localStorage.setItem('answers', JSON.stringify(answers.value))
    localStorage.setItem('currentquestion', QuestionId.value)
    localStorage.setItem('labels', JSON.stringify(labels.value))
    localStorage.setItem('labelsbysubcategory', JSON.stringify(LabelsBySubCategory.value))
  }

  function reset() {
    answers.value = []
    QuestionId.value = '1.2'
    labels.value = {}
    LabelsBySubCategory.value = JSON.parse(initialLabelsBySubCategoryNTB)
    ConclusionId.value = ''
    localStorage.setItem('answers', JSON.stringify(answers.value))
    localStorage.setItem('currentquestion', QuestionId.value)
    localStorage.setItem('currentconclusion', ConclusionId.value)
    localStorage.setItem('labels', JSON.stringify(labels.value))
    localStorage.setItem('labelsbysubcategory', JSON.stringify(LabelsBySubCategory.value))
  }

  function acceptDisclaimer() {
    AcceptedDisclaimer.value = '1'
    sessionStorage.setItem('acceptedDisclaimer', '1')
  }

  return {
    AcceptedDisclaimer,
    initialLabelsBySubCategoryNTB,
    QuestionId,
    ConclusionId,
    answers,
    LabelsBySubCategory,
    getLabelsBySubCategory,
    setQuestionId,
    setConclusionId,
    addAnswer,
    getJsonLabels,
    addLabel,
    addLabelBySubCategory,
    updateLabelsAtConclusion,
    revertLabelsAtConclusion,
    revertAnswer,
    reset,
    acceptDisclaimer
  }
})
