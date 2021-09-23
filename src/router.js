import Vue from "vue"
import Router from "vue-router"
import Home from "@/views/Home"
import QuestionList from "@/views/QuestionList"

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
        }
    ]
})