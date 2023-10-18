import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { JwtSecretRequestType } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { DeckService } from './deck.service';
import { DeleteDeckDto } from './dto/delete-deck.dto';
import { SaveDeckDto } from './dto/save-deck.dto';
@ApiTags('Deck')
@Controller('deck')
export class DeckController {
  constructor(private readonly deckService: DeckService) { }

  @ApiBearerAuth()
  @Roles(RoleEnum.user)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('save-deck')
  create(@Body() saveDeckDto: SaveDeckDto,@Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
      throw new HttpException({ message: 'Access Forbidden' }, HttpStatus.FORBIDDEN);
    }else{
      return this.deckService.saveDeck(saveDeckDto,token);
    }
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.user)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('get-deck')
  findAll(@Request() req) {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        throw new HttpException({ message: 'Access Forbidden' }, HttpStatus.FORBIDDEN);
    }else return this.deckService.getDeckInfo(token);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.user)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('delete-deck')
  deleteDeck(@Request() req,@Body() deleteDto: DeleteDeckDto){
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        throw new HttpException({ message: 'Access Forbidden' }, HttpStatus.FORBIDDEN);
    }else return this.deckService.deleteDeck(token, deleteDto);
  }
}