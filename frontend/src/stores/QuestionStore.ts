import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('question', () => {
  const initialAcceptedDisclaimer = JSON.parse(sessionStorage.getItem('acceptedDisclaimer') || '0')
  const initialAnswers = JSON.parse(localStorage.getItem('answers') || '[]')
  const initialLabels = JSON.parse(localStorage.getItem('labels') || '{}')
  const initialQuestionId = JSON.parse(localStorage.getItem('currentquestion') || '0')

  const AcceptedDisclaimer = ref(String(initialAcceptedDisclaimer))
  const QuestionId = ref(String(initialQuestionId))
  const answers = ref(initialAnswers)
  const labels = ref(initialLabels)

  function setQuestionId(id: string) {
    QuestionId.value = id
    localStorage.setItem('currentquestion', JSON.stringify(QuestionId.value))
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

  function addAnswer(id: string) {
    answers.value.push(id)
    localStorage.setItem('answers', JSON.stringify(answers.value))
  }

  function revertAnswer() {
    QuestionId.value = answers.value[answers.value.length - 1]
    answers.value.pop()
    delete labels.value[QuestionId.value]
    localStorage.setItem('answers', JSON.stringify(answers.value))
    localStorage.setItem('labels', JSON.stringify(labels.value))
  }

  function reset() {
    answers.value = []
    QuestionId.value = '0'
    labels.value = {}
    localStorage.removeItem('answers')
    localStorage.removeItem('currentquestion')
    localStorage.removeItem('labels')
  }

  function acceptDisclaimer() {
    AcceptedDisclaimer.value = '1'
    sessionStorage.setItem('acceptedDisclaimer', '1')
  }

  return { AcceptedDisclaimer, QuestionId, answers, setQuestionId, addAnswer, getJsonLabels, addLabel, revertAnswer,
    reset, acceptDisclaimer }
})
