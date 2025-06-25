import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { FilmesService } from './filmes.service';

export interface CreateFilmeDto {
  titulo: string;
  descricao: string;
  genero: string;
  classificacaoIndicativa: string;
  duracao: string;
  dataEstreia: string;
}

export interface UpdateFilmeDto {
  titulo?: string;
  descricao?: string;
  genero?: string;
  classificacaoIndicativa?: string;
  duracao?: string;
  dataEstreia: string;
}

@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @Get()
  findAll() {
    return this.filmesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmesService.findOne(+id);
  }

  @Post()
  create(@Body() createFilmeDto: CreateFilmeDto) {
    console.log(createFilmeDto)
    return this.filmesService.create(createFilmeDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFilmeDto: UpdateFilmeDto) {
    return this.filmesService.update(+id, updateFilmeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmesService.remove(+id);
  }
}