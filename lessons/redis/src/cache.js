const { get, set } = require('./client');

const cache = (fn) => async (id) => {
  try {
    const result = await get(`ID_${id}`);
  
    if (result) {
      console.log('cache hit');
      return result;
    } else {
      const result = await fn(id);
      await set(`ID_${id}`, result);
      console.log('adding to cache');
      return result;
    }
  } catch(e) {
    throw new Error(e);
  }
}

module.exports = cache;