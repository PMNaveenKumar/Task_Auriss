import * as express from 'express';
import { interfaces, controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import TYPES from '../types';
import { IUserService } from '../infrastructure/IUser.service';
import { logger } from '../infrastructure/logger';

@controller("/user")
export class UserController implements interfaces.Controller {

  constructor(
    @inject(TYPES.IUserService) private userService: IUserService
    ) {
  }

  @httpPost("/login")
  public async userLogin (@request() req: express.Request, @response() res: express.Response) {
    try {
      const response = await this.userService.userLogin(req.body);
 
      logger.info(response);

      res.status(200).json(response);

    } catch(error) {

      logger.error(error);

      res.status(400).json(error);

    }
  }
}