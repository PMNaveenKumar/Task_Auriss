import { injectable, inject } from 'inversify';
import { IUserRepo } from '../repository/IUserRepo';
import { IUserService } from './IUser.service';
import TYPES from '../types';
import { LoginData } from '../interfaces/logindata';
import { IAdminService } from './IAdmin.service';
import { JWTData } from '../interfaces/jwtdata';
import { logger } from './logger';

@injectable()
export class UserService implements IUserService {

    constructor(
        @inject(TYPES.IUserRepo) private userRepo: IUserRepo,
        @inject(TYPES.IAdminService) private adminService: IAdminService
    ){
    }

   async userLogin(loginData: LoginData) {
       try {
            const rows: any = await this.userRepo.userLogin(loginData);

            if(rows.length) {
                const userData: any = rows[0];

                if(userData && userData.email && userData.type) {

                    let jwtdata: JWTData = {
                        userId: userData.id,
                        email: userData.email, 
                        role: userData.type
                    };
                    
                    let token: string = await this.adminService.generateJWT(jwtdata);

                    logger.info('Login success');
                    
                    return token;
                }
            }
            else {

                logger.error('Invalid username and password.');

                return {error: 'Invalid username and password.'}
            }
       }
       catch(error) {
            return error 
       }
   }
}