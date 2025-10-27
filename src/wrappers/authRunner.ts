import { AxiosError } from "axios";

export class AuthRunner {
    constructor(
        private getAccessToken: () => string | null,
        private tryRefreshToken: () => Promise<string | null>,
        private logout: () => void
    ){}

    async runWithAuth<T>(fn: (token: string) => Promise<T>): Promise<T | null> {
        let token = this.getAccessToken();
        
        if(!token) return null;

        try {
            return await fn(token);

        } catch (error) {
            const status = (error as AxiosError).response?.status;

            if(status === 401 || status === 403) {
                const newToken = await this.tryRefreshToken();

                if(newToken) {
                    return await fn(newToken);
                } else {
                    this.logout();
                    return null;
                } 
            }

            console.error("Error ejecutando la funcion", error);
            this.logout();
            return null;
        }
    }
}