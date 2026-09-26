import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateConsultaDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'El id_medico es obligatorio' })
  @IsInt({ message: 'El id_medico debe ser un número entero' })
  readonly idMedico: number;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsNotEmpty({ message: 'El campo paciente no debe estar vacío' })
  @IsString({ message: 'El campo paciente debe ser una cadena' })
  @MaxLength(100)
  readonly paciente: string;

  @ApiProperty({ example: '2026-09-26' })
  @IsNotEmpty({ message: 'La fecha_consulta es obligatoria' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'La fecha_consulta debe ser una fecha válida' })
  readonly fechaConsulta: Date;

  @ApiProperty({ example: 'Gripe fuerte y fiebre' })
  @IsNotEmpty({ message: 'El diagnóstico no debe estar vacío' })
  @IsString()
  @MaxLength(255)
  readonly diagnostico: string;
}