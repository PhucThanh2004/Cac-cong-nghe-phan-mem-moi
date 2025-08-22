import bcrypt from 'bcrypt'; // import thư viện bcryptjs
import db from '../models/index'; // import database
// import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10); // thuật toán hash password

let createNewUser = async (data) => { // hàm tạo user với tham số data
  return new Promise(async (resolve, reject) => { // dùng Promise đảm bảo luôn trả kết quả
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === '1' ? true : false,
        roleId: data.roleId
      });
      resolve('OK create a new user successfull');
      
      // console.log('data from service');
      // console.log(data); // log dữ liệu từ biến data
      // console.log(hashPasswordFromBcrypt);

    } catch (e) {
      reject(e);
    }
  });
}

// Hash user password function
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Use bcrypt.hashSync to hash the password with the salt
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

// Get all users (findAll)
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true, // return raw data without Sequelize metadata
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

// Get user info by ID (findOne)
let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => { // Use Promise to ensure async handling
    try {
      let user = await db.User.findOne({
        where: { id: userId }, // Query condition by userId
        raw: true // Return plain data without metadata
      });
      if (user) {
        resolve(user); // Return found user data
      } else {
        resolve([]); // Return empty array if no user found
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Hàm cập nhật user (PUT CRUD)
let updateUser = (data) => {
  return new Promise(async (resolve, reject) => { // Sử dụng Promise để đảm bảo xử lý bất đồng bộ
    try {
      let user = await db.User.findOne({
        where: { id: data.id } // Query điều kiện theo id
      });
      if (user) {
        // Cập nhật thông tin user
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save(); // Lưu lại thay đổi

        // Lấy danh sách tất cả user
        let allUsers = await db.User.findAll();
        resolve(allUsers); // Trả về danh sách user
      } else {
        resolve(); // Nếu không tìm thấy user trả về kết quả rỗng
      }
    } catch (e) {
      reject(e);
    }
  });
};

// hàm xóa user
let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => { // dùng Promise đảm bảo luôn trả kết quả
    try {
      let user = await db.User.findOne({
        where: { id: userId }
      });
      if (user) {
        await user.destroy(); // gọi destroy để xóa user
      }
      resolve(); // trả về kết quả (không có dữ liệu)
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { // xuất hàm ra bên ngoài
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUser: updateUser,
  deleteUserById: deleteUserById
};