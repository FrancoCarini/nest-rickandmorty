import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RickandmortyModule } from 'src/rickandmorty/rickandmorty.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [RickandmortyModule],
})
export class SeedModule {}
