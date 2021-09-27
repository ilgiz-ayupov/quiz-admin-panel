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
      <h1 class="h2">Регистрация</h1>
    </div>
    <div v-if="message" class="alert" :class="status" role="alert">
      {{ message }}
    </div>
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label"
          >Адрес электронной почты</label
        >
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Пароль</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="password"
        />
      </div>
      <button
        type="submit"
        class="btn btn-success"
        @click.prevent="userRegister"
      >
        Создать аккаунт
      </button>
    </form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
      status: ""
    };
  },
  methods: {
    userRegister() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.status = "alert-success"
          this.message = `Вы успешно зарегистрировались. ${user.email}.`
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode == "auth/email-already-in-use"){
            this.status = "alert-warning"
            this.message = "Пользователь с таким email уже существует."
          }
          
        });

      this.email = "";
      this.password = "";
    },
  },
};
</script>