import { useLayoutEffect, useRef, useState, useContext } from "react"
import authConext from "../context/authProvider"
import './login.css'
import axios from '../API/axios'
export default function Login() {
    
    
    const loginRef = useRef(null)
    const {accessToken, setToken} = useContext(authConext)
    var refreshCount = 0;
    
    useLayoutEffect(() => {
        const authInterceptor =  axios.interceptors.request.use((config) =>{
            console.log('hi from layoug')
            
            config.headers.Authorization = 
                !config.retry && accessToken
                ? `Bearer ${accessToken}`
                : config.headers.Authorization
            console.log(config)
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
    },[accessToken])
    
    /* useLayoutEffect(() => {
        console.log('uselayoutrunning')
        const refreshInterceptor = axios.interceptors.response.use((response) => {
            console.log('response middle')
            return response
        },
        async (error) => {
            console.log(error.response.status)
            if (error.response.status == 401){
                console.log('error being called')
                try{
                    let newToken = await axios.post('http://localhost:8080/refresh')
                    console.log(newToken.data.accessToken, 'called from axios')
                    setToken(newToken.data.accessToken)
                }
                catch(e){
                    console.log(e, 'refreshtoken error')
                    setToken(null)
                }
            }
            return 'hi';
        })
        return(
            axios.interceptors.response.eject(refreshInterceptor)
        )
    }, []) */
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
            console.log(token.accessToken)
            setToken(token.accessToken)
        }
        catch(e){
            console.log(e)
        }
    }
    async function axiosTest() {
        console.log(accessToken)
        setToken(1)
        try{
            let h = await axios.get('http://localhost:8080/auth')
            console.log('status sent back', h)
           /* let h = await fetch('http://localhost:8080/refresh',{
            method: "POST",
            credentials: "include"})
            let data = await h.json()
            console.log(data) */
        }
        catch(e){
            console.log(e)
        }
    }
    return(
        <form className='loginForm' ref={loginRef}>
            <label htmlFor="email">email</label>
            <input name="email" value={'nikan'}></input>
            <label htmlFor="password">pass</label>
            <input name="password" value={'78M56Soo!'}></input>
            <button type="submit" onClick={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>submit</button>
            <button onClick={(e) => {
                e.preventDefault()
                axiosTest()}}>
                axios
            </button>
        </form>
    )
}