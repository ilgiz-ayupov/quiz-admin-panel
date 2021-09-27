<template>
  <div>
    <div
      class="
        d-flex
        justify-content-between
        flex-wrap flex-md-nowrap
        align-items-center
        pt-3
        pb-2
        mb-3
        border-bottom
      "
    >
      <h1 class="h2">Главная страница</h1>
    </div>
    <h2>Список участников:</h2>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>№</th>
            <th>Telegram ID</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Username</th>
            <th>Текущий вопрос</th>
            <th>Правильных ответов</th>
            <th>Неправильных ответов</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          <TableUserItem
            v-for="(user, index) in users"
            :key="index"
            :user="user"
            :index="index"
          />
        </tbody>
      </table>
    </div>

    <h3>Викторину закончили:</h3>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>№</th>
            <th>Telegram ID</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Username</th>
            <th>Текущий вопрос</th>
            <th>Правильных ответов</th>
            <th>Неправильных ответов</th>
            <th>Время</th>
          </tr>
        </thead>
        <tbody>
          <TableQuizEndUserItem
            v-for="(user, index) in quizEndUsers"
            :key="index"
            :user="user"
            :index="index"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/main.js";
import TableUserItem from "@/components/TableUserItem.vue";
import TableQuizEndUserItem from "@/components/TableQuizEndUserItem.vue";

export default {
  data() {
    return {
      users: [],
      quizEndUsers: [],
    };
  },
  async mounted() {
    // Получение пользователей
    const users = query(
      collection(db, "users"),
      where("status", "!=", "Закончил викторину")
    );
    onSnapshot(users, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let found = false;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i]["telegramId"] == doc.id) {
            found = true;
            this.users[i] = doc.data();
          }
        }
        if (!found) {
          this.users.push(doc.data());
        }
        this.users.sort((user) => user["true_answer"]);
      });
    });

    // Получение пользователей, которые закончили викторину
    const quizEndUsers = query(
      collection(db, "users"),
      where("status", "==", "Закончил викторину")
    );
    onSnapshot(quizEndUsers, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let found = false;
        for (let i = 0; i < this.quizEndUsers.length; i++) {
          if (this.quizEndUsers[i]["telegramId"] == doc.id) {
            found = true;
            this.quizEndUsers = this.quizEndUsers.filter((user) => {
              user["status"] == "Закончил викторину";
            });
            this.quizEndUsers[i] = doc.data();
          }
        }
        if (!found) {
          this.users = this.users.filter((user) => {
            user["telegramId"] != doc.id;
          });
          this.quizEndUsers.push(doc.data());
        }
        this.quizEndUsers.sort((user) => user.true_answer);
      });
    });
  },
  components: {
    TableUserItem,
    TableQuizEndUserItem,
  },
};
</script>

<style scoped>
h3 {
  margin-top: 80px;
}

.statusСircle {
  width: 20px;
  height: 20px;
}
</style>
