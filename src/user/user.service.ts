import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import {Model} from "mongoose";
import {User} from "./user.entity";
import {InjectModel} from "@nestjs/mongoose";
import {CreateUserDTO} from "./user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ){}

    async createUser(userDTO: CreateUserDTO) {
        try {
            const user = await this.userModel.create(userDTO);
            return user;
        }
        catch (e) {
            if(e.code === 11000){
                throw new BadRequestException(`User with email ${userDTO.email} already exists`);
            }
            console.log(e)
            throw new InternalServerErrorException();
        }

    }

    async getUserByEmail(email:string) {
        const user = await this.userModel.findOne({email:email});
        if(!user) throw new NotFoundException(`User with email ${email} not found`);
        return user;
    }
}