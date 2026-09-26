import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { Consulta } from './entities/consulta.entity';
import { Medico } from '../medicos/entities/medico.entity';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(Consulta)
    private readonly consultasRepository: Repository<Consulta>,
    @InjectRepository(Medico)
    private readonly medicosRepository: Repository<Medico>,
  ) {}

  async create(createConsultaDto: CreateConsultaDto): Promise<Consulta> {
    const medico = await this.medicosRepository.findOneBy({ id: createConsultaDto.idMedico });
    if (!medico) {
      throw new NotFoundException(`El médico con ID ${createConsultaDto.idMedico} no existe`);
    }

    const consulta = new Consulta();
    Object.assign(consulta, createConsultaDto);
    return await this.consultasRepository.save(consulta);
  }

  async findAll(): Promise<Consulta[]> {
    return await this.consultasRepository.find({ relations: { medico: true } });
  }

  async findOne(id: number): Promise<Consulta> {
    const consulta = await this.consultasRepository.findOne({
      where: { id },
      relations: { medico: true },
    });
    if (!consulta) {
      throw new NotFoundException('La consulta no existe');
    }
    return consulta;
  }

  async update(id: number, updateConsultaDto: UpdateConsultaDto): Promise<Consulta> {
    const consulta = await this.findOne(id);
    if (updateConsultaDto.idMedico) {
      const medico = await this.medicosRepository.findOneBy({ id: updateConsultaDto.idMedico });
      if (!medico) {
        throw new NotFoundException(`El médico con ID ${updateConsultaDto.idMedico} no existe`);
      }
    }
    Object.assign(consulta, updateConsultaDto);
    return await this.consultasRepository.save(consulta);
  }

  async remove(id: number): Promise<Consulta> {
    const consulta = await this.findOne(id);
    return await this.consultasRepository.softRemove(consulta);
  }
}