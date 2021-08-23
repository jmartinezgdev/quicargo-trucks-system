
CREATE DATABASE quicargo;

CREATE TABLE IF NOT EXISTS trucks(
    id serial PRIMARY KEY,
    model VARCHAR (50) NOT NULL,
    license_plate VARCHAR (50) UNIQUE NOT NULL,
    current_km FLOAT NOT NULL,
    maximum_load_kg FLOAT NOT NULL,
    fuel_type VARCHAR (50) NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS locations(
    id serial PRIMARY KEY,
    truck_id INTEGER NOT NULL REFERENCES trucks(id) ON DELETE CASCADE ON UPDATE CASCADE,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    date_and_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE (truck_id, latitude, longitude, date_and_time)
);