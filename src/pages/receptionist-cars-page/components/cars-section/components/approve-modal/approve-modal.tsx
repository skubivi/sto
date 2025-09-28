import { FC } from "react"
import StyledModal from "../../../../../../components/ui/styled-modal/styled-modal"
import { ICar } from "../../../../../../services/types/cars"

interface IApproveModal {
    open: boolean
    onClose: () => void
    data: ICar
}

const ApproveModal: FC<IApproveModal> = (props) => {
    return (
        <StyledModal open={props.open} onClose={props.onClose}>

        </StyledModal>
    )
}

export default ApproveModal