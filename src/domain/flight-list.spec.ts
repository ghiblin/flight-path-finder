import { FlightList } from './flight-list';

describe('FlightList', () => {
  describe('parse', () => {
    test.each([
      [
        'valid flight list',
        [
          ['IND', 'EWR'],
          ['SFO', 'ATL'],
          ['GSO', 'IND'],
          ['ATL', 'GSO'],
        ],
      ],
      ['empty list', []],
    ])('parses %s', (_, data) => {
      // Arrange

      // Act
      const result = FlightList.parse(data);

      // Assert
      expect(result.isOk()).toBe(true);
    });

    test.each([
      ['null value', null],
      ['few item elements', [['IND']]],
      ['too much item eleemnts', [['IND', 'EWR', 'SFO']]],
      ['item too short', ['IN', 'EWR']],
      ['item too long', ['IND', 'EWRT']],
    ])('rejects %s', (_, data) => {
      // Arrange

      // Act
      const result = FlightList.parse(data);

      // Assert
      expect(result.isErr()).toBe(true);
    });
  });

  describe('sort', () => {
    test.each([
      ['an empty list', [], []],
      ['a single element list', [['IND', 'EWR']], [['IND', 'EWR']]],
      [
        'a list of flight',
        [
          ['IND', 'EWR'],
          ['SFO', 'ATL'],
          ['GSO', 'IND'],
          ['ATL', 'GSO'],
        ],
        [
          ['SFO', 'ATL'],
          ['ATL', 'GSO'],
          ['GSO', 'IND'],
          ['IND', 'EWR'],
        ],
      ],
      [
        'a sorted list',
        [
          ['SFO', 'ATL'],
          ['ATL', 'GSO'],
          ['GSO', 'IND'],
          ['IND', 'EWR'],
        ],
        [
          ['SFO', 'ATL'],
          ['ATL', 'GSO'],
          ['GSO', 'IND'],
          ['IND', 'EWR'],
        ],
      ],
    ])('sorts %s', (_, data, expected) => {
      // Arrange
      const result = FlightList.parse(data);
      const list = result.unwrap();

      // Act
      const sorted = list.sort();

      // Assert
      // expect(sorted.isOk()).toBe(true);
      expect(sorted.unwrap().items).toEqual(expected);
    });

    it('rejects an incomplete list', () => {
      // Arrange
      const list = FlightList.parse([
        ['IND', 'EWR'],
        ['SFO', 'ATL'],
        ['ATL', 'GSO'],
      ]).unwrap();

      // Act
      const result = list.sort();

      // Assert
      expect(result.isErr()).toBeTruthy();
    });
  });
});
