import { Injectable } from '@nestjs/common';
import { CreateDocumentacionDto } from './dto/create-documentacion.dto';
import { UpdateDocumentacionDto } from './dto/update-documentacion.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Documentacion } from './entities/documentacion.entity';
import { Persona } from 'src/personas/entities/persona.entity';

@Injectable()
export class DocumentacionService {
  constructor(
    @InjectRepository(Documentacion)
    private readonly documentacionRepository: Repository<Documentacion>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

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

  update(id: number, updateDocumentacionDto: UpdateDocumentacionDto) {
    return `This action updates a #${id} documentacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentacion`;
  }
}
