const Auth = require('../../src/lib/Auth');
const Faker = require('faker');

async function userFactory({
  username = Faker.name.firstName(),
  password = 'asdasd',
  email = Faker.internet.email(),
  permissions = 2,
  active = true,
} = {}) {
  const hashedPassword = await Auth.hashPassword(password);

  return {
    data: {
      username,
      password: hashedPassword,
      email,
      permissions,
      active,
    },
  };
}

async function buildUsers(amount = 1) {
  let data = [];

  const adminUser = await userFactory({
    username: 'admin',
    permissions: 10,
  });

  data.push(adminUser);

  for (let i = 0; i < amount; i++) {
    data.push(await userFactory());
  }

  return data;
}

module.exports = { buildUsers };
