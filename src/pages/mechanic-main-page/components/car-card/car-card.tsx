import { FC } from "react"
import { ICarForMechanic } from "../../../../services/types/cars"

import styles from './style.module.scss'
import Typography from "../../../../components/ui/typography/typography"
import DefaultButton from "../../../../components/ui/default-button/default-button"
import { EDiagnostic } from "../../../../services/types/documents"

interface ICarCard {
    data: ICarForMechanic
    setType: (t: EDiagnostic) => void
    onClick: () => void
}

const CarCard: FC<ICarCard> = (props) => {
    const handleClickDiag = () => {
        props.setType(EDiagnostic.Metalworker)
        props.onClick()
    }
    const handleClickElectro = () => {
        props.setType(EDiagnostic.Electric)
        props.onClick()
    }
    const handleClickFree = () => {
        props.setType(EDiagnostic.Free)
        props.onClick()
    }
    return (
        <div className={styles.card}>
            <div className={styles.title}>
                <Typography variant="body" color="secondary">Номер машины:</Typography>
                <Typography variant="body" color="white">{props.data.carNumber}</Typography>
            </div>
            <div className={styles.buttons}>
                <DefaultButton variant="outline-primary" onClick={handleClickDiag}>Провести диагностику</DefaultButton>
                <DefaultButton variant="outline-primary" onClick={handleClickElectro}>Провести электродиагностику</DefaultButton>
                <DefaultButton variant="outline-primary" onClick={handleClickFree}>Создать отчет по проделанным работам</DefaultButton>
            </div>
        </div>
    )
}

export default CarCard