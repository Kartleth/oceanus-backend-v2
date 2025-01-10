import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentacionDto } from './dto/create-documentacion.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Documentacion } from './entities/documentacion.entity';
import { Persona } from 'src/personas/entities/persona.entity';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateDocumentacionDto } from './dto/update-documentacion.dto';

@Injectable()
export class DocumentacionService {
  constructor(
    @InjectRepository(Documentacion)
    private readonly documentacionRepository: Repository<Documentacion>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  //Primer metodo que cree de prueba --Lo borrare despues
  async addDocumentoPersona(
    personaId: number,
    createDocumentacionDto: CreateDocumentacionDto,
  ): Promise<Documentacion> {
    const persona = await this.personaRepository.findOne({
      where: { id: personaId },
      relations: ['documentacion'],
    });

    if (!persona) {
      throw new Error('Persona not found');
    }

    const documentacion = this.documentacionRepository.create(
      createDocumentacionDto,
    );
    documentacion.empleado = persona;

    return await this.documentacionRepository.save(documentacion);
  }

  // Nuevo método para guardar los archivos subidos
  async saveDocumentacion(
    filePaths: Record<string, string>,
    personaId: number,
  ): Promise<Documentacion> {
    const persona = await this.personaRepository.findOne({
      where: { id: personaId },
    });

    if (!persona) {
      throw new Error('Persona not found');
    }

    // Crea un objeto de Documentacion y asigna las rutas de los archivos
    const documentacion = this.documentacionRepository.create({
      ...filePaths, // Añade las rutas de los archivos
      empleado: persona, // Relaciona el documento con la persona
    });

    return await this.documentacionRepository.save(documentacion);
  }

  async create(createDocumentacionDto: CreateDocumentacionDto) {
    const newDocumentacion = this.documentacionRepository.create(
      createDocumentacionDto,
    );
    return this.documentacionRepository.save(newDocumentacion);
  }

  findAll() {
    return `This action returns all documentacion`;
  }

  async findOne(personaId: number): Promise<Documentacion> {
    return await this.documentacionRepository.findOne({
      where: { empleado: { id: personaId } },
      relations: ['empleado'],
    });
  }

  async updateDocumentacion(
    personaId: number,
    updateDocumentacionDto: UpdateDocumentacionDto,
  ): Promise<Documentacion> {
    const persona = await this.personaRepository.findOne({
      where: { id: personaId },
      relations: ['documentacion'],
    });

    if (!persona || !persona.documentacion) {
      throw new NotFoundException('Documentación no encontrada');
    }

    const filePaths = updateDocumentacionDto.filePaths;

    for (const [key, newFilePath] of Object.entries(filePaths)) {
      if (newFilePath) {
        const oldFilePath = persona.documentacion[key];
        if (oldFilePath) {
          const oldFile = path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            oldFilePath,
          );
          try {
            await fs.promises.access(oldFile);
            await fs.promises.unlink(oldFile);
          } catch (err) {
            console.error(`Error al eliminar el archivo ${oldFile}:`, err);
          }
        }
        persona.documentacion[key] = newFilePath;
      }
    }

    return await this.documentacionRepository.save(persona.documentacion);
  }

  remove(id: number) {
    return `This action removes a #${id} documentacion`;
  }
}
