import { filialLSName } from "../constants/localstorage"

export const setFilialToLocalStorage = (filialId: string | null) => {
    if (filialId)
        localStorage.setItem(filialLSName, filialId)
    else 
        localStorage.removeItem(filialLSName)
}

export const getFilialFromLocalStorage = () => {
    const value = localStorage.getItem(filialLSName)
    return value
}