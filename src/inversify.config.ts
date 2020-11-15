import TYPES from './types';
import {Container} from 'inversify';
// import { interfaces, TYPE } from 'inversify-express-utils';

import { UserRepo } from './repository/UserRepo';
import { IUserRepo } from './repository/IUserRepo';
import { IAdminService } from './infrastructure/IAdmin.service';
import { IUserService } from './infrastructure/IUser.service';
import { AdminService } from './infrastructure/Admin.service';
import { UserService } from './infrastructure/User.service';
import { Datasource } from './infrastructure/Datasource';
import { AuthService } from './infrastructure/Authservice';

const container = new Container();

container.bind<IUserRepo>(TYPES.IUserRepo ).to(UserRepo).inSingletonScope();
container.bind<IAdminService>(TYPES.IAdminService ).to(AdminService).inSingletonScope();
container.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
container.bind<Datasource>(TYPES.Datasource ).to(Datasource).inSingletonScope();
container.bind<AuthService>(TYPES.AuthService ).to(AuthService).inSingletonScope();

export default container;