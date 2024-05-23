import { Result } from '../utils/result';
import { z } from 'zod';

const schema = z.array(z.array(z.string().min(3).max(3)).min(2).max(2));

type FlightListItem = [string, string];

export class FligthList {
  private constructor(private readonlyitems: FlightListItem[]) {}

  static parse(data: unknown): Result<FligthList, Error> {
    const validate = schema.safeParse(data);
    if (validate.success) {
      return new Result(
        new FligthList(validate.data as FlightListItem[]),
        null,
      );
    } else {
      return new Result(null, new Error(validate.error.message));
    }
  }
}
