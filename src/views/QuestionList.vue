<template>
  <div>
    <div v-if="message" class="alert" :class="status" role="alert">
      {{ message }}
    </div>
    <div
      class="
        d-flex
        flex-column
        justify-content-between
        flex-wrap flex-md-nowrap
        align-items-center
        text-center
        pt-3
        pb-2
        mb-3
        border-bottom
      "
    >
      <h1 class="h2">Добавить вопрос:</h1>
      <form class="questionForm">
        <div class="mb-3">
          <label for="questionId" class="form-label">Вопрос</label>
          <input
            type="text"
            name="question"
            class="form-control"
            id="questionId"
            v-model="question"
          />
        </div>
        <div class="mb-3">
          <label for="answerId" class="form-label">Ответ</label>
          <input
            type="text"
            name="answer"
            class="form-control"
            id="answerId"
            v-model="answer"
            @input="changeAnswerInput"
          />
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">Картинка</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            class="form-control"
            id="image"
            @change="previewFiles"
          />
        </div>
        <div class="mb-3">
          <label for="optionsId" class="form-label">Варианты ответа</label>
          <div class="optionsAnswer">
            <input
              type="type"
              name="answerOptions"
              class="form-control"
              id="optionsId"
              :value="answerOptionOne"
            />
            <input
              type="type"
              name="answerOptions"
              class="form-control"
              v-model="answerOptionTwo"
            />
            <input
              type="type"
              name="answerOptions"
              class="form-control"
              v-model="answerOptionThird"
            />
            <input
              type="type"
              name="answerOptions"
              class="form-control"
              v-model="answerOptionFour"
            />
          </div>
        </div>
        <button
          class="btn btn-success"
          @click.prevent="addQuestion"
          @keydown.enter="addQuestion"
        >
          Добавить
        </button>
      </form>
    </div>
    <h2>Список вопросов:</h2>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>№</th>
            <th>Вопрос</th>
            <th>Ответ</th>
            <th>Варианты ответа</th>
          </tr>
        </thead>
        <tbody>
          <TableQuestionItem
            v-for="(question, index) in questions"
            :key="index"
            :index="index"
            :question="question"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>


<style scoped>
.questionForm {
  width: 40%;
}

.optionsAnswer input {
  margin-bottom: 1rem;
}
</style>

<script>
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import axios from "axios";
import { db } from "@/main.js";
import TableQuestionItem from "@/components/TableQuestionItem";

export default {
  data() {
    return {
      questions: [],
      question: "",
      answer: "",
      image: null,
      answerOptionOne: "",
      answerOptionTwo: "",
      answerOptionThird: "",
      answerOptionFour: "",

      message: "",
      status: "",
    };
  },
  async mounted() {
    const query = await getDocs(collection(db, "questions"));
    query.forEach((doc) => {
      this.questions.push(doc.data());
    });
  },
  methods: {
    async addQuestion() {
      if (
        !this.question ||
        !this.answer ||
        !this.answerOptionOne ||
        !this.answerOptionTwo ||
        !this.answerOptionThird ||
        !this.answerOptionFour
      ) {
        this.message = "Необходимо заполнить все поля !";
        this.status = "alert-danger";
        return;
      }

      // Добавление вопроса в список
      let index = this.questions.length + 1;
      const newQuestion = {
        question: this.question,
        answer: this.answer,
        answer_options: [
          this.answerOptionOne,
          this.answerOptionTwo,
          this.answerOptionThird,
          this.answerOptionFour,
        ],
      };

      if (this.image) {
        this.uploadFile(String(index));
        newQuestion.image = String(index);
      }

      this.questions.push(newQuestion);
      // Очистка переменных
      this.question = "";
      this.answer = "";
      this.answerOptionOne = "";
      this.answerOptionTwo = "";
      this.answerOptionThird = "";
      this.answerOptionFour = "";
      // Добавление вопроса в БД
      await setDoc(doc(db, "questions", String(index)), newQuestion);
      this.message = "Вопрос успешно добавлен !"
      this.status = "alert-success"
    },
    changeAnswerInput(e) {
      let value = e.target.value;
      this.answerOptionOne = value;
    },
    previewFiles(e) {
      this.image = e.target.files[0];
    },
    uploadFile(title) {
      const formData = new FormData();
      formData.append("file", this.image);
      formData.append("title", title);

      axios
        .post("http://localhost:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => (res))
        .catch((err) => console.log(err));
    },
  },
  components: {
    TableQuestionItem,
  },
};
</script> 


<style scoped>
td {
  font-size: 18px;
  padding: 15px 0;
}
</style>