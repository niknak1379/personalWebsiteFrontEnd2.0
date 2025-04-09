import instance from "../API/axios";
import { useLayoutEffect,useEffect, useContext, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import AuthConext from "../Context/authProvider";
import LoadingPlaceHolder from "../UI/LoadingPlaceHodler";

export default function PersistLogin() {
    const {accessToken, setToken, trust, baseURL} = useContext(AuthConext)
    const [isLoading, setLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        let mounted = true;
        async function refreshToken(){
            try{
                let data = await instance.post(baseURL + '/refresh')
                console.log('refresh being called from persist', data.data.accessToken)
                setToken(data.data.accessToken)
            }
            catch(error) {
                console.log('failed to automatically refresh token', error)
                if(refreshToken != null) navigate('/login', { state: { from: location }, replace: true})
            }
            finally{
                setLoading(false)
            }
        }
        if (mounted && trust) refreshToken(); else setLoading(false)
        return () => mounted = false;
    }, [])
    useLayoutEffect(() =>
    {
        console.log('from persist',accessToken, isLoading, location.pathname, trust)
    }, [isLoading])
    return(
        <>

            {
                !trust && 
                <Outlet />
            }
            {
                trust && (!isLoading) &&
                <Outlet />
            }
            {
                trust && isLoading &&
                <LoadingPlaceHolder />
            }
        </>
    )
}