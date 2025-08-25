import { Model, DataTypes, Optional, Sequelize } from "sequelize";

/** Kiểu dữ liệu User attributes (cột trong bảng) */
export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  gender?: boolean;
  image?: string;
  roleId?: string;
  positionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/** Các trường có thể null khi tạo (Sequelize tự thêm id, createdAt, updatedAt) */
export type UserCreationAttributes = Optional<UserAttributes, "id" | "createdAt" | "updatedAt">;

/** Lớp User kế thừa Sequelize Model */
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName?: string;
  public lastName?: string;
  public address?: string;
  public phoneNumber?: string;
  public gender?: boolean;
  public image?: string;
  public roleId?: string;
  public positionId?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /** Nơi định nghĩa quan hệ giữa các model */
  static associate(models: any) {
    // ví dụ: this.hasMany(models.Post, { foreignKey: "userId" });
  }

  /** Hàm khởi tạo model */
  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        firstName: {
          type: DataTypes.STRING,
        },
        lastName: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        phoneNumber: {
          type: DataTypes.STRING,
        },
        gender: {
          type: DataTypes.BOOLEAN,
        },
        image: {
          type: DataTypes.STRING,
        },
        roleId: {
          type: DataTypes.STRING,
        },
        positionId: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "Users", // map với bảng trong migration
        timestamps: true,   // tự động tạo createdAt, updatedAt
      }
    );
    return User;
  }
}