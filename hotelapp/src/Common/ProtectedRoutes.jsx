import React, { useEffect } from 'react'
import { ContextDatas } from './ContextWrapped'

const ProtectedRoutes = ({ children }) => {
    const { loginmdal, Setloginmodal } = ContextDatas()
    const { User, token } = ContextDatas()

    useEffect(() => {
        if (!User) {
            Setloginmodal(true)

        }
    }, [User])

    return children;

}

export default ProtectedRoutes
