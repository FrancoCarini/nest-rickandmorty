import { PartialType } from '@nestjs/mapped-types';
import { CreateRickandmortyDto } from './create-rickandmorty.dto';

export class UpdateRickandmortyDto extends PartialType(CreateRickandmortyDto) {}
