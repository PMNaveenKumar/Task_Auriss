import { injectable, inject } from 'inversify';
import { IUserRepo } from '../repository/IUserRepo';
import { IAdminService } from './IAdmin.service';
import TYPES from '../types';
import { UserProfile } from '../interfaces/userprofile';
import * as jwt from 'jsonwebtoken';
import { JWTData } from '../interfaces/jwtdata';
import { error } from 'console';
import { logger } from '../infrastructure/logger';

@injectable()
export class AdminService implements IAdminService {

    private sKey: string;
    constructor(
        @inject(TYPES.IUserRepo) private adminRepo: IUserRepo
    ){
        this.sKey = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'zWl2q9mLLTwzL_Fu-7xDy4vQ_Ivujia5KQMsInepVXhaNYIgaaPy_90BWbxzuJ5zkLT2UX1mXB1YMpMrUuWLiw';
    }

    async registerUser(userInfo: UserProfile) {
        userInfo.type = 'admin';
        const result: any = this.adminRepo.createUser(userInfo);
        let logMessage;

        if(result.affectedRows) {
            logMessage = "User successfully registered with Id : " + result.insertId;
            
            logger.info(logMessage);

            return logMessage;
        }
        else {
            logMessage = "User registeration failed";

            throw error(logMessage);
        }
    }

    async generateJWT(jwtData: JWTData): Promise<string> {
        const accessToken = await jwt.sign({userName: jwtData.email, userid: jwtData.userId, role: jwtData.role}, this.sKey);

        logger.info(accessToken);

        return accessToken;
    }

    async updateUser(userId: number, credentials: {password: string, email: string}): Promise<string> {
        const result: any = await this.adminRepo.updateUser(userId, credentials);
        let logMessage;
        
        if(result.affectedRows) {
            logMessage = "User updated";
            
            logger.info(logMessage);

            return logMessage;
        }
        else {
            logMessage = "User update failed";

            throw error(logMessage);
        }
    }
}