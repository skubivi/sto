import { useEffect, useState } from "react";
import { useGetFilialsQuery } from "../api/filial";
import { useGetPersonalQuery } from "../api/personal";
import { IPostReceptionistReport, IReceptionistReport } from "../types/analytics";
import { TFullPerson } from "../types/personal";
import { ERoles } from "../types/user";

export const useCreateDataToPostReceptionists = (data: IReceptionistReport[]) => {
    const result: IPostReceptionistReport[] = []
    const { data: filials } = useGetFilialsQuery()
    const { data: receptionists, isSuccess } = useGetPersonalQuery()
    const [filteredReceptionists, setFilteredReceptionists] = useState<TFullPerson[]>([])

    useEffect(() => {
        if (receptionists) setFilteredReceptionists(receptionists.data.filter(el => el.role === ERoles.Mechanic))
    }, [isSuccess])

    const getFilialName = (id: string) => {
        return filials?.data.find(el => el.id === id)?.title
    }
    const getReceptionistName = (id: string) => {
        const person = filteredReceptionists.find(el => el.id === id)
        if (person) return `${person.lastName} ${person.firstName[0]}.${person.middleName[0]}`
    }
    if (filials && receptionists)
    data.forEach(el => {
        result.push({
            filial: getFilialName(el.filialId) as string,
            receptionist: getReceptionistName(el.receptionistId) as string,
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