import { redirect } from "react-router"

export const logoutLoader = ({request, params}: any) => {
    return redirect('/login')
}