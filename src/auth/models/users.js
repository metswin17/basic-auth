'use strict';

const bcrypt = require('bcrypt');

const userModel = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.prototype.authenticate = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;  

};
    
module.exports = userModel;