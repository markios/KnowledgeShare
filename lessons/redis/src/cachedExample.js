const { getUser } = require('./userApi');
const cache = require('./cache');
const [_, file, ...ids] = process.argv;

const cachedGetUser = cache(getUser);

(async () => {
  const userRequests = ids.map(cachedGetUser);
  const users = await Promise.all(userRequests);
  console.log(users.join('\n'));
})()