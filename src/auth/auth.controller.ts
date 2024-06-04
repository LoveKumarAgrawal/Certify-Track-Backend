import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    public signIn(@Body() loginCredentials: any) {
        return this.authService.login(loginCredentials.username, Number(loginCredentials.password));
    }
}
