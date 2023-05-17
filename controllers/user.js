const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { generateToken } = require("../utils/token");

// register
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //     const user = new User(req.body);
  //   user.save((err, user) => {
  //     if (err) {
  //       return res.status(400).json({
  //         err: "NOT able to save user in DB"
  //       });
  //     }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// login
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // const user=await User.findOne({email:email})

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("User not exist !! create account!!");
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });

    // console.log(generateToken('djvndsj'));
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// get user profile
exports.getUserProfile = asyncHandler(async (req, res) => {
  // req.user is a propert from middleware (current logedIn user)

  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("User NOt Found!!");
  }
});

// update profile
exports.updateUserProfile = asyncHandler(async (req, res) => {
  // req.user is a propert from middleware (current logedIn user)

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error("User NOt Found!!");
  }
});

// -----Admin----
exports.getAllUsersProfile = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.findByIdAndDelete(user._id);
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // user.name = user.name;
    // user.email = user.email;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // if (req.body.isAdmin) {
      user.isAdmin = req.body.isAdmin;
    // }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
