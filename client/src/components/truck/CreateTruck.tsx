import React from 'react';
import FormTruck  from './FormTruck';

export const CreateTruck: React.FC = () => {
    return (
        <>
            <h1 className="text-xl font-semibold text-center p-5">Create Truck</h1>
            <FormTruck/>
        </>
    );
}
