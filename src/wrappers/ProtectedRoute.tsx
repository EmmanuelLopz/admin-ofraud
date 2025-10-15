'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/src/context/AuthContext';

type Props = {
    children: React.ReactNode;
};

export default function ProtectedRoute({children}: Props) {
    const {isAuthenticated, loadingTokens} = useAuth();
    const router = useRouter();

    useEffect(() => {
      if(!loadingTokens && !isAuthenticated){
        router.push("/login");
      }
    
    }, [isAuthenticated, loadingTokens, router])

    if(loadingTokens || !isAuthenticated){
        return <div>Loading...</div>
    }
    
    return <>{children}</>
}