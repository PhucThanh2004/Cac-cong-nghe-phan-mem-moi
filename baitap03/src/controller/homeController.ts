import { Request, Response } from "express";
import db from "../models";              // models/index.ts (đã export sequelize + User)
import * as CRUDService from "../services/CRUDServices"; // CRUD service

// ========== GET HOME PAGE ==========
export const getHomePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await db.User.findAll();
    console.log("-----------------");
    console.log(data);
    console.log("-----------------");

    res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Lỗi server");
  }
};

// ========== GET ABOUT ==========
export const getAboutPage = (req: Request, res: Response): void => {
  res.render("test/about.ejs");
};

// ========== GET CRUD ==========
export const getCRUD = (req: Request, res: Response): void => {
  res.render("crud.ejs");
};

// ========== GET ALL USERS (CRUD) ==========
export const getFindAllCRUD = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await CRUDService.getAllUser();
    res.render("users/findallUser.ejs", {
      datalist: data,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Không lấy được dữ liệu");
  }
};

// ========== CREATE USER ==========
export const postCRUD = async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await CRUDService.createNewUser(req.body);
    console.log(message);
    res.send("post crud to server");
  } catch (e) {
    console.error(e);
    res.status(500).send("Lỗi khi tạo user");
  }
};

// ========== EDIT USER ==========
export const getEditCRUD = async (req: Request, res: Response): Promise<void> => {
  // Ép kiểu sang number
  const userId = Number(req.query.id);

  if (!isNaN(userId) && userId > 0) {
    try {
      const userData = await CRUDService.getUserInfoById(userId);

      if (userData) {
        res.render("users/editUser.ejs", {
          data: userData,
        });
      } else {
        res.status(404).send("Không tìm thấy user");
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Lỗi lấy dữ liệu user");
    }
  } else {
    res.status(400).send("Id không hợp lệ");
  }
};


// ========== UPDATE USER ==========
export const putCRUD = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const allUsers = await CRUDService.updateUser(data);
    res.render("users/findallUser.ejs", {
      datalist: allUsers,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Cập nhật thất bại");
  }
};

// ========== DELETE USER ==========
export const deleteCRUD = async (req: Request, res: Response): Promise<void> => {
  const userId = Number(req.query.id);

  if (!isNaN(userId) && userId > 0) {
    try {
      await CRUDService.deleteUser(userId);
      res.send("Deleted!!!");
    } catch (e) {console.error(e);
      res.status(500).send(" Lỗi xóa user");
    }
  } else {
    res.status(400).send(" Id không hợp lệ hoặc không tìm thấy user");
  }
};