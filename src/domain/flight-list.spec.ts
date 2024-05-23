import { FligthList } from './flight-list';

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
    ])('parse %s', (_, data) => {
      // Arrange

      // Act
      const result = FligthList.parse(data);

      // Assert
      expect(result.isOk()).toBe(true);
    });

    test.each([
      ['null value', null],
      ['few item elements', [['IND']]],
      ['too much item eleemnts', [['IND', 'EWR', 'SFO']]],
      ['item too short', ['IN', 'EWR']],
      ['item too long', ['IND', 'EWRT']],
    ])('rejecct %s', (_, data) => {
      // Arrange

      // Act
      const result = FligthList.parse(data);

      // Assert
      expect(result.isErr()).toBe(true);
    });
  });
});
