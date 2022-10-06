import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RickandmortyService } from './rickandmorty.service';
import { CreateRickandmortyDto } from './dto/create-rickandmorty.dto';
import { UpdateRickandmortyDto } from './dto/update-rickandmorty.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('rickandmorty')
export class RickandmortyController {
  constructor(private readonly rickandmortyService: RickandmortyService) {}

  @Post()
  create(@Body() createRickandmortyDto: CreateRickandmortyDto) {
    return this.rickandmortyService.create(createRickandmortyDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.rickandmortyService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.rickandmortyService.findOne(term);
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updateRickandmortyDto: UpdateRickandmortyDto,
  ) {
    return this.rickandmortyService.update(term, updateRickandmortyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.rickandmortyService.remove(id);
  }
}
