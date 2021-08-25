export const ERRORS = Object.freeze({
    truck: {
        MODEL_REQUIRED: "Model is required",
        LICENCE_PLATE_REQUIRED: "Licence Plate is required",
        FUEL_TYPE_REQUIRED: "Fuel Type is required",
        CURRENT_KM_INVALID: "Invalid Current Kilometers",
        MAXIMUM_LOAD_KG_INVALID: "Invalid Maximum Load (Kg)",
        YEAR_INVALID: "Invalid Year - should be in the range of 1900 and the current year",
    },
    location: {
        LATITUDE_INVALID: "Invalid Latitude",
        LONGITUDE_INVALID: "Invalid Longitude"
    },
    common: {
        PAGE_NOT_FOUND: "Page not Found"
    }
});