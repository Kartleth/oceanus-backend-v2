import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { DocsubcontratadoService } from './docsubcontratado.service';
import { UpdateDocsubcontratadoDto } from './dto/update-docsubcontratado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcontratado } from 'src/subcontratados/entities/subcontratado.entity';
import { Repository } from 'typeorm';
import { Docsubcontratado } from './entities/docsubcontratado.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('docsubcontratado')
export class DocsubcontratadoController {
  constructor(
    private readonly docsubcontratadoService: DocsubcontratadoService,
    @InjectRepository(Docsubcontratado)
    private readonly docsubcontratadoRepository: Repository<Docsubcontratado>,
    @InjectRepository(Subcontratado)
    private readonly subcontratadoRepository: Repository<Subcontratado>,
  ) {}

  @Get()
  findAll() {
    return this.docsubcontratadoService.findAll();
  }

  //--------------------------------------------------------------------------------
  // Ruta para obtener la documentación de una persona por su id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.docsubcontratadoService.findOne(+id);
  }
  // Fin de la ruta para obtener la documentación de una persona por su id
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  // Ruta para obtener la documentación de un subcontratdo por el documentKey
  @Get(':subcontratadoId/getDoc/:documentKey')
  async getDocument(
    @Param('subcontratadoId') subcontratadoId: number,
    @Param('documentKey') documentKey: string,
  ) {
    try {
      const validDocumentKeys = ['rfc', 'nss', 'ine', 'curp', 'foto'];

      if (!validDocumentKeys.includes(documentKey)) {
        throw new Error('DocumentKey no válido');
      }

      const subcontratado = await this.subcontratadoRepository.findOne({
        where: { idsubcontratado: subcontratadoId },
      });

      if (!subcontratado) {
        throw new Error('Subcontratado no encontrado');
      }

      const docsubcontratado = await this.docsubcontratadoRepository.findOne({
        where: { subcontratado: subcontratado },
      });

      if (!docsubcontratado) {
        throw new Error('No se encontró documentación para este subcontratado');
      }

      const documentPath = docsubcontratado[documentKey];

      if (!documentPath) {
        throw new Error(`No se encontró el archivo para "${documentKey}"`);
      }

      const fileUrl = `http://localhost:3001/uploadsSubcontratados/${documentPath}`;
      return { message: 'Archivo encontrado', fileUrl };
    } catch (error) {
      console.error('Error al obtener el documento:', error);
      return { message: 'Error al obtener el documento', error: error.message };
    }
  }
  // Fin de la ruta para obtener la documentación de un subcontratdo por el documentKey
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  // Ruta para actualizar/editar archivos de documentación, sirve para agregar nuevo documento también
  @Patch('updateDoc/:subcontratadoId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'rfc', maxCount: 1 },
        { name: 'nss', maxCount: 1 },
        { name: 'ine', maxCount: 1 },
        { name: 'curp', maxCount: 1 },
        { name: 'foto', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploadsSubcontratados',
          filename: (req, file, cb) => {
            const ext = extname(file.originalname);
            const fileName = `${Date.now()}${ext}`;
            cb(null, fileName);
          },
        }),
        fileFilter: (req, file, cb) => {
          const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
          if (
            !allowedExtensions.includes(
              extname(file.originalname).toLowerCase(),
            )
          ) {
            const errorMessage = `Archivo no permitido. Se esperaba uno de los siguientes formatos: ${allowedExtensions.join(', ')}`;
            return cb(new Error(errorMessage), false);
          }
          cb(null, true);
        },
        limits: {
          fileSize: 5 * 1024 * 1024, // Límite de 5MB para los archivos
        },
      },
    ),
  )
  async updateDocumentFiles(
    @Param('subcontratadoId') subcontratadoId: number,
    @UploadedFiles() files: { [fieldname: string]: Express.Multer.File[] },
    @Body() updateDocsubcontratadoDto: UpdateDocsubcontratadoDto,
  ) {
    try {
      console.log('Archivos recibidos:', files);

      if (!files || Object.keys(files).length === 0) {
        throw new Error('No se recibieron archivos');
      }

      const filePaths = {};
      for (const key in files) {
        if (files[key]) {
          filePaths[key] = files[key][0].filename;
        }
      }

      console.log('Rutas generadas para guardar:', filePaths);

      const updatedDto: UpdateDocsubcontratadoDto = {
        ...updateDocsubcontratadoDto,
        filePaths,
      };

      await this.docsubcontratadoService.updateDocumentacion(
        subcontratadoId,
        updatedDto,
      );
      return { message: 'Archivos actualizados correctamente', filePaths };
    } catch (error) {
      console.error('Error detallado al actualizar archivos:', error);
      return { message: 'Error al actualizar archivos', error: error.message };
    }
  }

  // Fin de la ruta para actualizar/editar archivos de documentación
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  // Ruta para actualizar un archivo específico de documentación por su fileKey
  @Patch(':subcontratadoId/updateDoc/:fileKey')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'rfc', maxCount: 1 },
        { name: 'nss', maxCount: 1 },
        { name: 'ine', maxCount: 1 },
        { name: 'curp', maxCount: 1 },
        { name: 'foto', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploadsSubcontratados',
          filename: (req, file, cb) => {
            const fileKey = req.params.fileKey;
            const ext = extname(file.originalname);
            const fileName = `${Date.now()}-${fileKey}${ext}`;
            cb(null, fileName);
          },
        }),
        fileFilter: (req, file, cb) => {
          const allowedExtensions =
            file.fieldname === 'foto'
              ? ['.jpg', '.jpeg', '.png']
              : ['.jpg', '.jpeg', '.png', '.pdf'];

          const fileExt = extname(file.originalname).toLowerCase();
          if (!allowedExtensions.includes(fileExt)) {
            console.error(`Archivo no permitido: ${file.originalname}`);
            return cb(new Error('Archivo no permitido'), false);
          }

          const maxFileSize = 5 * 1024 * 1024; // 5 MB
          if (file.size > maxFileSize) {
            console.error(
              `El archivo ${file.originalname} excede el límite de tamaño.`,
            );
            return cb(
              new Error('El archivo excede el límite de tamaño permitido'),
              false,
            );
          }

          cb(null, true);
        },
        limits: {
          fileSize: 5 * 1024 * 1024, // 5 MB
        },
      },
    ),
  )
  async updateSpecificDocument(
    @Param('subcontratadoId') subcontratadoId: number,
    @Param('fileKey') fileKey: string,
    @UploadedFiles() files: { [key: string]: Express.Multer.File[] },
  ) {
    if (!files[fileKey] || files[fileKey].length === 0) {
      throw new BadRequestException(`No se recibió el archivo para ${fileKey}`);
    }

    const newFilePath = files[fileKey][0].filename;

    await this.docsubcontratadoService.updateSpecificDocument(
      subcontratadoId,
      fileKey,
      newFilePath,
    );

    return { message: `${fileKey} actualizado correctamente`, newFilePath };
  }

  // Fin de la ruta para actualizar un archivo específico de documentación por su fileKey
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  // Ruta para eliminar un archivo de documentación
  @Delete(':subcontratadoId/deleteDoc/:fileKey')
  async deleteFile(
    @Param('subcontratadoId') subcontratadoId: number,
    @Param('fileKey') fileKey: string,
  ) {
    await this.docsubcontratadoService.deleteDocument(subcontratadoId, fileKey);
    return { message: 'Archivo eliminado correctamente' };
  }
}
