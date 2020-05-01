const data = require('../data/users.json')

module.exports = {
  getUsers: async (event, context, callback) => {
    const results = event.queryStringParameters.results || 20;
    const result = {
      info: { results },
      results: data.users.slice(0, results)
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  
    // callback(null, response);
  }
} 