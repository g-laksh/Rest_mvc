module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      
    });
    return Users;
  };