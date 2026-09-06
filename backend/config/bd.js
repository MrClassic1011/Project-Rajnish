import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://pravinubale497_db_user:lFFZLZTywsQOO6Lm@cluster0.glbhw5l.mongodb.net/Expense",
    )
    .then(() => console.log("MongoDB connected successfully"));
};
