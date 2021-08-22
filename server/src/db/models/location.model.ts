import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";

export class Location extends Model {
  public id: number;
  public truckId: number;
  public latitude: number;
  public longitude: number;
  public dateAndTime: Date;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    truckId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'truck_id'
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dateAndTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'date_and_time'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
  },
  {
    tableName: "locations",
    sequelize,
    indexes: [
      {
        unique: true,
        fields: ['truckId', 'latitude', 'longitude']
      }
    ]
  }
);
