import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';

import { UserService } from '@modules/user/user.service';
import { hashPasswordHelper, verifyPasswordHelper } from 'src/ultils/helper';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  isEmailExist = async (email: string) => {
    const user = await this.userService.findByEmail(email);

    return !!user;
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

  async validateUser(authLogin: LoginAuthDto) {
    const user = await this.userService.findByEmail(authLogin.email);
    if (!user) return null;
    const comparePassword = await verifyPasswordHelper(
      user.password,
      authLogin.password,
    );
    if (!comparePassword) return null;

    const { password, ...result } = user;
    return result;
  }

  async login(user: any): Promise<{ token: string }> {
    const payload = { sub: user.id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
