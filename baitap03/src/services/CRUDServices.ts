import bcrypt from "bcryptjs";
import db from "../models"; // models/index.ts
import { User } from "../models/user"; // import model User đã định nghĩa

const saltRounds = 10;
const hashUserPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};


// ========== Hàm tạo user mới ==========
export const createNewUser = async (data: any): Promise<string> => {
  try {
    const hashPasswordFromBcrypt = await hashUserPassword(data.password);

    await db.User.create({
      email: data.email,
      password: hashPasswordFromBcrypt,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === "1" ? true : false,
      roleId: data.roleId,
    });

    return "OK create a new user successful!";
  } catch (error) {
    throw error;
  }
};

// ========== Hàm lấy tất cả user ==========
export const getAllUser = async (): Promise<User[]> => {
  try {
    const users = await db.User.findAll({ raw: true });
    return users as User[];
  } catch (error) {
    throw error;
  }
};

// ========== Hàm lấy user theo Id ==========
export const getUserInfoById = async (userId: number): Promise<User | null> => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
      raw: true,
    });
    return user as User | null;
  } catch (error) {
    throw error;
  }
};

// ========== Hàm update user ==========
export const updateUser = async (data: any): Promise<User[]> => {
  try {
    const user = await db.User.findOne({ where: { id: data.id } });

    if (user) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      await user.save();
    }

    const allUsers = await db.User.findAll({ raw: true });
    return allUsers as User[];
  } catch (error) {
    throw error;
  }
};

// ========== Hàm delete user ==========
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    const user = await db.User.findOne({ where: { id: userId } });
    if (user) {
      await user.destroy();
    }
  } catch (error) {
    throw error;
  }
};