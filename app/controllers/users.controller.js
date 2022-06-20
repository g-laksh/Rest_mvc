const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
// Create and Save a new users
exports.create = (req, res) => {
   // Validate request
   if (!req.body.firstname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a user
  const users = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    location: req.body.location
  };
  // Save user in the database
  Users.create(users)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};
// Retrieve all users from the database.
exports.findAll = (req, res) => {
  const firstname = req.query.firstname;
  var condition = firstname ? {firstname: { [Op.iLike]: `%${firstname}%` } } : null;
  Users.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving  Users."
      });
    });
};
// Find a single users with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Users.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find  Users with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving  Users with id=" + id
      });
    });
};
// Update a users by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Users.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: " Users was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update  Users with id=${id}. Maybe users was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating  Users with id=" + id
        });
      });
};
// Delete a users with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Users.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: " Users was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete  Users with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete  Users with id=" + id
        });
      });
};
// Delete all users from the database.
exports.deleteAll = (req, res) => {
    Users.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums}  Users were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all  Users."
          });
        });
};

