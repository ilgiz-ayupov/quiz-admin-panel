import { getAuth, onAuthStateChanged } from "firebase/auth"

export const checkUser = () => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Авторизован");
            return user.email
        } else {
            console.log("Не авторизован");
            return false
        }
    })
}
