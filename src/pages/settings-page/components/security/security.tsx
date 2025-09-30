import { useState } from 'react'
import DefaultButton from '../../../../components/ui/default-button/default-button'
import Section from '../../../../components/ui/section/section'
import Typography from '../../../../components/ui/typography/typography'

import styles from './style.module.scss'
import StyledModal from '../../../../components/ui/styled-modal/styled-modal'
import ChangePasswordModal from './change-password-modal/change-password-modal'

const Security = () => {
    const [openPasswordModal, setOpenPasswordModal] = useState(false)
    const handleOpenPasswordModal = () => {
        setOpenPasswordModal(true)
    }
    const handleClosePasswordModal = () => {
        setOpenPasswordModal(false)
    }
    return (
        <div className={styles.security}>
            <Typography variant='h2' color='black'>Безопасность</Typography>
            <Section>
                <div className={styles.password}>
                    <Typography variant='h3' color='white'>Пароль</Typography>
                    <div className={styles.button}>
                        <DefaultButton variant='outline-primary' onClick={handleOpenPasswordModal}>
                            изменить
                        </DefaultButton>
                    </div>
                </div>
            </Section>
            <StyledModal
                open={openPasswordModal}
                onClose={handleClosePasswordModal}
            >
                <ChangePasswordModal onClose={() => setOpenPasswordModal(false)}/>
            </StyledModal>
        </div>
    )
}

export default Security