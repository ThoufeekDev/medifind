import { Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";


interface Props{
    children:React.ReactNode,
}

export default function PublicRoute({children}:Props){
   const {isAuthenticated,isCheckingAuth} = useAuthStore();

   if(isCheckingAuth){
       return <p>Loading...</p>
   }


   if(isAuthenticated){
      return (
         <Navigate to="/" replace/>
      )
   }

   return children;
}