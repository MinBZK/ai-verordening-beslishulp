import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('question', () => {
  const initialLabelsBySubCategoryNTB = `{
    "Rol": ["nader te bepalen"],
    "Operationeel": ["nader te bepalen"],
    "Soort toepassing": ["nader te bepalen"],
    "Risicogroep": ["nader te bepalen"],
    "Conformiteitsbeoordelingsinstantie": ["nader te bepalen"],
    "Systeemrisico": ["nader te bepalen"],
    "Transparantieverplichting": ["nader te bepalen"],
    "Open source": ["nader te bepalen"]
  }`

  const initialAcceptedDisclaimer = sessionStorage.getItem('acceptedDisclaimer') ?? '0'
  const initialAnswers = JSON.parse(sessionStorage.getItem('answers') ?? '[]')
  const initialLabels = JSON.parse(sessionStorage.getItem('labels') ?? '{}')
  const initialLabelsBySubCategory = JSON.parse(sessionStorage.getItem('labelsbysubcategory') ?? initialLabelsBySubCategoryNTB)
  const initialQuestionId = sessionStorage.getItem('currentquestion') ?? '1.2'
  const initialConclusionId = sessionStorage.getItem('currentconclusion') ?? ''

  const AcceptedDisclaimer = ref(String(initialAcceptedDisclaimer))
  const QuestionId = ref<any>(initialQuestionId)
  const ConclusionId = ref(String(initialConclusionId))
  const answers = ref(initialAnswers)
  const labels = ref(initialLabels)
  const LabelsBySubCategory =  ref(initialLabelsBySubCategory)

  function setQuestionId(id: string | null) {
    QuestionId.value = id
    sessionStorage.setItem('currentquestion', QuestionId.value)
  }

  function setConclusionId(id: string) {
    ConclusionId.value = id
    sessionStorage.setItem('currentconclusion', ConclusionId.value)
  }

  function getLabelsBySubCategory() {
    // TODO: Research whether this variable can be access directly through refs
    return LabelsBySubCategory.value
  }


  function getJsonLabels() {
    const label_dict = JSON.parse(sessionStorage.getItem('labels') ?? '{}')
    const label_list = Object.values(label_dict).flat()
    return label_list
  }

  function addLabel(label: string, question_id: string) {
    if (!labels.value[question_id]) {
      labels.value[question_id] = []
    }
    labels.value[question_id].push(label)
    sessionStorage.setItem('labels', JSON.stringify(labels.value))
  }

  function addLabelBySubCategory(label: string, subcategory: string | undefined) {
    if (subcategory) {
      if (JSON.stringify(LabelsBySubCategory.value[subcategory]) === JSON.stringify(['nader te bepalen'])) {
        LabelsBySubCategory.value[subcategory] = []
      }
      LabelsBySubCategory.value[subcategory].push(label)
      sessionStorage.setItem('labelsbysubcategory', JSON.stringify(LabelsBySubCategory.value))
    }
  }

  function updateLabelsAtConclusion() {
    /**
     * This function will change all the "nader te bepalen" labels to "niet van toepassing" when
     * the conclusion of the beslishulp has been reached.
     */
    for (let key in LabelsBySubCategory.value) {
      if (JSON.stringify(LabelsBySubCategory.value[key]) === JSON.stringify(['nader te bepalen'])) {
        LabelsBySubCategory.value[key] = ['niet van toepassing']
      }
    }
    sessionStorage.setItem('labelsbysubcategory', JSON.stringify(LabelsBySubCategory.value))
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
    sessionStorage.setItem('labelsbysubcategory', JSON.stringify(LabelsBySubCategory.value))
  }

  function addAnswer(id: string) {
    answers.value.push(id)
    sessionStorage.setItem('answers', JSON.stringify(answers.value))
  }

  function revertAnswer(previousSubCategory: string) {
    /**
     * This function reverts the answer to the question if the user goes back a question.
     * For this purpose the QuestionId, answers, labels for the subcategory are reverted.
     * If there is no label for the subcategory, "nader te bepalen" is assigned.
     */
    QuestionId.value = answers.value[answers.value.length - 1]
    answers.value.pop()

    if (labels.value[QuestionId.value]) {
      const questionLabels: string[] = labels.value[QuestionId.value]

      questionLabels.forEach(label => {
        const labelIndex = LabelsBySubCategory.value[previousSubCategory].indexOf(label)
        if (labelIndex !== -1) {
          LabelsBySubCategory.value[previousSubCategory].splice(labelIndex, 1)
        }
      })

      if (LabelsBySubCategory.value[previousSubCategory].length === 0) {
        LabelsBySubCategory.value[previousSubCategory] = ['nader te bepalen']
      }

      delete labels.value[QuestionId.value]
    }

    sessionStorage.setItem('answers', JSON.stringify(answers.value))
    sessionStorage.setItem('currentquestion', QuestionId.value)
    sessionStorage.setItem('labels', JSON.stringify(labels.value))
    sessionStorage.setItem('labelsbysubcategory', JSON.stringify(LabelsBySubCategory.value))
  }

  function reset() {
    answers.value = []
    QuestionId.value = '1.2'
    labels.value = {}
    LabelsBySubCategory.value = JSON.parse(initialLabelsBySubCategoryNTB)
    ConclusionId.value = ''
    sessionStorage.setItem('answers', JSON.stringify(answers.value))
    sessionStorage.setItem('currentquestion', QuestionId.value)
    sessionStorage.setItem('currentconclusion', ConclusionId.value)
    sessionStorage.setItem('labels', JSON.stringify(labels.value))
    sessionStorage.setItem('labelsbysubcategory', JSON.stringify(LabelsBySubCategory.value))
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
