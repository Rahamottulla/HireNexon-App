// backend/config/passport.js
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import MicrosoftStrategy from "passport-microsoft";
import jwt from "jsonwebtoken";
import User from "../features/user/user.model.js";
import dotenv from "dotenv";
dotenv.config();

// Google Auth Strategy
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/social/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        let user = await User.findOne({ email });

        // If user doesn't exist, create new one
        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email,
            password: "OAuthUser123!", // dummy password (hashed automatically)
            isVerified: true,
          });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });

        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Microsoft Auth Strategy
passport.use(
  new MicrosoftStrategy.Strategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/social/microsoft/callback`,
      scope: ["user.read"],
      tenant: "common",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            username: profile.displayName || "Microsoft User",
            email,
            password: "OAuthUser123!",
            isVerified: true,
          });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });

        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize and deserialize user for session
passport.serializeUser((data, done) => {
  done(null, data);
});

passport.deserializeUser((data, done) => {
  done(null, data);
});
