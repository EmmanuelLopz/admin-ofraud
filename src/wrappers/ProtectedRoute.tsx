'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/src/context/AuthContext';

type Props = {
    children: React.ReactNode;
};

export default function ProtectedRoute({children}: Props) {
    const {isAuthenticated, loadingTokens, accessToken, refreshToken, user } = useAuth();
    const router = useRouter();

    console.log("ProtectedRoute - isAuthenticated:", isAuthenticated, "loadingTokens:", loadingTokens);

    useEffect(() => {
      if(!loadingTokens && !isAuthenticated){
        router.push("/login");
      }
    
    }, [isAuthenticated, loadingTokens, router, accessToken, refreshToken, user]);

    if(loadingTokens || !isAuthenticated){
        return <div>Loading...</div>
    }
    
    return <>{children}</>
}