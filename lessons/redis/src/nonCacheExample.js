const { getUser } = require('./userApi');
const [_, file, ...ids] = process.argv;

(async () => {
  const userRequests = ids.map(getUser);
  const users = await Promise.all(userRequests);
  console.log(users.join('\n'));
})()