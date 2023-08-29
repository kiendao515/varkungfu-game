import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Request,
    Delete,
    Param,
    Patch
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
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

}