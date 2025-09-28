import { filialLSName } from "../constants/localstorage"

export const setFilialToLocalStorage = (filialId: number) => {
    localStorage.setItem(filialLSName, filialId?.toString())
}

export const getFilialFromLocalStorage = () => {
    const value = localStorage.getItem(filialLSName)
    if (value === null) return null
    return Number(value)
}

export const getStringFilialFromLocalStorage = () => {
    const value = localStorage.getItem(filialLSName)
    if (value === null) return null
    return value
}