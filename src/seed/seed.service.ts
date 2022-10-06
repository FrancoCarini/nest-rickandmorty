import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Rickandmorty } from 'src/rickandmorty/entities/rickandmorty.entity';
import { RickResponse } from './interfaces/rick-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Rickandmorty.name)
    private readonly rickandmortyModel: Model<Rickandmorty>,
  ) {}

  async executeSeed() {
    await this.rickandmortyModel.deleteMany({});

    const { data } = await this.axios.get<RickResponse>(
      'https://rickandmortyapi.com/api/character',
    );

    const characterToInsert: { name: string; number: number }[] = [];

    data.results.forEach(async ({ id, name }) => {
      characterToInsert.push({ name, number: id }); // [{ name: bulbasaur, no: 1 }]
    });

    await this.rickandmortyModel.insertMany(characterToInsert);

    return `Seed Executed!`;
  }
}
