const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"]
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/failure"
  }),
  (req, res) => {
    res.redirect("/api-docs");
  }
);

router.get("/failure", (req, res) => {
  res.status(401).json({
    error: "GitHub authentication failed."
  });
});

router.get("/status", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      authenticated: false
    });
  }

  return res.status(200).json({
    authenticated: true,
    user: {
      username: req.user.username,
      displayName: req.user.displayName
    }
  });
});

router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    return res.status(200).json({
      message: "Logged out successfully."
    });
  });
});

module.exports = router;