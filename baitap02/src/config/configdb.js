import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('baitap02', 'root', '@Thanh05052004', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Connection has been established successfully.');
  } catch (error) {
    console.error(' Unable to connect to the database:', error);
  }
};

export default connectDB;
