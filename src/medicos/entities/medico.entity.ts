import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Consulta } from '../../consultas/entities/consulta.entity';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('date', { name: 'fecha_nacimiento' })
  fechaNacimiento: Date;

  @Column('varchar', { length: 20 })
  celular: string;

  @Column('varchar', { length: 100 })
  especialidad: string;

  @OneToMany(() => Consulta, (consulta) => consulta.medico)
  consultas: Consulta[];

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;
}