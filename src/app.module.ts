import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { DeckModule } from './modules/deck/deck.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://kiendao:kiendao2001@cluster0.bnqgz.mongodb.net/kungfu-game?retryWrites=true&w=majority'),
    UserModule,
    AuthModule,
    DeckModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}