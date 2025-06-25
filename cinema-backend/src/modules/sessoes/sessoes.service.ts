import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

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

@Injectable()
export class SessoesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.sessao.findMany({
      include: { 
        filme: true, 
        sala: true,
        ingressos: true
      },
      orderBy: { dataHora: 'asc' }
    });
  }

  findAvailable() {
    const now = new Date();
    return this.prisma.sessao.findMany({
      where: {
        dataHora: {
          gte: now
        }
      },
      include: { 
        filme: true, 
        sala: true,
        ingressos: true
      },
      orderBy: { dataHora: 'asc' }
    });
  }

  findOne(id: number) {
    return this.prisma.sessao.findUnique({ 
      where: { id },
      include: { 
        filme: true, 
        sala: true,
        ingressos: true
      }
    });
  }

  create(data: CreateSessaoDto) {
    return this.prisma.sessao.create({
      data: {
        filme: {
          connect: {
            id: Number(data.filmeId), // ✅ forçando conversão para número
          },
        },
        sala: {
          connect: {
            id: Number(data.salaId), // ✅ idem
          },
        },
        dataHora: new Date(data.dataHora),
        preco: Number(data.preco), // ✅ se estiver vindo como string, transforma aqui
        idioma: data.idioma,
        formato: data.formato,
      },
      include: {
        filme: true,
        sala: true,
      },
    });
  }


  update(id: number, data: UpdateSessaoDto) {
    return this.prisma.sessao.update({
      where: { id },
      data: {
        ...data,
        ...(data.dataHora && { dataHora: new Date(data.dataHora) })
      },
      include: {
        filme: true,
        sala: true
      }
    });
  }

  remove(id: number) {
    return this.prisma.sessao.delete({ where: { id } });
  }
}