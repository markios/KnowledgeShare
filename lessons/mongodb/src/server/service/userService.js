const { MongoClient, ObjectID } = require("mongodb");

const url = "mongodb://localhost:27017";

let connection;
const getUserDb = async () => {
  if (!connection) {
    connection = await MongoClient.connect(url);
  }
  const db = connection.db("users_db");
  return {
    collection: db.collection("users"),
  };
};

const AddUser = async ({ body }, res) => {
  const { collection } = await getUserDb();
  const result = await collection.insertOne(body);

  res.json({ ...body, id: result.insertedId });
};

const GetAllUsers = async (req, res) => {
  const { collection } = await getUserDb();
  const users = await collection.find().toArray();
  res.json({ info: { results: users.length }, results: users });
};

const FindUser = async (req, res) => {
  const { collection } = await getUserDb();
  const userId = req.params.id;
  const user = await collection.findOne({ _id: new ObjectID(userId) });
  if (!user) {
    const e = new Error("Not Found");
    e.status = 404;
    e.isInternal = true;
    throw e;
  } else {
    res.json(user);
  }
};

module.exports = {
  AddUser,
  GetAllUsers,
  FindUser,
};
