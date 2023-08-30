import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Number } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './entities/user.entity';
import { UserLoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { RoleEnum } from '../roles/roles.enum';
import { SaveDeckDto } from './dto/save-deck.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private user: Model<UserDocument>,
    private jwtService: JwtService
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const s = new User();
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      s.username = createUserDto.username;
      s.password = hashPassword;
      s.currentLevel = 0;
      s.expProgress = 0;
      s.deckStr = null;
      return new this.user(s).save();
    } catch (error) {
      throw new Error(`Error create student ${error}`);
    }
  }
  async getAllUsers(): Promise<any> {
    return this.user.find({});
  }
  async getUserInfo(token: any): Promise<any> {
    const payload = this.jwtService.verify(token);
    if (payload.role == 3) {
      let user = await this.user.findOne({ username: payload.username })
      if (user) {
        return user;
      } else return null;
    }
  }

  async checkUserLogin(@Body() loginDto: UserLoginDto): Promise<User> {
    try {
      const user = await this.user.findOne({ username: loginDto.username });
      if (user) {
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (isMatch) {
          return user;
        } else {
          throw new Error(`Password is incorrect`);
        }
      } else {
        throw new Error(`Username not found`);
      }
    } catch (err) {
      throw new Error(`${err.message}`);
    }
  }
  async saveDeck(token: any, saveDeck: SaveDeckDto): Promise<any> {
    const payload = this.jwtService.verify(token);
    try {
      let user = await this.user.findOneAndUpdate({ username: payload.username },{deckStr: JSON.stringify(saveDeck)},{new: true})
      if(user){
        return user
      }else throw new HttpException({ message: "no username found with this token" }, HttpStatus.FORBIDDEN);
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.FORBIDDEN);
    }
  }
}