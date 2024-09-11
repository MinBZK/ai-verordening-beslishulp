import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('question', () => {
  const initialLabelsByCategoryNTB = `{
    "Soort toepassing": ["Nader te bepalen"],
    "Open-source": ["Nader te bepalen"],
    "Publicatiecategorie": ["Nader te bepalen"],
    "Systeemrisico": ["Nader te bepalen"],
    "Transparantieverplichtingen": ["Nader te bepalen"],
    "Rol": ["Nader te bepalen"]
  }`

  const initialAcceptedDisclaimer = sessionStorage.getItem('acceptedDisclaimer') ?? '0'
  const initialAnswers = JSON.parse(localStorage.getItem('answers') ?? '[]')
  const initialLabels = JSON.parse(localStorage.getItem('labels') ?? '{}')
  const initialLabelsByCategory = JSON.parse(localStorage.getItem('labelsbycategory') ?? initialLabelsByCategoryNTB)
  const initialQuestionId  = localStorage.getItem('currentquestion') ?? '0'
  const initialConclusionId = localStorage.getItem('currentconclusion') ?? ''

  const AcceptedDisclaimer = ref(String(initialAcceptedDisclaimer))
  const QuestionId = ref<any>(initialQuestionId)
  const ConclusionId = ref(String(initialConclusionId))
  const answers = ref(initialAnswers)
  const labels = ref(initialLabels)
  const LabelsByCategory = ref(initialLabelsByCategory)

  function setQuestionId(id: string | null) {
    QuestionId.value = id
    localStorage.setItem('currentquestion', QuestionId.value)
  }

  function setConclusionId(id: string) {
    ConclusionId.value = id
    localStorage.setItem('currentconclusion', ConclusionId.value)
  }

  function getLabelsByCategory() {
    // TODO: Research whether this variable can be access directly through refs
    return LabelsByCategory.value
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

  function addLabelByCategory(label: string, category: string) {
    if (JSON.stringify(LabelsByCategory.value[category]) === JSON.stringify(["Nader te bepalen"])) {
      LabelsByCategory.value[category] = []
    }
    LabelsByCategory.value[category].push(label)
    localStorage.setItem('labelsbycategory', JSON.stringify(LabelsByCategory.value))
  }

  function addAnswer(id: string) {
    answers.value.push(id)
    localStorage.setItem('answers', JSON.stringify(answers.value))
  }

  function revertAnswer(currentCategory: string) {
    QuestionId.value = answers.value[answers.value.length - 1]
    answers.value.pop()
    if(labels.value[QuestionId.value]) {
      const label: string = labels.value[QuestionId.value]
      LabelsByCategory.value[currentCategory].pop(label)
      if (LabelsByCategory.value[currentCategory].length === 0){
        LabelsByCategory.value[currentCategory].push("Nader te bepalen")
      }
      delete labels.value[QuestionId.value]
    }
    localStorage.setItem('answers', JSON.stringify(answers.value))
    localStorage.setItem('currentquestion', QuestionId.value)
    localStorage.setItem('labels', JSON.stringify(labels.value))
    localStorage.setItem('labelsbycategory', JSON.stringify(LabelsByCategory.value))
  }

  function reset() {
    answers.value = []
    QuestionId.value = '0'
    labels.value = {}
    LabelsByCategory.value = JSON.parse(initialLabelsByCategoryNTB)
    ConclusionId.value = ''
    localStorage.setItem('answers', JSON.stringify(answers.value))
    localStorage.setItem('currentquestion', QuestionId.value)
    localStorage.setItem('currentconclusion', ConclusionId.value)
    localStorage.setItem('labels', JSON.stringify(labels.value))
    localStorage.setItem('labelsbycategory', JSON.stringify(LabelsByCategory.value))
  }

  function acceptDisclaimer() {
    AcceptedDisclaimer.value = '1'
    sessionStorage.setItem('acceptedDisclaimer', '1')
  }

  return {
    AcceptedDisclaimer, initialLabelsByCategoryNTB, QuestionId, ConclusionId, answers, LabelsByCategory, getLabelsByCategory, setQuestionId, setConclusionId, addAnswer, getJsonLabels, addLabel,
    addLabelByCategory, revertAnswer, reset, acceptDisclaimer
  }
})
