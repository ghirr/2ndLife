var FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oidc');
const passport = require("passport");
const user =require('../models/User');



passport.use(new GoogleStrategy({
  clientID: "525979784040-7u3nncnf75rata4sr7o40hgcavk53l8h.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/auth/google/cb",
        passReqToCallback: true, // Include the 'req' object
},
(accessToken, refreshToken, profile, done) => {
  if (!profile || !profile.displayName || !profile.emails || profile.emails.length === 0) {
    // Handle the case where the profile data is incomplete
    return done(new Error("Invalid profile data"), false);
  }

  user.findOne({ googleid: profile.id })
    .then((currentUser) => {
      if (currentUser) {
        // User already exists, return the user profile
        return done(null, profile);
      } else {
        // Create a new user
        const newUser = new user({
          name: profile.displayName,
          googleid: profile.id,
          email: profile.emails[0].value,
        });

        newUser.save()
          .then((savedUser) => {
            console.log("User saved to DB:", savedUser);
            return done(null, profile); // Authentication is successful
          })
          .catch((error) => {
            console.error("Error saving user:", error);
            return done(error, false); // Authentication failed due to an error
          });
      }
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      return done(error, false); // Authentication failed due to an error
    });
}
)
);
passport.serializeUser((user, done) => {
  // Save the user's Google ID in the session
  done(null, user);
});

passport.deserializeUser((User, done) => {
  user.findOne({ googleid: User.id })
    .then((foundUser) => {
      done(null, foundUser);
    })
    .catch((error) => {
      done(error, null);
    });
});



/*
passport.use(
    new GoogleStrategy(
      {
        clientID: "525979784040-7u3nncnf75rata4sr7o40hgcavk53l8h.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/auth/google/cb",
        passReqToCallback: true, // Include the 'req' object
      },
       (accessToken, refreshToken, profile, done) => {
          console.log(profile);
            user.findOne({ googleid: profile.id }).then((currentUser) =>{
  
            if (currentUser) {
              done(null, profile);
            } else {
              const newUser = new user({
                name: profile.displayName,
                googleid: profile.id,
                email: (profile.emails && profile.emails[0]) ? profile.emails[0].value : '', // Check if emails is defined
              });
  
             newUser.save().then(() => console.log("user saved to DB."))
              done(null, profile); // Here, you can pass the profile directly to the client.
            }})
      }
    )
  );
 /* passport.use(new FacebookStrategy({
    clientID: "3516800161901887",
    clientSecret: "158aa72bcf11f270da188f48866d8a9c",
    callbackURL: '/auth/facebook/cb'
  },
  (accessToken, refreshToken, profile,done)=> {
   console.log(refreshToken);
   if (profile) {
     console.log("Profile is defined");
     console.log(profile);
   } else {
     console.log("Profile is undefined");
   }
 }
)
);
*/

/* passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    user.findById(id, (err, user) => {
      done(err, user);
    });
  });*/
  
  
  
