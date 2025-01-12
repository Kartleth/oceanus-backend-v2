import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFiles,
  Delete,
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

  //--------------------------------------------------------------------------------
  // Ruta para agregar documentación a una persona (Es del metodo que borrare despues)
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
  // Fin de la ruta para agregar documentación a una persona
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  // Ruta para obtener toda la documentación aun no implementada
  @Get()
  findAll() {
    return this.documentacionService.findAll();
  }
  // Fin de la ruta para obtener toda la documentación
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  // Ruta para obtener la documentación de una persona por su id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.documentacionService.findOne(+id);
  }
  // Fin de la ruta para obtener la documentación de una persona por su id
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  // Ruta para actualizar/editar archivos de documentación, sirve para agregar nuevo documento también
  @Patch('updateDoc/:personaId')
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
            // Obtener la extensión del archivo
            const ext = extname(file.originalname);
            // Crear un nuevo nombre con la extensión del archivo
            const fileName = `${Date.now()}${ext}`; // El nombre del archivo ahora incluye la extensión
            cb(null, fileName); // Pasar el nombre de archivo generado a la función cb
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
    @Param('personaId') personaId: number,
    @UploadedFiles() files: { [fieldname: string]: Express.Multer.File[] },
    @Body() updateDocumentacionDto: UpdateDocumentacionDto,
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
      console.error('Error detallado al actualizar archivos:', error); // Esto imprimirá el error con más detalles
      return { message: 'Error al actualizar archivos', error: error.message };
    }
  }

  // Fin de la ruta para actualizar/editar archivos de documentación
  //--------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------
  // Ruta para eliminar un archivo de documentación
  @Delete(':personaId/deleteDoc/:fileKey')
  async deleteFile(
    @Param('personaId') personaId: number,
    @Param('fileKey') fileKey: string,
  ) {
    await this.documentacionService.deleteDocument(personaId, fileKey);
    return { message: 'Archivo eliminado correctamente' };
  }
}
