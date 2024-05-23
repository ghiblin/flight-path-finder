import { Result } from '../utils/result';
import { z } from 'zod';

const itemSchema = z.array(z.string().min(3).max(3)).min(2).max(2);
const schema = z.array(itemSchema);

type FlightListItem = [string, string];

export class FlightList {
  #items: FlightListItem[];
  private constructor(items: FlightListItem[]) {
    this.#items = items;
  }

  static parse(data: unknown): Result<FlightList, Error> {
    const validate = schema.safeParse(data);
    if (validate.success) {
      return new Result(
        new FlightList(validate.data as FlightListItem[]),
        null,
      );
    } else {
      return new Result<FlightList, Error>(
        null,
        new Error(validate.error.message),
      );
    }
  }

  sort(): Result<FlightList, Error> {
    const list = new FlightList([]);
    // Deep copy of the items
    let items: FlightListItem[] = JSON.parse(JSON.stringify(this.#items));
    while (items.length) {
      const idx = items.findIndex(
        (i) => list.canAppend(i) || list.canPrepend(i),
      );
      if (idx === -1) {
        // there is no item to append/prepend => incomplete path
        return new Result<FlightList, Error>(
          null,
          new Error('incomplete path'),
        );
      }
      const item = items[idx];
      if (list.canAppend(item)) {
        list.append(item);
      } else {
        list.prepend(item);
      }
      // Remove the added item from the array
      items = [...items.slice(0, idx), ...items.slice(idx + 1)];
    }
    return new Result<FlightList, Error>(list, null);
  }

  canAppend(item: FlightListItem) {
    if (!itemSchema.safeParse(item).success) {
      // no a valid item
      return false;
    }
    if (this.empty) {
      // We can alway append to an empty liest
      return true;
    }
    // Check if the destination is the departure of the new item
    return this.lastItem![1] === item[0];
  }

  canPrepend(item: FlightListItem) {
    if (!itemSchema.safeParse(item).success) {
      // no a valid item
      return false;
    }
    if (this.empty) {
      // We can alway prepend to an empty liest
      return true;
    }
    // Check if the departure is the destination of the new item
    return this.fistItem![0] === item[1];
  }

  get fistItem(): FlightListItem | null {
    if (this.empty) {
      return null;
    }
    return this.#items[0];
  }

  get lastItem(): FlightListItem | null {
    if (this.empty) {
      return null;
    }
    return this.#items[this.#items.length - 1];
  }

  append(item: FlightListItem) {
    if (itemSchema.safeParse(item).success) {
      this.#items = [...this.#items, item];
    }
  }

  prepend(item: FlightListItem) {
    if (itemSchema.safeParse(item).success) {
      this.#items = [item, ...this.#items];
    }
  }

  get empty(): boolean {
    return this.#items.length === 0;
  }

  get items(): FlightListItem[] {
    return this.#items;
  }
}
