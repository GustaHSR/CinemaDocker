import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { IngressosService } from './ingressos.service';

export interface CreateIngressoDto {
  sessaoId: number;
  nomeCliente: string;
  cpf: string;
  assento: string;
  tipoPagamento: string; // Cartão, Pix, Dinheiro
}

export interface UpdateIngressoDto {
  sessaoId?: number;
  nomeCliente?: string;
  cpf?: string;
  assento?: string;
  tipoPagamento?: string;
}

@Controller('ingressos')
export class IngressosController {
  constructor(private readonly ingressosService: IngressosService) {}

  @Get()
  findAll() {
    return this.ingressosService.findAll();
  }

  @Get('sessao/:sessaoId')
  findBySessao(@Param('sessaoId') sessaoId: string) {
    return this.ingressosService.findBySessao(+sessaoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingressosService.findOne(+id);
  }

  @Post()
  create(@Body() createIngressoDto: CreateIngressoDto) {
    return this.ingressosService.create(createIngressoDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateIngressoDto: UpdateIngressoDto) {
    return this.ingressosService.update(+id, updateIngressoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingressosService.remove(+id);
  }
}