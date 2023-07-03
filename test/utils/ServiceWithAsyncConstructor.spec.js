const { Service } = require('../../src/utils/ServiceWithAsyncConstructor');
const { expect } = require('chai');

// To test this, first start the express mock server
// npm run start:mock
describe.skip('ServiceWithAsyncConstructor test', function () {
  this.timeout(10000);
  it('test', async () => {
    const service = new Service('http://localhost:1113'); // mocked express
    const userName = await service.getUserInfo('testUser');
    expect(userName).deep.equals({ name: 'testUser' });
  });
});
