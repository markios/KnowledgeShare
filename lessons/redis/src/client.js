const redis = require('redis');
const client = redis.createClient();

module.exports = {
  get: (id, expires) => new Promise((resolve, reject) => {
    client.get(id, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  }),
  set: (id, val) => new Promise((resolve, reject) => {
    client.set(id, val, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
};