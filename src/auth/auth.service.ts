import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(usuario: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(usuario);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const validatedUser = await this.validateUser(user.usuario, user.password);
    if (!validatedUser) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    const payload = { usuario: validatedUser.usuario, sub: validatedUser.id };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: validatedUser.id,
        usuario: validatedUser.usuario,
        type: validatedUser.type,
      },
    };
  }
}
