<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ question.question }}</td>
    <td>{{ question.answer }}</td>
    <td>{{ question.answer_options }}</td>
    <td>
      <button class="btn btn-danger" @click="$emit('removeQuestion', index)">
        Удалить
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["index", "question"]
};
</script>