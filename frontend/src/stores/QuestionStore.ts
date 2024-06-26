import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('question', () => {
  const initialAnswers = JSON.parse(localStorage.getItem('answers') || '[]')
  const initialQuestionId = JSON.parse(localStorage.getItem('currentquestion') || '0')

  const QuestionId = ref(String(initialQuestionId))
  const answers = ref(initialAnswers)

  function setQuestionId(id: string) {
    QuestionId.value = id
    localStorage.setItem('currentquestion', JSON.stringify(QuestionId.value))
  }

  function addAnswer(id: string) {
    answers.value.push(id)
    localStorage.setItem('answers', JSON.stringify(answers.value))
  }

  function revertAnswer() {
    QuestionId.value = answers.value[answers.value.length - 1]
    answers.value.pop()
    localStorage.setItem('answers', JSON.stringify(answers.value))
  }

  function reset() {
    answers.value = []
    QuestionId.value = '0'
    localStorage.removeItem('answers')
    localStorage.removeItem('currentquestion')
  }

  return { QuestionId, answers, setQuestionId, addAnswer, revertAnswer, reset }
})
