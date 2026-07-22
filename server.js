const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

const mongodb = require("./db/connect");
const recipeRoutes = require("./routes/recipes");
const categoryRoutes = require("./routes/categories");
const authRoutes = require("./routes/auth");
const swaggerDocument = require("./swagger-output.json");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    }
  })
);


app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, {
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Recipe API",
    documentation: "/api-docs",
    login: "/auth/github"
  });
});

app.use("/auth", authRoutes);
app.use("/recipes", recipeRoutes);
app.use("/categories", categoryRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use((error, req, res, next) => {
  console.error("Unhandled application error:", error);

  return res.status(500).json({
    error: "An unexpected server error occurred."
  });
});

mongodb
  .initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });