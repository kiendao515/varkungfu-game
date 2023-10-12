import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Request,
    Delete,
    Param,
    Patch,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { SaveDeckDto } from './dto/save-deck.dto';
import { SaveStatsDto } from './dto/save-stats.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiBearerAuth()
    @Roles(RoleEnum.admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('/create')
    create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }


    @ApiBearerAuth()
    @Roles(RoleEnum.admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/all')
    findAll() {
        return this.userService.getAllUsers();
    }

    @ApiBearerAuth()
    @Roles(RoleEnum.user)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('save-stats')
    saveStats(@Request() req,@Body() saveStat: SaveStatsDto){
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            throw new HttpException({ message: 'Access Forbidden' }, HttpStatus.FORBIDDEN);
        }else return this.userService.saveStats(token, saveStat);
    }

    @ApiBearerAuth()
    @Roles(RoleEnum.user)
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Post('delete-stats')
    deleteStats(@Request() req){
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            throw new HttpException({ message: 'Access Forbidden' }, HttpStatus.FORBIDDEN);
        }else return this.userService.deteleStats(token);
    }

}