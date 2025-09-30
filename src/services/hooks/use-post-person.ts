import { useRegisterAdminMutation, useRegisterMechanicMutation, useRegisterReceptionistMutation } from "../api/auth"
import { ERoles } from "../types/user"

export const usePostPerson = () => {
    const [registerAdmin] = useRegisterAdminMutation()
    const [registerReceptionist] = useRegisterReceptionistMutation()
    const [registerMechanic] = useRegisterMechanicMutation()
    const result = async (data: {
        identifier: string
        password: string
        role: ERoles
        firstName: string
        lastName: string
        middleName: string
        filialId?: string
    }) => {
        if (data.role === ERoles.Mechanic) {
            await registerMechanic({
                identity: {
                    identifier: data.identifier,
                    secret: data.password
                },
                firstname: data.firstName,
                lastname: data.lastName,
                middlename: data.middleName
            })
        }
        else if (data.role === ERoles.Receptionist) {
            await registerReceptionist({
                identity: {
                    identifier: data.identifier,
                    secret: data.password
                },
                firstname: data.firstName,
                lastname: data.lastName,
                middlename: data.middleName
            })
        }
        else if (data.role === ERoles.FullAdmin) {
            await registerAdmin({
                identity: {
                    identifier: data.identifier,
                    secret: data.password
                },
                firstname: data.firstName,
                lastname: data.lastName,
                middlename: data.middleName
            })
        }
        else if (data.role === ERoles.Admin) {
            await registerAdmin({
                identity: {
                    identifier: data.identifier,
                    secret: data.password
                },
                firstname: data.firstName,
                lastname: data.lastName,
                middlename: data.middleName,
                filialId: data.filialId
            })
        }
    }

    return result
}