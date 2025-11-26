import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let server: App;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    server = app.getHttpServer();

    await app.init();
  });

  describe('/ GET', () => {
    it('first test', () => {
      return request(server).get('/').set('x-api-key', 'INVALIDss').expect(403);
    });
  });
});
