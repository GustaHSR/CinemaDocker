import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FilmesModule } from './modules/filmes/filmes.module';
import { SalasModule } from './modules/salas/salas.module';
import { SessoesModule } from './modules/sessoes/sessoes.module';
import { IngressosModule } from './modules/ingressos/ingressos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, FilmesModule, SalasModule, SessoesModule, IngressosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
