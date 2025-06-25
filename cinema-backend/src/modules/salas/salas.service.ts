import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

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

@Injectable()
export class SalasService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.sala.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  findOne(id: number) {
    return this.prisma.sala.findUnique({ 
      where: { id },
      include: {
        sessoes: {
          include: {
            filme: true
          }
        }
      }
    });
  }

  create(data: CreateSalaDto) {
    return this.prisma.sala.create({ data });
  }

  update(id: number, data: UpdateSalaDto) {
    return this.prisma.sala.update({
      where: { id },
      data
    });
  }

  remove(id: number) {
    return this.prisma.sala.delete({ where: { id } });
  }
}