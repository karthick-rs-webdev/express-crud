const User = require("../modal/user");

const createNewUser = (payload) => {
  const user = new User({
    name: payload.name,
    email: payload.email,
    gender: payload.gender,
    status: payload.status,
  });

  return user
    .save()
    .then((data) => ({ userData: data, err: false }))
    .catch((err) => ({ err: true, message: err.message || "Error Occured" }));
};

module.exports = { createNewUser };
