import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { Deck, DeckSchema } from '../deck/entities/deck.entity';
import { User, UserSchema } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
;

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: "kiendao2001",
            signOptions: { expiresIn: '10h' },
        }),
        MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
    ],

    controllers:[UserController],
    providers:[UserService,JwtStrategy]
})
export class UserModule {}