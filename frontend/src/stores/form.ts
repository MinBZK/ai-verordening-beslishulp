import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useformStore = defineStore('counter', () => {
  const count = ref(0)
  const current_question = ref('0')
  const answers = ref([])

  function increment() {
    count.value++
  }

  return { count, current_question, answers, increment }
})
