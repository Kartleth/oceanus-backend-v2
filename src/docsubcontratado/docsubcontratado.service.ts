import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDocsubcontratadoDto } from './dto/update-docsubcontratado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Docsubcontratado } from './entities/docsubcontratado.entity';
import { Repository } from 'typeorm';
import { Subcontratado } from 'src/subcontratados/entities/subcontratado.entity';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class DocsubcontratadoService {
  constructor(
    @InjectRepository(Docsubcontratado)
    private readonly docsubcontratadoRepository: Repository<Docsubcontratado>,
    @InjectRepository(Subcontratado)
    private readonly subcontratadoRepository: Repository<Subcontratado>,
  ) {}

  async findOne(subcontratadoId: number): Promise<Docsubcontratado> {
    return await this.docsubcontratadoRepository.findOne({
      where: { subcontratado: { idsubcontratado: subcontratadoId } },
      relations: ['subcontratado'],
    });
  }

  //--------------------------------------------------------------------------------
  //Metodo para actualizar la documentación de la persona
  async updateDocumentacion(
    subcontratadoId: number,
    updateDocsubcontratadoDto: UpdateDocsubcontratadoDto,
  ): Promise<Docsubcontratado> {
    const subcontratado = await this.subcontratadoRepository.findOne({
      where: { idsubcontratado: subcontratadoId },
      relations: ['docsubcontratado'],
    });

    if (!subcontratado?.docsubcontratado) {
      throw new NotFoundException(
        'No se encontró la documentación para este subcontratado',
      );
    }

    const filePaths = updateDocsubcontratadoDto.filePaths;

    for (const [key, newFilePath] of Object.entries(filePaths)) {
      if (newFilePath) {
        const oldFilePath = subcontratado.docsubcontratado[key];
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
        subcontratado.docsubcontratado[key] = newFilePath;
      }
    }

    return await this.docsubcontratadoRepository.save(
      subcontratado.docsubcontratado,
    );
  }
  //Fin del metodo para actualizar la documentación de la persona
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  // Método para actualizar un documento específico de la persona
  async updateSpecificDocument(
    subcontratadoId: number,
    fileKey: string,
    newFilePath: string,
  ): Promise<void> {
    const subcontratado = await this.subcontratadoRepository.findOne({
      where: { idsubcontratado: subcontratadoId },
      relations: ['docsubcontratado'],
    });

    if (!subcontratado?.docsubcontratado) {
      throw new NotFoundException(
        'No se encontró la documentación para este subcontratado',
      );
    }

    if (!(fileKey in subcontratado.docsubcontratado)) {
      throw new NotFoundException(
        `No se encontró la clave de documento: ${fileKey}`,
      );
    }

    const oldFilePath = subcontratado.docsubcontratado[fileKey];
    if (oldFilePath) {
      await this.deleteFileIfExists(oldFilePath);
    }

    subcontratado.docsubcontratado[fileKey] = newFilePath;
    await this.docsubcontratadoRepository.save(subcontratado.docsubcontratado);
  }

  private async deleteFileIfExists(filePath: string): Promise<void> {
    try {
      const fullPath = path.join(
        __dirname,
        '..',
        '..',
        'uploadsSubcontratados',
        filePath,
      );
      await fs.promises.access(fullPath, fs.constants.F_OK);
      await fs.promises.unlink(fullPath);
    } catch (err) {
      console.error(`Error al intentar eliminar el archivo ${filePath}:`, err);
    }
  }

  //--------------------------------------------------------------------------------
  //Metodo para eliminar un documento de la persona
  async deleteDocument(
    subcontratadoId: number,
    fileKey: string,
  ): Promise<void> {
    const subcontratado = await this.subcontratadoRepository.findOne({
      where: { idsubcontratado: subcontratadoId },
      relations: ['docsubcontratado'],
    });

    if (!subcontratado?.docsubcontratado) {
      throw new NotFoundException(
        'No se encontró la documentación para este subcontratado',
      );
    }

    const filePath = subcontratado.docsubcontratado[fileKey];
    console.log('filePath:', filePath);
    if (!filePath) {
      throw new NotFoundException(
        `No se encontró el archivo con la clave ${fileKey}`,
      );
    }

    const fullPath = path.join(
      __dirname,
      '..',
      '..',
      'uploadsSubcontratados',
      filePath,
    );

    try {
      await fs.promises.access(fullPath, fs.constants.F_OK);
      await fs.promises.unlink(fullPath);
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
        subcontratado.docsubcontratado,
      );

      subcontratado.docsubcontratado[fileKey] = null;
      await this.docsubcontratadoRepository.save(
        subcontratado.docsubcontratado,
      );

      console.log(
        'Documentación después de guardar:',
        subcontratado.docsubcontratado,
      );
    } catch (err) {
      console.error(`Error al actualizar la base de datos: ${err.message}`);
      throw new Error(
        'Error al eliminar la referencia del archivo en la base de datos',
      );
    }
  }

  //Fin del metodo para eliminar un documento de la persona
  //--------------------------------------------------------------------------------

  findAll() {
    return `This action returns all docsubcontratado`;
  }

  //--------------------------------------------------------------------------------
  //Mettodo paraguardar documentación
}
