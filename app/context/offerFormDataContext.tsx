'use client'

import React, { createContext, useContext, useState } from "react";

interface FormData {
    listing_id: string;
    seller_username: string;
    seller_wallet:string;
    iban:string;
    payment_method: string;
    country: string;
    walletAddress: string;
    amount: number;
    price: string;
    autoAccept: boolean;
}

interface FormDataContextProps {
    formData: FormData;
    updateFormData: (newData: Partial<FormData>) => void;
}

const FormDataContext = createContext<FormDataContextProps | undefined>(undefined);

export const useFormData = (): FormDataContextProps => {
    const context = useContext(FormDataContext);
    if (!context) {
        throw new Error('useFormData must be used within a FormDataProvider');
    }
    return context;
}

interface FormDataProviderProps {
    children: React.ReactNode;
}

export const FormDataProvider = ({children}: FormDataProviderProps): JSX.Element => {
    const [formData, setFormData] = useState<FormData>({
        listing_id: '',
        seller_username: '',
        payment_method: '',
        seller_wallet:'',
        iban:'',
        country: '',
        walletAddress: '',
        amount: 0,
        price: '',
        autoAccept: false,
    })

    const updateFormData = (newData: Partial<FormData>) => {
        setFormData((prevData) => ({
            ...prevData,
            ...newData,
        }))
    }

    return (
        <FormDataContext.Provider value={{formData, updateFormData}}>
            {children}
        </FormDataContext.Provider>
    )
}