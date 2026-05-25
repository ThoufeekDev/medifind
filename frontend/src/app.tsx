import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./features/auth/store/auth.store";
import { useEffect } from "react";
export default function App(){
    const fetchProfile = useAuthStore((state)=>state.fetchProfile);
    useEffect(()=>{
        fetchProfile();
    },[]);

    return (
        <AppRoutes/>
    )
}