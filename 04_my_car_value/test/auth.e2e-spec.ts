import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';


describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('handles signup request ', () => {
    const email = 'test@test.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password: 'password',
      })
      .expect(201)
      .then((response) => {
        expect(response.body.id).toBeDefined();
        expect(response.body.email).toEqual(email);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'qwert@yui.op';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email,
        password: 'password',
      })
      .expect(201);

    // 'supertest' agent does not handle cookie well, so we need to extract it manually
    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie) // attach the cookie to the request
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
