import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private studentService: StudentService, private jwtService: JwtService) {}

    public async login(username: string, password: number): Promise<any> {
        const user = await this.studentService.findOneForLogin(username);
        if(user?.phoneNumber !== password) {
            throw new UnauthorizedException();
        }
        let jwt: string = await this.jwtService.signAsync({ userRoleId: user?.roleId, userRollNo: user?.rollno, userName: user?.name });
        return { jwt, user };
    }

    public async verifyToken(token: string) {
        try {
          const user = this.jwtService.verify(token);
          return user;
        } catch (error) {
          throw new UnauthorizedException('Invalid token');
        }
    }
}

