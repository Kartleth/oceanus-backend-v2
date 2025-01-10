import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { DocumentacionService } from './documentacion.service';
import { CreateDocumentacionDto } from './dto/create-documentacion.dto';
import { UpdateDocumentacionDto } from './dto/update-documentacion.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('documentacion')
export class DocumentacionController {
  constructor(private readonly documentacionService: DocumentacionService) {}

  // Ruta para agregar documentación a una persona
  @Post(':personaId')
  async addDocumentToPersona(
    @Param('personaId') personaId: number,
    @Body() createDocumentacionDto: CreateDocumentacionDto,
  ) {
    return await this.documentacionService.addDocumentoPersona(
      personaId,
      createDocumentacionDto,
    );
  }

  // Ruta para la carga de archivos
  @Post(':personaId/upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'credencial', maxCount: 1 },
        { name: 'licencia', maxCount: 1 },
        { name: 'pasaporte', maxCount: 1 },
        { name: 'cv', maxCount: 1 },
        { name: 'curp', maxCount: 1 },
        { name: 'inss', maxCount: 1 },
        { name: 'constanciasat', maxCount: 1 },
        { name: 'foto', maxCount: 1 },
        { name: 'actnacimiento', maxCount: 1 },
        { name: 'estcuenta', maxCount: 1 },
        { name: 'altasegsocial', maxCount: 1 },
        { name: 'cedulaprofe', maxCount: 1 },
        { name: 'copiacontrato', maxCount: 1 },
        { name: 'comprodomicilio', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const fileName = `${Date.now()}${extname(file.originalname)}`;
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
            return cb(new Error('Archivo no permitido'), false);
          }
          cb(null, true);
        },
      },
    ),
  )
  async uploadFile(
    @Param('personaId') personaId: number,
    @UploadedFiles() files: { [fieldname: string]: Express.Multer.File[] },
  ) {
    try {
      const filePaths = {};
      for (const key in files) {
        if (files[key]) {
          filePaths[key] = files[key][0].filename;
        }
      }

      await this.documentacionService.saveDocumentacion(filePaths, personaId);
      return { message: 'Archivos subidos correctamente', filePaths };
    } catch (error) {
      return { message: 'Error al subir archivos', error: error.message };
    }
  }

  @Get()
  findAll() {
    return this.documentacionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.documentacionService.findOne(+id);
  }

  @Patch('update/:personaId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'credencial', maxCount: 1 },
        { name: 'licencia', maxCount: 1 },
        { name: 'pasaporte', maxCount: 1 },
        { name: 'cv', maxCount: 1 },
        { name: 'curp', maxCount: 1 },
        { name: 'inss', maxCount: 1 },
        { name: 'constanciasat', maxCount: 1 },
        { name: 'foto', maxCount: 1 },
        { name: 'actnacimiento', maxCount: 1 },
        { name: 'estcuenta', maxCount: 1 },
        { name: 'altasegsocial', maxCount: 1 },
        { name: 'cedulaprofe', maxCount: 1 },
        { name: 'copiacontrato', maxCount: 1 },
        { name: 'comprodomicilio', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const fileName = `${Date.now()}${extname(file.originalname)}`;
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
            return cb(new Error('Archivo no permitido'), false);
          }
          cb(null, true);
        },
      },
    ),
  )
  async updateDocumentFiles(
    @Param('personaId') personaId: number,
    @UploadedFiles() files: { [fieldname: string]: Express.Multer.File[] },
    @Body() updateDocumentacionDto: UpdateDocumentacionDto,
  ) {
    try {
      const filePaths = {};
      for (const key in files) {
        if (files[key]) {
          filePaths[key] = files[key][0].filename;
        }
      }

      const updatedDto: UpdateDocumentacionDto = {
        ...updateDocumentacionDto,
        filePaths,
      };

      await this.documentacionService.updateDocumentacion(
        personaId,
        updatedDto,
      );
      return { message: 'Archivos actualizados correctamente', filePaths };
    } catch (error) {
      return { message: 'Error al actualizar archivos', error: error.message };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentacionService.remove(+id);
  }
}
