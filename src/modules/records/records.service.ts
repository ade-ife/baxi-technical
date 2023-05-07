import { Injectable, Logger,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './record.entity';



@Injectable()
export class RecordsService {

  private readonly logger = new Logger(RecordsService.name);


  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}


  async fetchRecords(): Promise<NodeJS.ReadableStream> {
    try {
      const queryBuilder = this.recordRepository.createQueryBuilder('record');
      const stream = await queryBuilder.select('*').stream()
      return stream;
    } catch (error) {
      this.logger.error(`Error fetching records: ${error}`);
      throw error;
    }
  }

}
