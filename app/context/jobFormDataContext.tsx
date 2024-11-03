'use client'

import React, { createContext, useContext, useState } from "react";

interface FormData {
    address: string;
    name: string;
    description:string;
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

export const JobFormDataProvider = ({children}: FormDataProviderProps): JSX.Element => {
    const [formData, setFormData] = useState<FormData>({
        address: "",
        name: "",
        description:""
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