import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from '@modules/user/user.service';
import { hashPasswordHelper, verifyPasswordHelper } from 'src/ultils/helper';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  isEmailExist = async (email: string) => {
    const user = await this.userService.findByEmail(email);
    if (user) return true;
    return false;
  };

  async register(registerAuthDto: RegisterAuthDto) {
    const { email, username, password } = registerAuthDto;
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(`Email is registed. Please login instead!`);
    }
    const hashPassword = await hashPasswordHelper(password);
    const user = await this.userService.create({
      email,
      username,
      password: hashPassword,
    });

    return {
      id: user.id,
    };
  }

  async login(loginAuthDto: LoginAuthDto): Promise<{ token: string }> {
    const { email, password } = loginAuthDto;
    const user = await this.userService.findByEmail(email);

    const isExist = await this.isEmailExist(email);
    if (!isExist) throw new BadRequestException(`Email is not registed.!`);

    const comparePassword = await verifyPasswordHelper(user.password, password);
    if (!comparePassword)
      throw new BadRequestException(`Wrong password please try again!`);

    const payload = { sub: user.id, username: user.username };
    const access_token = await this.jwtService.signAsync(payload);
    return { token: access_token };
  }
}
