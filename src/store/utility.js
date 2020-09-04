export const updateObject =(oldObject,updatedProerties) =>{
    return {
        ...oldObject,
        ...updatedProerties
    };
};