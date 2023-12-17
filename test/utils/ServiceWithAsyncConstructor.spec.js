const { Service } = require('../../src/utils/ServiceWithAsyncConstructor');
import { expect, describe, it } from 'vitest';

// To test this, first start the express mock server
// npm run start:mock
describe.skip('ServiceWithAsyncConstructor test', function () {
  it('test', async () => {
    const service = new Service('http://localhost:1113'); // mocked express
    const userName = await service.getUserInfo('testUser');
    expect(userName).deep.equals({ name: 'testUser' });
  }, 10000);
});
