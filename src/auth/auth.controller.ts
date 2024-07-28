import { Body, Controller, Get, Post, UnauthorizedException} from '@nestjs/common';
import { Req, Res } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    public async signIn(@Body() loginCredentials: any, @Res({passthrough: true}) response: Response) {
        const { jwt, user } = await this.authService.login(loginCredentials.username, Number(loginCredentials.password));
        response.cookie('auth-cookie', jwt, { httpOnly: true });
        return { username: user?.name, rollno: user?.rollno };
    }

    @Post('logout')
    public logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('auth-cookie');
        return {
            message: 'success'
        }
    }

    @Get('verify-token')
  public async verifyToken(@Req() request: Request) {
    const token = request.cookies['auth-cookie'];
    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    const userData = await this.authService.verifyToken(token);
    return { userRoleId: userData.userRoleId };
  }
}
