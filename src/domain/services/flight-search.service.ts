import { Result } from '../../utils/result';
import { FlightList, FlightListItem } from '../entities/flight-list';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FlightSearchService {
  searchPath(items: unknown): Result<FlightListItem, Error> {
    // Validate the list of items
    const listResult = FlightList.parse(items);
    if (listResult.isErr()) {
      return new Result<FlightListItem, Error>(
        null,
        new Error(`Invalid items: ${listResult.getErr().message}`),
      );
    }
    const list = listResult.unwrap();

    if (list.empty) {
      return new Result<FlightListItem, Error>(null, new Error('Empty path'));
    }

    // Sort the items into a path
    const sort = list.sort();
    if (sort.isErr()) {
      return new Result<FlightListItem, Error>(
        null,
        new Error(`Invalid path: ${sort.getErr().message}`),
      );
    }

    const sorted = sort.unwrap();
    // Retrieve the first and last items
    const item: FlightListItem = [sorted.fistItem![0], sorted.lastItem![1]];
    return new Result<FlightListItem, Error>(item, null);
  }
}
