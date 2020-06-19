const json = require('./users.json');

const formatUser = ({ name, location }) => `${name.title} ${name.first} ${name.last} from ${location.city}`;
const fetchUser = (index) => formatUser(json.users[index]);

module.exports = {
  getUser: (id) => new Promise((resolve) => {
    setTimeout(() => resolve(fetchUser(id)), Math.random() * 7000)
  })
};