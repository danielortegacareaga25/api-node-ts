import Mongoose from "mongoose";

let database: Mongoose.Connection;

export const connect = () => {
  const uri = process.env.DB_HOST || "";

  if (database) return;

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  database = Mongoose.connection;

  database.once("open", async () => {
    console.log("Connect to database");
  });

  database.on("error", (error) => {
    console.log("Error connecting to database ", error);
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
