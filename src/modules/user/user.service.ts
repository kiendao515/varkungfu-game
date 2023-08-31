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
import { Deck, DeckDocument } from '../deck/entities/deck.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private user: Model<UserDocument>,
    @InjectModel(Deck.name) private deck: Model<DeckDocument>,
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
      let user = await new this.user(s).save();
      this.initDeck(user._id)
      return user;
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST)
    }
  }
  async initDeck(userId: any): Promise<any> {
    for (var i = 1; i <= 3; i++) {
      let d = new Deck();
      d.order = i;
      d.deckStr = null;
      d.user = userId;
      await new this.deck(d).save()
    }
  }
  async getAllUsers(): Promise<any> {
    return this.user.find({});
  }
  async getUserInfo(token: any): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      if (payload.role == 2) {
        let user = await this.user.findOne({ username: payload.username })
        if (user) {
          return user;
        }else{
          throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
        }
      }
    } catch (error) {
       throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST);
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
          throw new HttpException('password is incorrect', HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException('username not found', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      throw new HttpException({message: err.message},HttpStatus.BAD_REQUEST)
    }
  }
}