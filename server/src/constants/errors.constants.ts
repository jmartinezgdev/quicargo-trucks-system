export const errorMessages = Object.freeze({
    truck: {
        TRUCK_NOT_FOUND: "Truck not found",
        LICENCE_PLATE_UNIQUE_MESSAGE: "Licence Plate already exist",
        LICENCE_PLATE_UNIQUE_NAME: "Licence Plate Constraint Error",
        MODEL_REQUIRED: "model is required",
        INVALID_YEAR: "Invalid year - should be an integer number in the range of 2000 and current year",
        LICENCE_PLATE_REQUIRED: "licencePlate is required",
        FUEL_TYPE_REQUIRED: "fuelType is required",
        INVALID_CURRENT_KM: "Invalid currentKm - must be positive number",
        INVALID_MAXIMUM_LOAD_KG: "Invalid maximumLoadKg - must be numeric"
       
    },
    location: {
        LOCATION_NOT_FOUND: "Location not found",
        TRUCK_NOT_FOUND: "Truck not found",
        LOCATION_EXIST: "Location for the required truck already exist",
        INVALID_TRUCK_ID: "Invalid truckId - must be positive integer number",
        INVALID_LATITUDE: "Invalid latitude - must be numeric",
        INVALID_LONGITUDE: "Invalid longitude - must be numeric",
        DATE_AND_TIME_REQUIRED: "dateAndTime is required",
        INVALID_LIMIT: "Invalid limit - should be positive integer"
    },
    common: {
        INVALID_ID: "Invalid Id - must be an integer number"
    }
})