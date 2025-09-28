import Section from "../../../../components/ui/section/section"
import Typography from "../../../../components/ui/typography/typography"
import FilialSelect from "./components/filial-select/filial-select"

import styles from './style.module.scss'

const Filial = () => {
    return (
        <Section>
            <div className={styles.section}>
                <Typography variant="h3" color="white">
                    Филиал
                </Typography>
                <FilialSelect />
            </div>
        </Section>
    )
}

export default Filial