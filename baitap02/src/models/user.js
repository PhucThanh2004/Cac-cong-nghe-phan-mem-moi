'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Khai báo các mối quan hệ (association) với model khác
     */
    static associate(models) {
      // Ví dụ: User có nhiều bài viết (Post)
      // User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });

      // Ví dụ: User thuộc về một Role
      // User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
    }
  }

  // Định nghĩa các trường trong bảng User
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
