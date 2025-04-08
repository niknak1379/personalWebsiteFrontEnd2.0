import instance from "../API/axios";
import { useLayoutEffect,useEffect, useContext, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import AuthConext from "../Context/authProvider";
import LoadingPlaceHolder from "../UI/LoadingPlaceHodler";

export default function PersistLogin() {
    const {accessToken, setToken, trust} = useContext(AuthConext)
    const [isLoading, setLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        let mounted = true;
        async function refreshToken(){
            try{
                let data = await instance.post('http://localhost:8080/refresh')
                console.log('refresh being called from persist', data.data.accessToken)
                setToken(data.data.accessToken)
            }
            catch(error) {
                console.log('failed to automatically refresh token', error)
                navigate('/login', { state: { from: location }, replace: true})
            }
            finally{
                setLoading(false)
            }
        }
        if (accessToken == null && mounted) refreshToken(); else setLoading(false)
        return () => mounted = false;
    }, [])
    useLayoutEffect(() =>
    {
        console.log('from persist',accessToken, isLoading, location)
    }, [isLoading])
    return(
        <>
            {!trust && 
                <Outlet />
            }
            {(!isLoading) &&
                <Outlet />
            }
            {
                isLoading &&
                <LoadingPlaceHolder />
            }
        </>
    )
}