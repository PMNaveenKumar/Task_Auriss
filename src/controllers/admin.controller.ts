import * as express from 'express';
import { controller, httpPost, response, BaseHttpController, requestBody, requestParam, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import TYPES from '../types';
import { IAdminService } from '../infrastructure/IAdmin.service';
import { UserProfile } from '../interfaces/userprofile';
import { Validator } from '../validator/Validator';
import { logger } from '../infrastructure/logger'

@controller("/admin")
export class AdminController extends BaseHttpController {

  @inject(TYPES.IAdminService) private adminService: IAdminService

  @httpPost("/", TYPES.AuthService)
  public async registerUser (@requestBody() req: UserProfile, @response() res: express.Response) {
    try {
      const username = Validator.IsValidUserName(req.userName);
      if(!username.valid) {
        logger.error(username.errorMessage);
        res.status(400).json(username.errorMessage);
        return;
      }

      const password = Validator.IsValidPassword(req.password);
      if(!password.valid) {
        logger.error(password.errorMessage);
        res.status(400).json(password.errorMessage);
        return;
      }

      const email = Validator.IsValidEmail(req.email);
      if (!email.valid) {
        logger.error(email.errorMessage);
        res.status(400).json(email.errorMessage);
        return;
      }

      const address = Validator.IsValidAddress({
        address1: req.address.address1, 
        address2: req.address.address2, 
        pincode: req.address.pincode
      });
      if (!address.valid) {
        logger.error(address.errorMessage);
        res.status(400).json(address.errorMessage);
        return;
      }
      
      const response = await this.adminService.registerUser(req);

      res.status(200).json(response);
    } catch(error) {

      logger.error(error);

      res.status(400).json(error);
    }
  }

  @httpPut('/user/:id', TYPES.AuthService)
  public async updateUser(@requestParam('id') userId: number, @requestBody() body: any, @response() res: express.Response) {
    try {
      const validId = Validator.isValidUserId(userId);
      if(!validId.valid) {
        logger.error(validId.errorMessage);
        res.status(400).json(validId.errorMessage);
      }

      const password = Validator.IsValidPassword(body.password);
      if(!password.valid) {
        logger.error(password.errorMessage);
        res.status(400).json(password.errorMessage);
        return;
      }

      const email = Validator.IsValidEmail(body.email);
      if (!email.valid) {
        logger.error(email.errorMessage);
        res.status(400).json(email.errorMessage);
        return;
      }

      const response = await this.adminService.updateUser(userId, {password: body.password, email: body.email});

      res.status(200).json(response);
    }
    catch(error) {
      logger.error(error);

      res.status(400).json(error);
    }
  }
}