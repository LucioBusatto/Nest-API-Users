import {Body, Controller, Get, Param, Post, UseInterceptors} from "@nestjs/common";
import { UserService } from "./user.service";
import { MessagePattern } from "@nestjs/microservices";
import {CreateUserDTO} from "./user.dto";

@Controller('users')
export class UserController {
    constructor(private userService:UserService) {}

    @MessagePattern({cmd:'AUTH_REGISTER'})
    createUserRegister(@Body() payload:CreateUserDTO){
        return this.userService.createUser(payload)
    }

    @MessagePattern({cmd: 'AUTH_LOGIN'})
    async getUserByEmail(payload) {
        return await this.userService.getUserByEmail(payload.email);
    }
}