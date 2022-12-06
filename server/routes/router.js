const express = require("express");
const route = express.Router();
const User = require("../modal/user");
const { createNewUser } = require("../controller/user");

route.get("/", async(req, res) => {
  try {
    const users = await User.find()
    res.render("index", { users });
  } catch (error) {
    res.send(error);
  }
});

route.get("/add-user", (req, res) => {
  res.render("add_user");
});

route.post("/create-new-user", async(req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid Request",
    });
    return;
  }
  const user = await createNewUser(req.body);
  if(!user.err){
    res.redirect('/');
  }
  else{
    res.status(500).send({message: user.message})
  }
})

route.get("/edit-user", (req, res) => {
  User.findById(req.query.id).then(user => res.render("edit_user", { user })).catch(err => res.send(err));
});

route.post("/update-user-data", (req, res) => {
  if (!req.body) {
    res.send({ message: "Invalid Input" });
    return;
  }
  User.findByIdAndUpdate(req.body.id, req.body, { new: true })
    .then((data) => {
      if (!data)
        res.send({ message: `user not found with id- ${req.body.id}` });
      else res.redirect("/");
    })
    .catch((err) => res.send(err));
});

route.post("/create-user", async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid Request",
    });
    return;
  }
  const user = await createNewUser(req.body);
  if(!user.err){
    res.status(200).send({user: user.userData, message: "User Created"});
  }
  else{
    res.status(500).send({message: user.message})
  }
});

route.get("/get-users", (req, res) => {
  const getUserFn = () =>
    req.query.id
      ? User.findById(req.query.id).then((user) =>
          user
            ? res.send(user)
            : res
                .status(404)
                .send({ message: `user not found with id- ${req.params.id}` })
        )
      : User.find().then((users) => res.send(users));
  getUserFn().catch((err) =>
    res.status(500).send({ message: err.message || "Error Occured" })
  );
});

route.put("/update-user/:id", (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Invalid Input" });
    return;
  }
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: `user not found with id- ${req.params.id}` });
      else res.send(data);
    })
    .catch((err) =>
      res.status(500).send({ message: err.message || "error occured" })
    );
});

route.delete("/delete-user/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: `user not found with id- ${req.params.id}` });
      else
        res.send({
          data,
          message: "User Deleted",
        });
    })
    .catch((err) =>
      res.status(500).send({ message: err.message || "Error Occured" })
    );
});

module.exports = route;
