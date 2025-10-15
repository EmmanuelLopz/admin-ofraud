'use client';

import axios from 'axios';
import {
    createContext, 
    use, 
    useCallback, 
    useContext, 
    useEffect, 
    useMemo, 
    useState,
} from 'react';

type Tokens = {
    accessToken: string;
    refreshToken: string;
};

type AuthContextType = {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: ()=>void;
    setTokens: (tokens: Tokens) => void;
    tryRefreshToken: () => Promise<boolean>;
    loadingTokens?: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [loadingTokens, setLoadingTokens] = useState(true);

    useEffect(() => {
      setLoadingTokens(true);

      if(typeof window === "undefined") return;

      const storedAccesToken = localStorage.getItem("accessToken");
      const storedRefeshToken = localStorage.getItem("refreshToken");

      if(storedAccesToken && storedRefeshToken){
        setAccessToken(storedAccesToken);
        setRefreshToken(storedRefeshToken);
      }
      
      setLoadingTokens(false);

    }, [])

    const setTokens = useCallback((tokens: Tokens) => {
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);

        if (typeof window == "undefined") return;
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
    }, []);

    const clearTokens = useCallback(() =>{
        setAccessToken(null);
        setRefreshToken(null);
        if(typeof window === "undefined") return;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }, []);

    const logout = useCallback(() => {
        clearTokens();
    }, [clearTokens]);

    const login = useCallback( async (email: string, password: string) => {
        const response = await axios.post("http://localhost:3001/auth/login", {
            email, 
            password,
        });

        if(response.status == 201) {
            const tokens: Tokens = {
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
            };
            setTokens(tokens);

        } else {
            throw new Error("Login Failed");
        }

    }, [setTokens]);

    const tryRefreshToken = useCallback( async (): Promise<boolean> => {
        if(!refreshToken) return false;

        try {
            const response = await axios.post("http://localhost:3001/auth/refresh", {
                refreshToken,
            });

            if(response.status === 201){
                const tokens: Tokens = {
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                };
                setTokens(tokens);
                return true;

            } else {
                clearTokens();
                return false;
            }

        } catch(error) {
            console.log("Error refrescando el token" + error);
            clearTokens();
            return false;
        }
    }, [refreshToken, setTokens, clearTokens]);

    const values = useMemo<AuthContextType>( 
        () => ({
            accessToken, 
            refreshToken, 
            isAuthenticated: accessToken != null, 
            login: login, 
            logout, 
            setTokens, 
            tryRefreshToken, 
            loadingTokens, 
        }),
        [
            accessToken, 
            refreshToken, 
            login, 
            logout, 
            setTokens, 
            tryRefreshToken, 
            loadingTokens,
        ]
    );

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}