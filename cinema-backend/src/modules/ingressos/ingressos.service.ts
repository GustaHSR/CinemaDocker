import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

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

@Injectable()
export class IngressosService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.ingresso.findMany({ 
      include: { 
        sessao: {
          include: {
            filme: true,
            sala: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  findBySessao(sessaoId: number) {
    return this.prisma.ingresso.findMany({
      where: { sessaoId },
      include: { 
        sessao: {
          include: {
            filme: true,
            sala: true
          }
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.ingresso.findUnique({ 
      where: { id },
      include: { 
        sessao: {
          include: {
            filme: true,
            sala: true
          }
        }
      }
    });
  }

  async create(data: CreateIngressoDto) {
    // Verificar se o assento já está ocupado nesta sessão
    const assentoOcupado = await this.prisma.ingresso.findFirst({
      where: {
        sessaoId: data.sessaoId,
        assento: data.assento
      }
    });

    if (assentoOcupado) {
      throw new ConflictException('Este assento já está ocupado nesta sessão');
    }

    // Verificar se a sessão existe e ainda não aconteceu
    const sessao = await this.prisma.sessao.findUnique({
      where: { id: data.sessaoId },
      include: { sala: true }
    });

    if (!sessao) {
      throw new ConflictException('Sessão não encontrada');
    }

    if (sessao.dataHora < new Date()) {
      throw new ConflictException('Não é possível comprar ingresso para sessões já iniciadas');
    }

    // Verificar capacidade da sala
    const ingressosVendidos = await this.prisma.ingresso.count({
      where: { sessaoId: data.sessaoId }
    });

    return this.prisma.ingresso.create({ 
      data,
      include: { 
        sessao: {
          include: {
            filme: true,
            sala: true
          }
        }
      }
    });
  }

  update(id: number, data: UpdateIngressoDto) {
    return this.prisma.ingresso.update({
      where: { id },
      data,
      include: { 
        sessao: {
          include: {
            filme: true,
            sala: true
          }
        }
      }
    });
  }

  remove(id: number) {
    return this.prisma.ingresso.delete({ where: { id } });
  }
}