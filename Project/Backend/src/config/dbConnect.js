import { connect } from "mongoose";

const dbConnect = async () => {
  try {
    const mongoDbConnection = await connect(process.env.MONGODB_);
    console.log(`database connection: ${mongoDbConnection.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to Mongo${error}`);
    process.exit(1);
  }
};

export default dbConnect;
