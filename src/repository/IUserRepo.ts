import { LoginData } from "../interfaces/logindata";
import { UserProfile } from "../interfaces/userprofile";

export interface IUserRepo {
    createUser(userInfo: UserProfile): Promise<any>;
    userLogin(loginData: LoginData): Promise<any>;
    updateUser (userId: number, credentials: {password: string, email: string}): Promise<any>;
}