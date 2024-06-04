import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class AuthService {
    constructor(private studentService: StudentService) {}

    public async login(username: string, password: number): Promise<any> {
        const user = await this.studentService.findOneForLogin(username);
        if(user?.phoneNumber !== password) {
            throw new UnauthorizedException();
        }
        if(user.RoleId==='665b569458c70fe9f7be72d3') {
            return { userRoleId : user?.roleId, userName: user?.name }
        }
        return {userRoleId :user?.roleId, userRollNo: user?.rollno, userName: user?.name};
    }

}

