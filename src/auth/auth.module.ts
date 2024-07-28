import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StudentModule } from 'src/student/student.module';
import { JwtModule } from '@nestjs/jwt/dist'; 

@Module({
  imports: [StudentModule, JwtModule.register({
    secret: "loveagrawal",
    signOptions: {expiresIn: '1d'}
  })],
  controllers: [AuthController], 
  providers: [AuthService]
})
export class AuthModule {}
