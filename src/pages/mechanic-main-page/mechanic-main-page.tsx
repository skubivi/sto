import { useState } from 'react'
import Loader from '../../components/ui/loader/loader'
import Typography from '../../components/ui/typography/typography'
import { useGetMechanicCarsQuery } from '../../services/api/cars'
import { ECarStatus } from '../../services/types/cars'
import CarCard from './components/car-card/car-card'
import styles from './style.module.scss'
import { EDiagnostic } from '../../services/types/documents'
import ReportWindow from './components/report-window/report-window'
import { createElectroReportBlob, createFreeReportBlob, createMetalReportBlob } from '../../services/utils/helper-functions/pdf'
import { useLazyGetPersonalDataQuery } from '../../services/api/user'
import { useUploadDocumentDiagnosticMutation } from '../../services/api/documents'
import ElectroWindow from './components/electro-window/electro-window'
import { getFilialFromLocalStorage } from '../../services/utils/helper-functions/filial'
import DiagnosticWindow from './components/diagnostic-window/diagnostic-window'

const MechanicMainPage = () => {
    const { data: carsForMechanic, isLoading } = useGetMechanicCarsQuery()
    const [getPersonal] = useLazyGetPersonalDataQuery()

    const [windowId, setWindowId] = useState<undefined | string>(undefined)
    const [windowType, setWindowType] = useState<EDiagnostic>(EDiagnostic.Metalworker)

    const [uploadDiagnostic, {isLoading: isUploadingDocument}] = useUploadDocumentDiagnosticMutation()

    if (isLoading) return (
        <div className={styles['loading-wrapper']}>
            <div className={styles.loading}>
                <Loader />
            </div>
        </div>
    )

    if (!carsForMechanic || carsForMechanic.data.length === 0) return (
        <div className={styles.nocars}>
            <Typography variant='h2' color='black'>Нет машин для работы</Typography>
        </div>
    )

    const processedCars = carsForMechanic.data.filter(el => el.status === ECarStatus.Processed)
    const createdCars = carsForMechanic.data.filter(el => el.status === ECarStatus.Created)

    const openReportWindow = windowType === EDiagnostic.Free && windowId !== undefined
    const openElectroWindow = windowType === EDiagnostic.Electric && windowId !== undefined
    const openDiagnosticWindow = windowType === EDiagnostic.Metalworker && windowId !== undefined

    const handleSubmitFreeReport = async (data: {text: string, photo: Blob | undefined}[]) => {
        if (isUploadingDocument) return null
        if (windowId === undefined) return null
        const personal = await getPersonal()
        if (!personal.data) return null
        const car = carsForMechanic.data.find(el => el.id === windowId)
        if (car === undefined) return null
        const filialId = getFilialFromLocalStorage()
        if (filialId === null) return null
        const mechanicName = personal.data.lastName + ' ' + personal.data.firstName + ' ' + personal.data.middleName
        const blob = await createFreeReportBlob({
            carNumber: car.carNumber,
            mileage: car.mileage,
            mechanicName,
            data
        })
        const now = new Date(Date.now())
        const dateText = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`
        await uploadDiagnostic({
            label: dateText + ' - отчет',
            type: EDiagnostic.Free,
            file: blob,
            carProcessingId: windowId,
            data: {
                worksCount: data.length,
                filialId,
            }
        })
        setWindowId(undefined)
    }

    const handleSubmitMetalworker = async (data: {text: string, photo: Blob | undefined, title: string, subtitle: string}[]) => {
        if (isUploadingDocument) return null
        if (windowId === undefined) return null
        const personal = await getPersonal()
        if (!personal.data) return null
        const car = carsForMechanic.data.find(el => el.id === windowId)
        if (car === undefined) return null
        const filialId = getFilialFromLocalStorage()
        if (filialId === null) return null
        const mechanicName = personal.data.lastName + ' ' + personal.data.firstName + ' ' + personal.data.middleName
        console.log(data)
        const blob = await createMetalReportBlob({
            carNumber: car.carNumber,
            mileage: car.mileage,
            mechanicName,
            data
        })
        const now = new Date(Date.now())
        const dateText = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`
        await uploadDiagnostic({
            label: dateText + ' - слесарная диагностика',
            type: EDiagnostic.Metalworker,
            file: blob,
            carProcessingId: windowId,
            data: {
                worksCount: data.length,
                filialId,
            }
        })
        setWindowId(undefined)
    }

    const handleSubmitElectro = async (data: {text: string, photo: Blob | undefined, title: string, subtitle: string}[]) => {
        if (isUploadingDocument) return null
        if (windowId === undefined) return null
        const personal = await getPersonal()
        if (!personal.data) return null
        const car = carsForMechanic.data.find(el => el.id === windowId)
        if (car === undefined) return null
        const filialId = getFilialFromLocalStorage()
        if (filialId === null) return null
        const mechanicName = personal.data.lastName + ' ' + personal.data.firstName + ' ' + personal.data.middleName
        const blob = await createElectroReportBlob({
            carNumber: car.carNumber,
            mileage: car.mileage,
            mechanicName,
            data
        })
        const now = new Date(Date.now())
        const dateText = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`
        await uploadDiagnostic({
            label: dateText + ' - электродиагностика',
            type: EDiagnostic.Electric,
            file: blob,
            carProcessingId: windowId,
            data: {
                worksCount: data.length,
                filialId,
            }
        })
        setWindowId(undefined)
    }

    return (
        <div className={`${styles.wrapper} ${windowId !== undefined && styles.max}`}>
            <ReportWindow 
                cardId={windowId} 
                onClose={() => setWindowId(undefined)} 
                open={openReportWindow} 
                onSubmit={handleSubmitFreeReport}
                isUploadingDocument={isUploadingDocument}
            />
            <ElectroWindow 
                cardId={windowId}
                onClose={() => setWindowId(undefined)}
                open={openElectroWindow}
                onSubmit={handleSubmitElectro}
                isUploadingDocument={isUploadingDocument}
            />
            <DiagnosticWindow 
                cardId={windowId}
                onClose={() => setWindowId(undefined)}
                open={openDiagnosticWindow}
                onSubmit={handleSubmitMetalworker}
                isUploadingDocument={isUploadingDocument}
            />
            <div className={styles['cars-section']}>
                <Typography variant='h2' color='black'>Нужно провести диагностику</Typography>
                <div className={styles.cars}>
                    {createdCars.map(el => <CarCard data={el} key={el.id} onClick={() => setWindowId(el.id)} setType={setWindowType}/>)}
                </div>
            </div>
            <div className={styles['cars-section']}>
                <Typography variant='h2' color='black'>Продиагностированы</Typography>
                <div className={styles.cars}>
                    {processedCars.map(el => <CarCard data={el} key={el.id} onClick={() => setWindowId(el.id)} setType={setWindowType}/>)}
                </div>
            </div>
        </div>
    )
}

export default MechanicMainPage