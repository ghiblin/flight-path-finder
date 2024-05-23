import { FlightSearchService } from './flight-search.service';

describe('FlightSearchService', () => {
  describe('searchPath', () => {
    let service: FlightSearchService;
    beforeEach(() => {
      service = new FlightSearchService();
    });

    it('fails for an invalid list', () => {
      // Arrange
      const items = 'not a list';

      // Act
      const result = service.searchPath(items);

      // Assert
      expect(result.isErr()).toBe(true);
    });

    it('fails for an empty list', () => {
      // Arrange
      const items = [];

      // Act
      const result = service.searchPath(items);

      // Assert
      expect(result.isErr()).toBe(true);
    });

    it('returns the intial departure and final destination', () => {
      // Arrange
      const listOfItems = [
        [['SFO', 'EWR']],
        [
          ['ATL', 'EWR'],
          ['SFO', 'ATL'],
        ],
        [
          ['IND', 'EWR'],
          ['SFO', 'ATL'],
          ['GSO', 'IND'],
          ['ATL', 'GSO'],
        ],
      ];

      for (const items of listOfItems) {
        // Act
        const result = service.searchPath(items);

        // Assert
        expect(result.unwrap()).toEqual(['SFO', 'EWR']);
      }
    });
  });
});
