import { filialLSName } from "../constants/localstorage"

export const setFilialToLocalStorage = (filialId: string) => {
    console.log(`MyFilial: ${filialId}`)
    localStorage.setItem(filialLSName, filialId)
}

export const getFilialFromLocalStorage = () => {
    const value = localStorage.getItem(filialLSName)
    return value
}