import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import dbConnect from "./config/dbConnect.js";
import "./config/passportConfig.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
dbConnect(); // connect server with data base using this function
const app = express();

// middle wares that are used
const corsOptions = {
  origin: ["http://localhost:3001"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: "true" }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialised: false,
    cookie: {
      maxAge: 6000 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
// routes
app.use("/api/auth", authRoutes);
//listen
const port = process.env.PORT || 7002;

app.listen(port, () => {
  console.log(`server is listenin on ${port}`);
});
