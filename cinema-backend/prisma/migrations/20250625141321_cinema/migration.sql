/*
  Warnings:

  - You are about to drop the column `comprador` on the `Ingresso` table. All the data in the column will be lost.
  - You are about to drop the column `horario` on the `Sessao` table. All the data in the column will be lost.
  - Added the required column `classificacaoIndicativa` to the `Filme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataEstreia` to the `Filme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `Filme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Filme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assento` to the `Ingresso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `Ingresso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeCliente` to the `Ingresso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoPagamento` to the `Ingresso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Ingresso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Sala` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Sala` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataHora` to the `Sessao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formato` to the `Sessao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idioma` to the `Sessao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `Sessao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Sessao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Filme" ADD COLUMN     "classificacaoIndicativa" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dataEstreia" TEXT NOT NULL,
ADD COLUMN     "genero" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "duracao" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Ingresso" DROP COLUMN "comprador",
ADD COLUMN     "assento" TEXT NOT NULL,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nomeCliente" TEXT NOT NULL,
ADD COLUMN     "tipoPagamento" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Sala" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tipo" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "capacidade" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Sessao" DROP COLUMN "horario",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dataHora" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "formato" TEXT NOT NULL,
ADD COLUMN     "idioma" TEXT NOT NULL,
ADD COLUMN     "preco" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
