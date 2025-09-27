import { FC, useEffect, useRef, useState } from "react"
import DefaultInput from "../../../../../../../../components/ui/default-input/default-input"

interface ITitleInput {
    value: string
    onSubmit: (s: string) => void
    onClose: () => void
}

const TitleInput: FC<ITitleInput> = ({value, onClose, onSubmit}) => {
    const [name, setName] = useState(value)
    const ref: React.Ref<HTMLInputElement> = useRef(null)

    const getName = () => {
        return name
    }

    const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Escape") {
            onClose()
        }
        if (e.key === 'Enter') {
            onSubmit(getName())
        }
    }

    useEffect(() => {
        ref.current?.focus()
    }, [])

    return (
        <DefaultInput 
            value={name}
            ref={ref} 
            onBlur={() => onSubmit(name)}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleOnKeyDown}
        />
    )
}

export default TitleInput