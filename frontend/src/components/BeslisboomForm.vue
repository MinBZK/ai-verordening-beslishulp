<script setup lang="ts">
import { load } from 'js-yaml'
import { ref, onMounted } from 'vue'
import { DecisionTree, Questions } from '../models/DecisionTree'
import { PathReporter } from 'io-ts/PathReporter'
import { fold } from 'fp-ts/lib/Either'
import * as t from 'io-ts'

const data = ref<Questions>([])

onMounted(async () => {
  const response = await fetch('/decision-tree.yaml')
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const text = await response.text()
  const yamlData = load(text)

  const validationResult: t.Validation<any> = DecisionTree.decode(yamlData)

  fold(
    (errors: t.Errors) => console.error('Validation failed:', errors),
    (validData: DecisionTree) => (data.value = validData.questions) // validData is the decoded object
  )(validationResult)
})
</script>

<template>
  <pre>{{ data }}</pre>
  <div>
    <form>
      <!-- <div v-for="node in nodes" :key="node.id" class="form-group">
        <label :for="node.id">{{ node.id }}</label>
        <input
          v-model="formStore.formData[node.id]"
          :id="node.id"
          :name="node.id"
          class="form-control"
        />
      </div> -->
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
