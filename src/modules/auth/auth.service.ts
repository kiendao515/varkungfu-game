import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleEnum } from '../roles/roles.enum';
import { UserLoginDto } from '../user/dto/login.dto';
import { UserService } from '../user/user.service';
import { LoginRequestDTO } from './dto/request/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) { }
    async checkUserLogin(@Body() loginDto: UserLoginDto): Promise<any> {
        try {
            let user = await this.userService.checkUserLogin(loginDto);
            if (user) {
                const payload = { username: user.username, role: RoleEnum.user }
                return {
                    user: user,
                    access_token: this.jwtService.sign(payload)
                }
            } else {
                throw new HttpException({ message: 'Can not login' }, HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            throw new HttpException({ message: error.message }, HttpStatus.UNAUTHORIZED);
        }

    }
    async checkAdminLogin(@Body() LoginRequestDTO: LoginRequestDTO): Promise<any> {
        if (LoginRequestDTO.username == "admin" && LoginRequestDTO.password == "admin") {
            const payload = {username: LoginRequestDTO.username, role: RoleEnum.admin };
            return {
                access_token: this.jwtService.sign(payload)
            }
        } else {
            throw new HttpException({ message: 'Can not login' }, HttpStatus.UNAUTHORIZED);
        }
    }
}
