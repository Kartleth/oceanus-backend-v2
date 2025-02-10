import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);

    const newUser = this.usuarioRepository.create({
      ...createUsuarioDto,
      password: hashedPassword,
    });

    return this.usuarioRepository.save(newUser);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const user = await this.usuarioRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  async findOneByUsername(usuario: string): Promise<Usuario> {
    const user = await this.usuarioRepository.findOne({ where: { usuario } });
    if (!user) {
      throw new Error(`Usuario con nombre de usuario ${usuario} no encontrado`);
    }
    return user;
  }

  async update(
    id: number,
    updateUsuarioDto: Partial<Usuario>,
  ): Promise<Usuario> {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error(`Usuario con id ${id} no encontrado`);
    }

    if (updateUsuarioDto.password) {
      const salt = bcrypt.genSaltSync();
      updateUsuarioDto.password = bcrypt.hashSync(
        updateUsuarioDto.password,
        salt,
      );
    }

    await this.usuarioRepository.update(id, updateUsuarioDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error(`Usuario con id ${id} no encontrado`);
    }

    await this.usuarioRepository.delete(id);
  }

  //sync validarUsuario(
  // usuario: string,
  // password: string,
  //: Promise<Usuario | null> {
  // const user = await this.usuarioRepository.findOne({ where: { usuario } });

  // if (!user) {
  //   return null; // Usuario no encontrado
  // }

  // const isPasswordValid = await bcrypt.compare(password, user.password); // Asegúrate de que el salt sea el mismo aquí

  // if (!isPasswordValid) {
  //   return null; // Contraseña incorrecta
  // }

  // return user; // Usuario y contraseña válidos
  //

  async validateUser(
    usuario: string,
    password: string,
  ): Promise<Usuario | null> {
    const foundUser = await this.usuarioRepository.findOne({
      where: { usuario },
    });

    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
      return foundUser;
    }

    return null;
  }

  async updatePassword(usuario: string, newPassword: string) {
    const user = await this.usuarioRepository.findOne({
      where: { usuario },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await this.usuarioRepository.save(user);
    return user;
  }
}
