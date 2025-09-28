import { FC } from "react"
import StyledModal from "../../../../../../components/ui/styled-modal/styled-modal"
import { ICar } from "../../../../../../services/types/cars"

interface IInfoModal {
    open: boolean
    onClose: () => void
    data: ICar
}

const InfoModal: FC<IInfoModal> = (props) => {
    return (
        <StyledModal open={props.open} onClose={props.onClose}>

        </StyledModal>
    )
}

export default InfoModal