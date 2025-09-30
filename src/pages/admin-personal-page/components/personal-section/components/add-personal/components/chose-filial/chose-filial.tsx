import { FC, useEffect, useState } from "react"
import StyledSelectWithLabel from "../../../../../../../../components/ui/styled-select-with-label/styled-select-with-label"
import { useGetFilialsQuery } from "../../../../../../../../services/api/filial"
import Typography from "../../../../../../../../components/ui/typography/typography"

interface IChoseFilial {
    value: string
    onChange: (s: string) => void
}

const ChoseFilial: FC<IChoseFilial> = (props) => {
    const { data: filials, isSuccess } = useGetFilialsQuery()
    const [options, setOptions] = useState<{id: string, title: string}[]>([])
    useEffect(() => {
        if (filials && filials.data.length > 0) {
            setOptions(filials.data.map(el => ({
                id: el.id,
                title: el.title
            })))
            props.onChange(filials.data[0].id)
        }
    }, [isSuccess])
    if (!filials) return

    if (filials.data.length === 0) return <Typography color="danger" variant="subtitle">Перед тем как регестрировать администратора филиала добавьте хотя бы один филиал</Typography>

    return (
        <StyledSelectWithLabel 
            label="Филиал"
            options={options}
            active={props.value}
            onChange={props.onChange}
        />
    )
}

export default ChoseFilial