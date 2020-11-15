import { LoginData } from "../interfaces/logindata";

export interface IUserService {
    userLogin(loginData: LoginData): any;
}