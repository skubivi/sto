import { useGetFilialsQuery } from "../api/filial";
import { IPostReceptionistFilialReport, IReceptionistFilialReport } from "../types/analytics";

export const useCreateDataToPostFilialReceptionists = (data: IReceptionistFilialReport[]) => {
    const result: IPostReceptionistFilialReport[] = []
    const { data: filials } = useGetFilialsQuery()

    const getFilialName = (id: string) => {
        return filials?.data.find(el => el.id === id)?.title
    }

    if (filials)
    data.forEach(el => {
        result.push({
            filial: getFilialName(el.filialId) as string,
            carsCount: el.carsCount,
            carsProcessed: el.carsProcessed,
            processedPercent: el.processedPercent,
            carsGivenAway: el.carsGivenAway,
            reportsGivenAway: el.reportsGivenAway,
            reportsPercent: el.reportsPercent
        })
    })
    return result
}