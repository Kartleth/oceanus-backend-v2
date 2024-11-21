import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }

  //@Post('login')
  //async login(@Body() loginDto: { usuario: string; password: string }) {
  //  const user = await this.usuariosService.validarUsuario(
  //    loginDto.usuario,
  //    loginDto.password,
  //  );
  //
  //  if (!user) {
  //    throw new UnauthorizedException('Usuario o contraseña incorrectos');
  //  }
  //
  //  // Crear un token JWT
  //  const payload = { id: user.id, usuario: user.usuario };
  //  const token = this.jwtService.sign(payload);
  //
  //  return { message: 'Login exitoso', token };
  //}

  @Post('login')
  async login(@Body() loginDto: { usuario: string; password: string }) {
    const { usuario, password } = loginDto;

    // Aquí puedes agregar lógica de validación de usuario y contraseña
    const usuarioValido = await this.usuariosService.validateUser(usuario, password);

    if (!usuarioValido) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Si el usuario es válido, devolver un JWT o algún dato
    return { message: 'Login exitoso', usuario: usuarioValido };
  }
}
