import { Module } from '@nestjs/common';
import { FlightController } from './infrastructure/flight.controller';
import { FlightSearchService } from './domain/services/flight-search.service';

@Module({
  imports: [],
  controllers: [FlightController],
  providers: [FlightSearchService],
})
export class AppModule {}
