import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";
import { Location } from "../models/location.model";
import { errorMessages } from "../../constants/errors.constants";

export class Truck extends Model {
    public id: number;
    public model: string;
    public licensePlate: string;
    public currentKm: number;
    public maximumLoadKg: number;
    public fuelType: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
}

Truck.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        model: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        licensePlate: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                name: errorMessages.truck.LICENCE_PLATE_UNIQUE_NAME,
                msg: errorMessages.truck.LICENCE_PLATE_UNIQUE_MESSAGE,
            },
            field: 'license_plate'
        },
        currentKm: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'current_km'
        },
        maximumLoadKg: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: 'maximum_load_kg'
        },
        fuelType: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'fuel_type'
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    },
    {
        tableName: "trucks",
        sequelize,
    }
);

Truck.hasMany(Location, {
    onDelete: 'cascade',
    foreignKey: 'truckId',
    as: 'locations'
});

Location.belongsTo(Truck, {
    foreignKey: 'truckId'
});