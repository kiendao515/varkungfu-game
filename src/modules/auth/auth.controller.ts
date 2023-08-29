import { Controller, Post, UseGuards, Get, HttpCode, HttpStatus, Body, Request, HttpException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from '../user/dto/login.dto';
import { AuthService } from './auth.service';
import { LoginRequestDTO } from './dto/request/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('admin/login')
    @HttpCode(HttpStatus.OK)
    async adminLogin(@Body() LoginRequestDTO: LoginRequestDTO) {
      let rs= await this.authService.checkAdminLogin(LoginRequestDTO);
      return rs;
    }
  
    @Post('user/login')
    @HttpCode(HttpStatus.OK)
    async teacherLogin(@Body() LoginDto:UserLoginDto) {
        return this.authService.checkUserLogin(LoginDto);
    }
}