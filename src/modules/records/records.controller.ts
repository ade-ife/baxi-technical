import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { RecordsService } from "./records.service";
import {Response} from 'express';

@Controller('records')
export class RecordsController {

  constructor(private readonly recordService: RecordsService) {
  }


  @Get()
  async getRecords(@Res() res: Response) {
    try {
      const stream = await this.recordService.fetchRecords();
      res.setHeader('Content-Type', 'application/json');
      let data = '';
      stream.on('data', (chunk) => {
        data += JSON.stringify(chunk);
        res.write(JSON.stringify(chunk));
      });
      stream.on('end', () => {
        res.write(data)
        res.end()})
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred while fetching records.',
      });
    }


  }

}
