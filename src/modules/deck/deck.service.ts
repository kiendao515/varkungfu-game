import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Deck, DeckDocument } from './entities/deck.entity';
import { SaveDeckDto } from './dto/save-deck.dto';
import { User, UserDocument } from '../user/entities/user.entity';
@Injectable()
export class DeckService {
    constructor(
        @InjectModel(Deck.name) private deck: Model<DeckDocument>,
        @InjectModel(User.name) private user: Model<UserDocument>,
        private jwtService: JwtService
    ) { }
    async saveDeck(createDeckDto: SaveDeckDto, token: any): Promise<Deck> {
        try {
            const payload = this.jwtService.verify(token);
            let user = await this.user.findOne({username: payload.username})
            if(user){
                if(1 <= createDeckDto.order && createDeckDto.order <=3){
                    const d = await this.deck.findOneAndUpdate({user: user._id,order:createDeckDto.order},{deckStr: createDeckDto.deckStr,
                    order: createDeckDto.order},{new:true})
                    return d;
                }else 
                throw new HttpException('order value can be from 1 to 3',HttpStatus.BAD_REQUEST)
            }else throw new HttpException('user is not found',HttpStatus.FORBIDDEN)
        } catch (error) {
            throw new HttpException({message: error.message},HttpStatus.BAD_REQUEST)
        }
    }

    async getDeckInfo(token:any): Promise<Deck[]> {
        try {
            const payload = this.jwtService.verify(token);
            let user = await this.user.findOne({username: payload.username})
            if(user){
                const decks = await this.deck.find({user:user._id}).exec();
                return decks
            }else throw new HttpException('user is not found',HttpStatus.FORBIDDEN)
        } catch (error) {
            throw new HttpException({message:error.message},HttpStatus.FORBIDDEN)
        }
    }
}