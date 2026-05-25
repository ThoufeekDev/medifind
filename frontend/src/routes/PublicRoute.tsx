import { Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";
import Loader from "../components/common/Loader";


interface Props{
    children:React.ReactNode,
}

export default function PublicRoute({children}:Props){
   const {isAuthenticated,isCheckingAuth} = useAuthStore();

   if(isCheckingAuth){
       return <Loader/>
   }


   if(isAuthenticated){
      return (
         <Navigate to="/" replace/>
      )
   }

   return children;
}