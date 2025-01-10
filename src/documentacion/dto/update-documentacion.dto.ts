import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentacionDto } from './create-documentacion.dto';

export class UpdateDocumentacionDto extends PartialType(
  CreateDocumentacionDto,
) {
  filePaths: { [key: string]: string };
}
