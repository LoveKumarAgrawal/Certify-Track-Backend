import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StudentModule } from 'src/student/student.module';
import { JwtModule } from '@nestjs/jwt/dist'; 

@Module({
  imports: [StudentModule, JwtModule.register({
    secret: `${process.env.JWT_SECRET}`,
    signOptions: {expiresIn: `${process.env.JWT_EXPIRATION_TIME}`}
  })],
  controllers: [AuthController], 
  providers: [AuthService]
})
export class AuthModule {}
