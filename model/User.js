const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "First Name is Required",
    max: 10,
  },
  lastName: {
    type: String,
    required: "Last Name is Required",
    max: 10,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    max: 10,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  age: {
    type: Number,
    required: "Age is required",
  },
  phoneNumber: {
    type: Number,
    required: "Phone Number is required",
    max: 10,
  },
  password: {
    type: String,
    required: "Password is required",
    min: 6,
    select: false
  },
  area: {
    type: String,
    required: "area is required",
  },
  address: {
    type: String,
    required: "address is required",
    max: 300,
  },
  vehicleType: {
    type: String,
    required: "Vehicle Type is required",
    max: 4,
  },
  fee: {
    type: Number,
    required: "Fee is required",
    max: 4,
  },
  vehicleInfo: {
    type: String,
    required: "Vehicle Info is required",
    max: 4,
  },
  licenseNumber: {
    type: String,
    required: "Fee is required",
    max: 15,
  },
  drivingLicense: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },
  nid: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },
  profilePicture: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },
  role: {
    type: String,
    default: "rider",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Encrypting password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}

// Return JWT token
userSchema.methods.getJwt = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

module.exports = mongoose.model("User", userSchema);
