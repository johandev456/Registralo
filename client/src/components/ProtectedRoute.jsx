import { Navigate,Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute=()=>{
    const user= userAuthStore((state)=>state.user)
    return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute