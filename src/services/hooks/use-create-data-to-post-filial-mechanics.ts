import { useGetFilialsQuery } from "../api/filial";
import { IMechanicFilialReport, IPostMechanicFilialReport } from "../types/analytics";

export const useCreateDataToPostMechanicsFilials = (data: IMechanicFilialReport[]) => {
    const result: IPostMechanicFilialReport[] = []
    const { data: filials } = useGetFilialsQuery()

    const getFilialName = (id: string) => {
        return filials?.data.find(el => el.id === id)?.title
    }
    if (filials)
    data.forEach(el => {
        result.push({
            filial: getFilialName(el.filialId) as string,
            diagnosticsCount: el.diagnosticsCount,
            worksAverage: el.worksAverage,
            worksCount: el.worksCount,
            reportsCount: el.reportsCount
        })
    })
    return result
}