import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { SalasService } from './salas.service';

export interface CreateSalaDto {
  nome: string;
  capacidade: string;
  tipo: string; // 2D, 3D, IMAX
}

export interface UpdateSalaDto {
  nome?: string;
  capacidade?: string;
  tipo?: string;
}

@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

  @Get()
  findAll() {
    return this.salasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salasService.findOne(+id);
  }

  @Post()
  create(@Body() createSalaDto: CreateSalaDto) {
    return this.salasService.create(createSalaDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSalaDto: UpdateSalaDto) {
    return this.salasService.update(+id, updateSalaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salasService.remove(+id);
  }
}