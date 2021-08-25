# Quicargo Truck System

App that allow to register Trucks and their locations.

## Server App

## Installation

Step 1:

```sh
git clone https://github.com/jmartinezgdev/quicargo-trucks-system.git

```

Step 2:

- Start a PostgreSql Server and create the quicargo database and tables -> code located in src/db/db.sql

- Update if is necessary the credentials used to connect to the local db in src/db/config.ts

- Next, run the following commands to start the server:

```sh
cd server
npm install
gulp start

```

**Navigate** to `localhost:3000/api/v1/trucks and localhost:3000/api/v1/locations` to see the API.

This API currently provides Trucks `/trucks` and Locations `/locations` resources.

## Usage Examples

The following examples use a base URL of `http://localhost:3000/api/v1`, which is the default development server for The App.

You can use the postman collection `Quicargo Api Postman Collection.postman_collection.json`

**Trucks:**

**GET /trucks**

Retrieve all trucks:

```sh
curl http://localhost:3000/api/v1/trucks
```

Example Response

```sh
    [
        {
            "id": 1,
            "model": "Toyota",
            "year": 2020,
            "licensePlate": "PLG455",
            "currentKm": 1,
            "maximumLoadKg": 2,
            "fuelType": "Gasoline",
            "createdAt": "2021-08-25T06:36:58.762Z",
            "updatedAt": "2021-08-25T06:36:58.762Z"
        }
    ]
```

**GET /trucks/{id}**

Retrieve a truck:

```sh
curl http://localhost:3000/trucks/1
```

**POST /trucks**

Create a Truck:

```sh
curl -H "Content-Type: application/json" -d '{"model":"Toyota", "year":2020,"licensePlate":PLG455, "currentKm":1, "maximumLoadKg":2, "fuelType":"Gasoline" }' http://localhost:3000/trucks
```

**PUT /trucks/{id}**

Update a truck:

```sh
curl -H "Content-Type: application/json" -X PUT -d '{"model":"Ford"}' http://localhost:3000/trucks/1
```

**DELETE /truck/{id}**

Delete a truck:

```sh
curl -X DELETE http://localhost:3000/trucks/1
```

**Locations:**

**GET /locations**

Retrieve all locations:

```sh
curl http://localhost:3000/api/v1/trucks
```

Example Response

```sh
    [
        
        {
            "id": 1,
            "truckId": 1,
            "latitude": 21.521757,
            "longitude": -77.781166,
            "dateAndTime": "2021-08-25T06:39:00.879Z",
            "createdAt": "2021-08-25T06:39:00.885Z",
            "updatedAt": "2021-08-25T06:39:00.885Z"
        }
    ]
```

**GET /locations/{id}**

Retrieve a location:

```sh
curl http://localhost:3000/location/1
```

**POST /locations**

Create a Location:

```sh
curl -H "Content-Type: application/json" -d '{"truckId":1, "latitude":21.521757,"licensePlate":PLG455, "longitude":longitude, "dateAndTime":2}' http://localhost:3000/locations
```

**GET /locations/{truckId}**

Retrieve all Locations by truckId, optionally accept a limit of results `locations?limit=5` always return the last locations.

```sh
curl http://localhost:3000/location/1
```

**DELETE /location/{id}**

Delete a Location:

```sh
curl -X DELETE http://localhost:3000/locations/1
```

## Clent App

## Installation

```sh
cd client
npm install
npm start
```

