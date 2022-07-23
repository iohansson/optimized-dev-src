import { Sequelize, Model, InferAttributes, InferCreationAttributes, DataTypes } from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {},
  },
});

export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
  declare guid: string;
  declare title: string;
  declare link: string;
  declare pubDate: string;
  declare comments: string;
  declare feedTitle: string;
  declare feedURL: string;
}

Item.init({
  guid: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  link: {
    type: DataTypes.STRING,
  },
  pubDate: {
    type: DataTypes.STRING,
  },
  comments: {
    type: DataTypes.STRING,
  },
  feedTitle: {
    type: DataTypes.STRING,
  },
  feedURL: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  tableName: 'items',
  timestamps: false,
  indexes: [
    {
      fields: ['pubDate'],
    },
  ],
});

export const db = async () => {
  await sequelize.sync();

  return {
    items: Item,
  };
};
