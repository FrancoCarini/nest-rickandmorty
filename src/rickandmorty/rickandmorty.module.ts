import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RickandmortyService } from './rickandmorty.service';
import { RickandmortyController } from './rickandmorty.controller';
import {
  Rickandmorty,
  RickandmortySchema,
} from './entities/rickandmorty.entity';

@Module({
  controllers: [RickandmortyController],
  providers: [RickandmortyService],
  imports: [
    MongooseModule.forFeature([
      { name: Rickandmorty.name, schema: RickandmortySchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class RickandmortyModule {}
