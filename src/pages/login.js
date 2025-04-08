import { useLayoutEffect, useRef, useState, useContext, useEffect } from "react"
import authConext from "../Context/authProvider"
import './login.css'
import { Link, useNavigate, useLocation } from "react-router"
import useInterceptorHook from "../Hooks/axiosPrivateInterceptorHook"
export default function Login() {
    
    const axios = useInterceptorHook()
    const loginRef = useRef(null)
    const {accessToken, setToken, trust, setTrust} = useContext(authConext)
    const location = useLocation()
    const navigate = useNavigate()
    var refreshCount = 0;
    
    /*useLayoutEffect(() => {
        const authInterceptor =  axios.interceptors.request.use((config) =>{
            config.headers.Authorization = 
                !config.retry && accessToken
                ? `Bearer ${accessToken}`
                : config.headers.Authorization
                console.log('interceptor called', config)
            refreshCount = 0
            return config
        })
        const refreshInterceptor = axios.interceptors.response.use((response) => response,
        async (error) => {
            let originalReq = error.config
            console.log(error)
            if (error.response.status == 401){
                console.log('error being called')
                
                console.log(refreshCount, 'refreshcount so far')
                try{
                    if(refreshCount == 1) return
                    refreshCount += 1
                    let newToken = await axios.post('http://localhost:8080/refresh')
                    console.log(newToken.data.accessToken, 'called from axios')
                    setToken(newToken.data.accessToken)
                    originalReq.headers.Authorization = `Bearer ${newToken.data.accessToken}`
                    originalReq.retry = true
                    return axios(originalReq)
                }
                catch(e){
                    console.log(e, 'refreshtoken error')
                    setToken(null)
                    return 'error from refreshtoken'
                }
            }
        })
        return( () => {        
            axios.interceptors.request.eject(authInterceptor)
            axios.interceptors.response.eject(refreshInterceptor)
        })
    },[accessToken])*/

    async function handleSubmit(){
        let url = 'http://localhost:8080/login'
        let formData = new FormData(loginRef.current)
        console.log(formData)
        try{
            let data = await fetch(url, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password')
                })
            })
            let token = await data.json()
            if (token.accessToken == null) throw new Error('no token recieved')
            console.log(token.accessToken)
            setToken(token.accessToken)
            let from = location.state?.from?.pathname || '/'
            console.log('navigated from and going back to',from)
            navigate(from, {replace : true})
        }
        catch(e){
            console.log(e)
        }
    }
    async function logout() {
        console.log(accessToken)
        try{
            let logout = await axios.post('http://localhost:8080/logout')
            console.log('loggingout', logout.data)
            setToken(null)
        }
        catch(e){
            console.log(e)
        }
    }
    async function auth() {
        console.log(accessToken)
        // uncomment next line to test response interceptor
        setToken(1)
        try{
            let logout = await axios.get('http://localhost:8080/auth')
            console.log('auth', logout.data)
        }
        catch(e){
            console.log(e)
        }
    }
    function toggleTrust(){
        setTrust(prev => !prev)
    }
    useEffect(()=>
        localStorage.setItem('trust', trust)
    , [trust])
    async function signinwithgoogle() {
        window.open("http://localhost:8080/auth/google", "_self");
    }
    return(
        <form className='loginForm' ref={loginRef}>
            <label htmlFor="email">email</label>
            <input id="email" name="email" value={'nikan'}></input>
            <label htmlFor="password">pass</label>
            <input id="password" name="password" value={'78M56Soo!'}></input>
            <label htmlFor="trust">Trust this computer</label>
            <input type="checkbox" name="trust" id="trust" onChange={toggleTrust} checked={trust}/>
            <button type="submit" onClick={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>submit</button>
            <button onClick={(e) => {
                e.preventDefault()
                logout()}}>
                logout
            </button>
            <button onClick={(e) => {
                e.preventDefault()
                auth()}}>
                auth
            </button>
            <button onClick={(e) => {
                e.preventDefault()
                signinwithgoogle()
            }}>
                signin wiht google
            </button>
            <Link to='/edit'>edit</Link>
        </form>
    )
}