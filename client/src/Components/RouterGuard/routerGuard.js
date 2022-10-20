import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function AuthRoute({ children }) {
    //check if login
    const isLogin = localStorage.getItem('profile')

    // If login, render directly and normally
    if (isLogin) {
        return <>{children}</>
    }
    // if not, Redirect to login route
    else {
        toast.error("Please login first")
        return <Navigate to='/login' replace />
    }
}

export { AuthRoute }