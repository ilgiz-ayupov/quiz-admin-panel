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
      <h1 class="h2">Вход</h1>
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
      <button type="submit" class="btn btn-primary" @click.prevent="userLogin">
        Войти
      </button>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
      status: "",
    };
  },
  methods: {
    userLogin() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.status = "alert-success";
          this.message = `Вы успешно авторизовались.`;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode == "auth/wrong-password") {
            this.status = "alert-danger";
            this.message = "Неправильный пароль.";
          }
          if (errorCode == "auth/invalid-email") {
            this.status = "alert-danger";
            this.message = "Неправильный адрес электронной почты.";
          }
          console.log(errorCode);
        });
    },
  },
};
</script>