import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('question', () => {
  const initialAnswers = JSON.parse(localStorage.getItem('answers') || '[]')
  const initialLabels = JSON.parse(localStorage.getItem('labels') || '{}')
  const initialQuestionId = JSON.parse(localStorage.getItem('currentquestion') || '0')

  const QuestionId = ref(String(initialQuestionId))
  const answers = ref(initialAnswers)
  const labels = ref(initialLabels)

  function setQuestionId(id: string) {
    QuestionId.value = id
    localStorage.setItem('currentquestion', JSON.stringify(QuestionId.value))
  }

  function getLabels(){
    return localStorage.getItem('labels')
  }

  function getJsonLabels(){
    const label_dict = JSON.parse(localStorage.getItem('labels') ?? '{}')
    let label_list: string[] = []
    Object.entries(label_dict).forEach(
      ([_, value]) => label_list.push(String(value))
    );
    return label_list
  }

  function addLabel(label: string, question_id: string) {
    labels.value[question_id] = label // only works if we have one label per question_id
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

  return { QuestionId, answers, setQuestionId, addAnswer, getLabels, getJsonLabels, addLabel, revertAnswer, reset }
})
