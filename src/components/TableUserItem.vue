<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ user.telegramId }}</td>
    <td>{{ user.firstName }}</td>
    <td>{{ user.lastName }}</td>
    <td>@{{ user.userName }}</td>
    <td>{{ user.currentQuestion - 1 }}</td>
    <td>{{ user.true_answer }}</td>
    <td>{{ user.false_answer }}</td>
    <td>{{ user.status }}</td>
  </tr>
</template>


<script>

export default {
  props: ["index", "user"]
}
</script>
