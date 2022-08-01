const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member"
    }
  },
  {
    timestamps: true
  }
);

schema.pre("save", function(next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = (password, done) =>
  bcrypt.compare(password, this.password, (err, isMatch) => done(err, isMatch));

module.exports = mongoose.model("users", schema);
