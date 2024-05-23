import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { FlightSearchService } from '../domain/services/flight-search.service';

@Controller('flights')
export class FlightController {
  constructor(private readonly service: FlightSearchService) {}

  @Post('search-path')
  @HttpCode(200)
  searchPath(@Body() data: unknown) {
    console.log(`data:`, data);
    const result = this.service.searchPath(data);
    if (result.isErr()) {
      throw new BadRequestException(result.getErr());
    }

    return { path: result.unwrap() };
  }
}
