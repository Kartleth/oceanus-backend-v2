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

  //--------------------------------------------------------------------------------
  //Metodo para agregar documentación a una persona
  //Es el primer metodo que cree de prueba --Lo borrare despues
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
  //Fin del metodo para agregar documentación a una persona
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  //Metodo para guardar documentación
  async saveDocumentacion(
    filePaths: Record<string, string>,
    personaId: number,
  ): Promise<Documentacion> {
    const persona = await this.personaRepository.findOne({
      where: { id: personaId },
      relations: ['documentacion'],
    });

    if (!persona) {
      throw new Error('Persona not found');
    }

    let documentacion = persona.documentacion;

    if (!documentacion) {
      documentacion = this.documentacionRepository.create({
        ...filePaths,
        empleado: persona,
      });
    } else {
      Object.assign(documentacion, filePaths);
    }

    return await this.documentacionRepository.save(documentacion);
  }
  //Fin del metodo para guardar documentación
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  //Metodo para obtener la documentación de la persona
  async getDocumentacion(personaId: number): Promise<Record<string, string>> {
    const persona = await this.personaRepository.findOne({
      where: { id: personaId },
      relations: ['documentacion'],
    });

    if (!persona?.documentacion) {
      throw new NotFoundException(
        'No se encontró la documentación para esta persona',
      );
    }

    // Retorna solo las rutas de los archivos de la persona
    const documentacion = persona.documentacion;
    const filePaths: Record<string, string> = {};

    for (const key in documentacion) {
      if (
        documentacion.hasOwnProperty(key) &&
        typeof documentacion[key] === 'string'
      ) {
        filePaths[key] = documentacion[key];
      }
    }

    return filePaths;
  }
  //Fin del metodo para obtener la documentación de la persona
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  //Metodo para crear la documentación de la persona
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
  //Fin del metodo para crear la documentación de la persona
  //----------------------------------------------------------------

  //--------------------------------------------------------------------------------
  //Metodo para actualizar la documentación de la persona
  async updateDocumentacion(
    personaId: number,
    updateDocumentacionDto: UpdateDocumentacionDto,
  ): Promise<Documentacion> {
    const persona = await this.personaRepository.findOne({
      where: { id: personaId },
      relations: ['documentacion'],
    });

    if (!persona?.documentacion) {
      throw new NotFoundException(
        'No se encontró la documentación para esta persona',
      );
    }

    const filePaths = updateDocumentacionDto.filePaths;

    for (const [key, newFilePath] of Object.entries(filePaths)) {
      if (newFilePath) {
        const oldFilePath = persona.documentacion[key];
        if (oldFilePath) {
          try {
            const filePath = path.join(
              __dirname,
              '..',
              '..',
              'uploads',
              oldFilePath,
            );
            await fs.promises.access(filePath, fs.constants.F_OK);
            await fs.promises.unlink(filePath); // Elimina el archivo si existe
          } catch (err) {
            console.error(
              `Error al intentar eliminar el archivo ${oldFilePath}:`,
              err,
            );
          }
        }
        persona.documentacion[key] = newFilePath;
      }
    }

    return await this.documentacionRepository.save(persona.documentacion);
  }
  //Fin del metodo para actualizar la documentación de la persona
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  // Método para actualizar un documento específico de la persona
  async updateSpecificDocument(
    personaId: number,
    fileKey: string,
    newFilePath: string,
  ): Promise<void> {
    const persona = await this.personaRepository.findOne({
      where: { id: personaId },
      relations: ['documentacion'],
    });

    if (!persona?.documentacion) {
      throw new NotFoundException(
        'No se encontró la documentación para esta persona',
      );
    }

    // Validación de fileKey si es necesario
    if (!(fileKey in persona.documentacion)) {
      throw new NotFoundException(
        `No se encontró la clave de documento: ${fileKey}`,
      );
    }

    const oldFilePath = persona.documentacion[fileKey];
    if (oldFilePath) {
      await this.deleteFileIfExists(oldFilePath);
    }

    persona.documentacion[fileKey] = newFilePath;
    await this.documentacionRepository.save(persona.documentacion);
  }

  private async deleteFileIfExists(filePath: string): Promise<void> {
    try {
      const fullPath = path.join(__dirname, '..', '..', 'uploads', filePath);
      await fs.promises.access(fullPath, fs.constants.F_OK);
      await fs.promises.unlink(fullPath);
    } catch (err) {
      console.error(`Error al intentar eliminar el archivo ${filePath}:`, err);
    }
  }
  // Fin del método para actualizar un documento específico de la persona
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  //Metodo para eliminar un documento de la persona
  async deleteDocument(personaId: number, fileKey: string): Promise<void> {
    const persona = await this.personaRepository.findOne({
      where: { id: personaId },
      relations: ['documentacion'],
    });

    if (!persona?.documentacion) {
      throw new NotFoundException(
        'No se encontró la documentación para esta persona',
      );
    }

    const filePath = persona.documentacion[fileKey];
    if (!filePath) {
      throw new NotFoundException(
        `No se encontró el archivo con la clave ${fileKey}`,
      );
    }

    const fullPath = path.join(__dirname, '..', '..', 'uploads', filePath);

    try {
      // Elimina el archivo del sistema de archivos
      await fs.promises.access(fullPath, fs.constants.F_OK); // Verifica si el archivo existe
      await fs.promises.unlink(fullPath); // Elimina el archivo
      console.log(`Archivo eliminado del sistema de archivos: ${fullPath}`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.warn(
          `Archivo ya no existe en el sistema de archivos: ${fullPath}`,
        );
      } else {
        throw new Error(`Error al eliminar archivo: ${err.message}`);
      }
    }

    try {
      console.log(
        'Documentación antes de eliminar el archivo:',
        persona.documentacion,
      );

      persona.documentacion[fileKey] = null;
      await this.documentacionRepository.save(persona.documentacion);

      console.log('Documentación después de guardar:', persona.documentacion);
    } catch (err) {
      console.error(`Error al actualizar la base de datos: ${err.message}`);
      throw new Error(
        'Error al eliminar la referencia del archivo en la base de datos',
      );
    }
  }

  //Fin del metodo para eliminar un documento de la persona
  //--------------------------------------------------------------------------------
}
