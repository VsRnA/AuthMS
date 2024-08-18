import { expect, vi, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { natsTransportMock } from '#infrastructure/transports/nats/mock';
import User from '#app/user/models/user';
import '#app/user/handler/create';

const request = {
  payload: {
    name: faker.animal.bear(),
    email: faker.internet.email(),
    imageGuid: faker.string.uuid(),
    role: 'user',
    metadata: {},
  },
};

vi.mock('#infrastructure/transports/nats/natsTransport', async () => ({ default: natsTransportMock }));

vi.mock('#app/user/models/user', () => ({
  default: {
    create: vi.fn(async (data) => ({
      ...data,
      id: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    })),
    findOne: vi.fn(async (data) => {
      if (data.where.email === 'admin@ya.ru') {
        return {
          ...request.payload,
          id: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        };
      }
      return null;
    }),
  },
}));

const handler = natsTransportMock.findHandler.request('user.user.v1.create');

test('Request validation', async () => {
  await expect(handler?.validateRequest(request), 'Test request').resolves.toBe(true);
  await expect(handler?.validateRequest(request), 'Minimal object').resolves.toBe(true);
  await expect(handler?.validateRequest({
    payload: {
      email: faker.internet.email(),
      imageGuid: faker.string.uuid(),
      role: 'user',
      metadata: {},
    },
  })).rejects.toThrow('Request validation fail. Payload: must have required property \'name\'.');
  await expect(handler?.validateRequest({
    payload: {
      name: 1,
      email: faker.internet.email(),
      imageGuid: faker.string.uuid(),
      role: 'user',
      metadata: {},
    },
  })).rejects.toThrow('Request validation fail. Payload: \'name\' must be string.');
  await expect(handler?.validateRequest({
    payload: {
      name: '',
      email: faker.internet.email(),
      imageGuid: faker.string.uuid(),
      role: 'user',
      metadata: {},
    },
  })).rejects.toThrow('Request validation fail. Payload: \'name\' must NOT have fewer than 1 characters.');
  await expect(handler?.validateRequest({
    payload: {
      name: faker.animal.bear(),
      imageGuid: faker.string.uuid(),
      role: 'user',
      metadata: {},
    },
  })).rejects.toThrow('Request validation fail. Payload: must have required property \'email\'.');
  await expect(handler?.validateRequest({
    payload: {
      name: faker.animal.bear(),
      email: 1,
      imageGuid: faker.string.uuid(),
      role: 'user',
      metadata: {},
    },
  })).rejects.toThrow('Request validation fail. Payload: \'email\' must be string.');
  await expect(handler?.validateRequest({
    payload: {
      name: faker.animal.bear(),
      email: '123123',
      imageGuid: faker.string.uuid(),
      role: 'user',
      metadata: {},
    },
  })).rejects.toThrow('Request validation fail. Payload: \'email\' must match format "email".');
  await expect(handler?.validateRequest({
    payload: {
      name: faker.animal.bear(),
      email: faker.internet.email(),
      role: 'user',
      metadata: {},
    },
  })).rejects.toThrow('Request validation fail. Payload: must have required property \'imageGuid\'.');
  await expect(handler?.validateRequest({
    payload: {
      name: faker.animal.bear(),
      email: faker.internet.email(),
      imageGuid: 1,
      role: 'user',
      metadata: {},
    },
  })).rejects.toThrow('Request validation fail. Payload: \'imageGuid\' must be string.');
  await expect(handler?.validateRequest({
    payload: {
      name: faker.animal.bear(),
      email: faker.internet.email(),
      imageGuid: '123124',
      role: 'user',
      metadata: {},
    },
  })).rejects.toThrow('Request validation fail. Payload: \'imageGuid\' must match format "uuid".');
  await expect(handler?.validateRequest({
    payload: {
      name: faker.animal.bear(),
      email: faker.internet.email(),
      imageGuid: faker.string.uuid(),
      metadata: {},
    },
  })).rejects.toThrow('Request validation fail. Payload: must have required property \'role\'.');
  await expect(handler?.validateRequest({
    payload: {
      name: faker.animal.bear(),
      email: faker.internet.email(),
      imageGuid: faker.string.uuid(),
      role: 1,
      metadata: {},
    },
  })).rejects.toThrow('Request validation fail. Payload: \'role\' must be equal to one of the allowed values.');
  await expect(handler?.validateRequest({
    payload: {
      name: faker.animal.bear(),
      email: faker.internet.email(),
      imageGuid: faker.string.uuid(),
      role: 'user',
    },
  })).rejects.toThrow('Request validation fail. Payload: must have required property \'metadata\'.');
});

test('Handler logic', async () => {
  const response = await handler?.run(request);
  expect(User.findOne).toHaveBeenCalled();
  expect(User.create).toHaveBeenCalled();
  await expect(handler?.validateResponse(response)).resolves.toBe(true);
});

test('User already existed', async () => {
  await expect(handler?.run({
    payload: {
      name: faker.animal.bear(),
      email: 'admin@ya.ru',
      imageGuid: faker.string.uuid(),
      role: 'user',
      metadata: {},
    },
  })).rejects.toThrowError('User already existed');
});
