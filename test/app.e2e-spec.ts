import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/flights', () => {
    describe('POST /search-path', () => {
      test.each(['this is not a list', {}, []])(
        'returns an error for an ivalid list (%s)',
        (body) => {
          return request(app.getHttpServer())
            .post('/flights/search-path')
            .send(body)
            .expect(400);
        },
      );

      test.each([
        { items: [['SFO', 'EWR']] },
        {
          items: [
            ['ATL', 'EWR'],
            ['SFO', 'ATL'],
          ],
        },
        {
          items: [
            ['IND', 'EWR'],
            ['SFO', 'ATL'],
            ['GSO', 'IND'],
            ['ATL', 'GSO'],
          ],
        },
      ])('returns the right path (%s)', (body) => {
        return request(app.getHttpServer())
          .post('/flights/search-path')
          .send(body.items)
          .expect(200, { path: ['SFO', 'EWR'] });
      });
    });
  });
});
