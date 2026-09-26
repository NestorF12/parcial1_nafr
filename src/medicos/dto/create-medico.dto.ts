import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMedicoDto {
  @ApiProperty({
    description: 'Nombre completo del médico',
    example: 'Dr. Carlos Mendoza',
  })
  @IsNotEmpty({ message: 'El nombre del médico no debe estar vacío' })
  @IsString({ message: 'El nombre del médico debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre del médico no debe exceder los 100 caracteres' })
  readonly nombre: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del médico (AAAA-MM-DD)',
    example: '1988-03-15',
  })
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
  readonly fechaNacimiento: Date;

  @ApiProperty({
    description: 'Número de celular de contacto del médico',
    example: '71234567',
  })
  @IsNotEmpty({ message: 'El número de celular no debe estar vacío' })
  @IsString({ message: 'El celular debe ser una cadena de texto' })
  @MaxLength(20, { message: 'El celular no debe exceder los 20 caracteres' })
  readonly celular: string;

  @ApiProperty({
    description: 'Especialidad médica del profesional',
    example: 'Cardiología',
  })
  @IsNotEmpty({ message: 'La especialidad no debe estar vacía' })
  @IsString({ message: 'La especialidad debe ser una cadena de texto' })
  @MaxLength(100, { message: 'La especialidad no debe exceder los 100 caracteres' })
  readonly especialidad: string;
}