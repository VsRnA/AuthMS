import { Model, InferAttributes, InferCreationAttributes, DataTypes,
  Attributes, CreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '#infrastructure/db/sequelize';

export type UserAttributes = Attributes<User>;
export type UserCreationAttributes = CreationAttributes<User>;

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  /** ID пользователя */
  declare guid: CreationOptional<string>;
  /** Почта пользователя */
  declare email: string;
  /** Имя пользователя */
  declare name: string;
  /** GUID аватарки */
  declare imageGuid: string | null;
  /** Роль */
  declare role: 'user'| 'admin';
  /** Пароль */
  declare password: string;
  /** Данные внешних сервисов */
  declare metadata: Record<string, any>;
  /** Дата создания */
  declare createdAt: CreationOptional<string>;
  /** Дата обновления */
  declare updatedAt: CreationOptional<string>;
  /** Дата софт-удаления */
  declare deletedAt: CreationOptional<string | null>;
}

User.init({
  guid: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  imageGuid: {
    type: DataTypes.UUID,
    defaultValue: null,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: null,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
}, {
  sequelize,
  tableName: 'users',
  modelName: 'user',
  paranoid: true,
});
