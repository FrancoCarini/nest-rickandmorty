import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Rickandmorty } from './entities/rickandmorty.entity';

import { CreateRickandmortyDto } from './dto/create-rickandmorty.dto';
import { UpdateRickandmortyDto } from './dto/update-rickandmorty.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class RickandmortyService {
  constructor(
    @InjectModel(Rickandmorty.name)
    private readonly rickandmortyModel: Model<Rickandmorty>,
  ) {}

  async create(createRickandmortyDto: CreateRickandmortyDto) {
    try {
      const rickandmorty = await this.rickandmortyModel.create(
        createRickandmortyDto,
      );
      return rickandmorty;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.rickandmortyModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ number: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let rickandmorty: Rickandmorty;

    if (!isNaN(+term)) {
      rickandmorty = await this.rickandmortyModel.findOne({ number: term });
    }

    // MongoID
    if (!rickandmorty && isValidObjectId(term)) {
      rickandmorty = await this.rickandmortyModel.findById(term);
    }

    // Name
    if (!rickandmorty) {
      rickandmorty = await this.rickandmortyModel.findOne({
        name: term,
      });
    }

    if (!rickandmorty)
      throw new NotFoundException(
        `Character with id, name or no "${term}" not found`,
      );

    return rickandmorty;
  }

  async update(term: string, updateRickandmortyDto: UpdateRickandmortyDto) {
    const rickandmorty = await this.findOne(term);
    if (!rickandmorty)
      throw new NotFoundException(
        `Character with id, name or no "${term}" not found`,
      );

    try {
      const newRickAndMorty = await rickandmorty.updateOne(
        updateRickandmortyDto,
      );
      return { ...rickandmorty.toJSON(), ...updateRickandmortyDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.rickandmortyModel.deleteOne({
      _id: id,
    });

    if (deletedCount === 0)
      throw new BadRequestException(`Character with id ${id} not found`);
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Character already exists ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException("Can't perform this action");
  }
}
