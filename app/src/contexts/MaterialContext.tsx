import React, { createContext, useState, PropsWithChildren, useEffect } from 'react';
import { GptClassification } from '../BoundingBoxResult';

type CurrentObjectType = null | GptClassification

type MaterialContextType = {
    currentObjectInfo: CurrentObjectType
    setCurrentObjectInfo: React.Dispatch<React.SetStateAction<CurrentObjectType>>
};

const MaterialContext = createContext<MaterialContextType | null>(null);

export const MaterialProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [currentObjectInfo, setCurrentObjectInfo] = useState<CurrentObjectType>(null);

    useEffect(() => {
        console.log("curre", currentObjectInfo)
    }, [currentObjectInfo])


    return (
        <MaterialContext.Provider
            value={{
                currentObjectInfo,
                setCurrentObjectInfo
            }}
        >
            {children}
        </MaterialContext.Provider>
    );
};

export default MaterialContext;