import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity'; // Ruta a tu entidad
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) // Inyección del repositorio de TypeORM
    private usuarioRepository: Repository<Usuario>,
  ) {}

  // Método para crear un usuario
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    //const salt = bcrypt.genSaltSync(); // Generar el salt
    //createUsuarioDto.password = bcrypt.hashSync(
    //  createUsuarioDto.password,
    //  salt,
    //); // Encriptar la contraseña

    const usuario = this.usuarioRepository.create(createUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  findAll() {
    return this.usuarioRepository.find(); // Obtener todos los usuarios
  }

  async findOne(id: number): Promise<Usuario> {
    const user = await this.usuarioRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`Usuario con id ${id} no encontrado`);
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
      ); // Encriptar si se actualiza la contraseña
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
    // Buscar al usuario en la base de datos
    const foundUser = await this.usuarioRepository.findOne({
      where: { usuario },
    });

    // Verificar que la contraseña sea correcta (aquí puedes usar bcrypt para comparar contraseñas)
    if (foundUser && foundUser.password === password) {
      return foundUser;
    }

    return null;
  }
}
