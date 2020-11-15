import { injectable, inject } from "inversify";
import { UserProfile } from "../interfaces/userprofile";
import { IUserRepo } from "./IUserRepo";
import { Datasource } from "../infrastructure/Datasource"
import TYPES from "../types";
import { LoginData } from "../interfaces/logindata";
import { logger } from '../infrastructure/logger';

@injectable()
export class UserRepo implements IUserRepo {
    
    constructor(
        @inject(TYPES.Datasource) private datasource: Datasource
    ){
    }

    async createUser (userInfo: UserProfile): Promise<any> {
        await this.datasource.connect();
        
        const result = await this.datasource.executeQuery(`INSERT INTO users(userName, password, email, address1, address2, pincode, type) VALUES (?)`, 
        [
            [userInfo.userName, 
            userInfo.password,
            userInfo.email,
            userInfo.address.address1,
            userInfo.address.address2,
            userInfo.address.pincode,
            userInfo.type]
        ]);
        
        logger.info("create user repository response: ", result);

        return result;
    }

    async userLogin (loginData: LoginData) {
        await this.datasource.connect();
        
        const result = await this.datasource.executeQuery(`SELECT *FROM USERS WHERE email = ? AND password = ?`, 
        [
            loginData.email,
            loginData.password
        ]);

        logger.info("userLogin repository response: ", result);

        return result;
    }

    async updateUser (userId: number, credentials: {password: string, email: string}): Promise<any> {
        await this.datasource.connect();
        
        const result = await this.datasource.executeQuery(`UPDATE USERS SET password = ?, email = ? WHERE id = ?`, 
        [
            credentials.password,
            credentials.email,
            userId
        ]);
        
        logger.info("updateUser repository response: ", result);

        return result;
    }
}