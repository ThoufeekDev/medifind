import { Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";


interface Props {
    children:
    React.ReactNode
}

export default function ProtectedRoute({children,}:Props){
     const {isAuthenticated,isCheckingAuth} = useAuthStore();


     if(isCheckingAuth){

        return <p>Loading...</p>
     }
    
     if(!isAuthenticated){
        return (
            <Navigate to="/login" replace/>
        )
     }

     return children
}