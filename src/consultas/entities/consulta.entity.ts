import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Medico } from '../../medicos/entities/medico.entity';

@Entity('consultas')
export class Consulta {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_medico' })
  idMedico: number;

  @Column('varchar', { length: 100 })
  paciente: string;

  @Column('date', { name: 'fecha_consulta' })
  fechaConsulta: Date;

  @Column('varchar', { length: 255 })
  diagnostico: string;

  @ManyToOne(() => Medico, (medico) => medico.consultas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_medico' })
  medico: Medico;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;
}