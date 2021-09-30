<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ question.question }}</td>
    <td>{{ question.answer }}</td>
    <td>{{ question.answer_options }}</td>
    <td>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["index", "question"]
};
</script>