import { useEffect, useState } from "react";
import { useGetFilialsQuery } from "../api/filial";
import { useGetPersonalQuery } from "../api/personal";
import { IMechanicReport, IPostMechanicReport } from "../types/analytics";
import { TFullPerson } from "../types/personal";
import { ERoles } from "../types/user";

export const useCreateDataToPostMechanics = (data: IMechanicReport[]) => {
    const result: IPostMechanicReport[] = []
    const { data: filials } = useGetFilialsQuery()
    const { data: mechanics, isSuccess } = useGetPersonalQuery()
    const [filteredMechanics, setFilteredMechanics] = useState<TFullPerson[]>([])

    useEffect(() => {
        if (mechanics) setFilteredMechanics(mechanics.data.filter(el => el.role === ERoles.Mechanic))
    }, [isSuccess])

    const getFilialName = (id: number) => {
        return filials?.data.find(el => el.id === id)?.title
    }
    const getMechanicName = (id: number) => {
        const person = filteredMechanics.find(el => el.id === id)
        if (person) return `${person.lastName} ${person.firstName[0]}.${person.middleName[0]}`
    }
    if (filials && mechanics)
    data.forEach(el => {
        result.push({
            filial: getFilialName(el.filialId) as string,
            mechanic: getMechanicName(el.mechanicId) as string,
            diagnosticsCount: el.diagnosticsCount,
            worksAverage: el.worksAverage,
            worksCount: el.worksCount,
            reportsCount: el.reportsCount
        })
    })
    return result
}