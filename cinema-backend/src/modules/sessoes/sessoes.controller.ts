import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { SessoesService } from './sessoes.service';

export interface CreateSessaoDto {
  filmeId: number;
  salaId: number;
  dataHora: string;
  preco: number;
  idioma: string; // Dublado, Legendado
  formato: string; // 2D, 3D
}

export interface UpdateSessaoDto {
  filmeId: number;
  salaId: number;
  dataHora?: string;
  preco?: number;
  idioma?: string;
  formato?: string;
}

@Controller('sessoes')
export class SessoesController {
  constructor(private readonly sessoesService: SessoesService) {}

  @Get()
  findAll() {
    return this.sessoesService.findAll();
  }

  @Get('disponiveis')
  findAvailable() {
    return this.sessoesService.findAvailable();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessoesService.findOne(+id);
  }

  @Post()
  create(@Body() createSessaoDto: CreateSessaoDto) {
    return this.sessoesService.create(createSessaoDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSessaoDto: UpdateSessaoDto) {
    return this.sessoesService.update(+id, updateSessaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessoesService.remove(+id);
  }
}