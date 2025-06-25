import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

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

@Injectable()
export class FilmesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.filme.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  findOne(id: number) {
    return this.prisma.filme.findUnique({ 
      where: { id },
      include: {
        sessoes: {
          include: {
            sala: true
          }
        }
      }
    });
  }

  create(data: CreateFilmeDto) {
    return this.prisma.filme.create({ 
      data: {
        ...data,
        dataEstreia: (data.dataEstreia)
      }
    });
  }

  update(id: number, data: UpdateFilmeDto) {
    return this.prisma.filme.update({
      where: { id },
      data: {
        ...data,
        ...(data.dataEstreia && { dataEstreia: (data.dataEstreia) })
      }
    });
  }

  remove(id: number) {
    return this.prisma.filme.delete({ where: { id } });
  }
}