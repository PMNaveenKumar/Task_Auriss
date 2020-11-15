import { JWTData } from "../interfaces/jwtdata";
import { UserProfile } from "../interfaces/userprofile";

export interface IAdminService {
    registerUser(userInfo: UserProfile): any;
    generateJWT(jwtData: JWTData): Promise<string>;
    updateUser(userId: number, credentials: {password: string, email: string}): Promise<string>
}