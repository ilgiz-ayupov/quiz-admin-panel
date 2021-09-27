import Vue from "vue"
import Router from "vue-router"
import Home from "@/views/Home"
import QuestionList from "@/views/QuestionList"
import Register from "@/views/Register"
import Login from "@/views/Login"

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/question-list",
            component: QuestionList
        },
        {
            path: "/register",
            component: Register,
        },
        {
            path: "/login",
            component: Login
        }
    ]
})