export const errorMessages = Object.freeze({
    truck: {
        LICENCE_PLATE_EXIST: "Licence Plate already exist",
        LICENCE_PLATE_ERROR_NAME: "Licence Plate Constraint Error",
        MODEL_REQUIRED: "model is required",
        LICENCE_PLATE_REQUIRED: "licencePlate is required",
        FUEL_TYPE_REQUIRED: "fuelType is required",
        YEAR_INVALID: "Invalid year",
        CURRENT_KM_INVALID: "Invalid currentKm",
        MAXIMUM_LOAD_KG_INVALID: "Invalid maximumLoadKg"

    },
    location: {
        LOCATION_NOT_FOUND: "Location not found",
        LOCATION_EXIST: "Location for the required truck already exist",
        DATE_AND_TIME_REQUIRED: "dateAndTime is required",
        TRUCK_ID_INVALID: "Invalid truckId",
        LATITUDE_INVALID: "Invalid latitude",
        LONGITUDE_INVALID: "Invalid longitude",
        LIMIT_INVALID: "Invalid limit"
    },
    common: {
        ID_INVALID: "Invalid Id",
        TRUCK_NOT_FOUND: "Truck not found"
    }
})