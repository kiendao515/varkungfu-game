import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Deck, DeckSchema } from './entities/deck.entity';
import { User, UserSchema } from '../user/entities/user.entity';
import { DeckController } from './deck.controller';
import { DeckService } from './deck.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UserService } from '../user/user.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: "kiendao2001",
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [DeckController],
  providers: [DeckService,JwtStrategy]
})
export class DeckModule {}