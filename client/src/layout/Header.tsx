import React from 'react';
import logo from './../logo.png'
import { Link } from 'react-router-dom'
import { LABELS } from '../constants';

export const Header: React.FC = () => {
    return (
        <header className="bg-quicargo-primary p-3 sticky top-0">
            <div className="container mx-auto max-w-screen-xl">
                <div className="grid grid-cols-2">
                    <Link to="/"><img src={logo} alt="Quicargo" /></Link>
                    <div className="flex justify-end items-center">
                        <Link className="form-btn" to="/create-truck">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                            </svg>
                            <span className="pl-1">{LABELS.truck.CREATE_TRUCK}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

