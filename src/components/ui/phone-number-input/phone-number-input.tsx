import { FC } from 'react'
import InputWithLabel from '../input-with-label/input-with-label'

interface IPhoneNumberInput {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    label: string
}

const possibleSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const PhoneNumberInput: FC<IPhoneNumberInput> = (props) => {
    const getSymbol = (s: string, n: number) => {
        if (possibleSymbols.some(el => el === s[n])) return s[n]
        return '_'
    }
    const getStringFromValue = () => {
        return '+7(' + getSymbol(props.value, 0) + getSymbol(props.value, 1) + getSymbol(props.value, 2) + ')' 
            + getSymbol(props.value, 3) + getSymbol(props.value, 4) + getSymbol(props.value, 5) + '-'
            + getSymbol(props.value, 6) + getSymbol(props.value, 7) + '-'
            + getSymbol(props.value, 8) + getSymbol(props.value, 9)
    }
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (/^\d$/.test(e.key)) {
            props.setValue(prev => {
                if (prev.length === 0) return e.key
                if (prev.length >= 10) return prev.slice(0, 10)
                return prev + e.key
            })
        } else if (e.key === "Backspace") {
            props.setValue(prev => {
                if (prev.length === 0) return ''
                if (prev.length === 1) return ''
                return prev.slice(0, prev.length - 1)
            })
        }
    }
    return (
        <InputWithLabel label={props.label} value={getStringFromValue()} onKeyDown={(handleKeyDown)}/>
    )
}

export default PhoneNumberInput