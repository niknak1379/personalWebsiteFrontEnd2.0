import { useLayoutEffect, useRef, useState, useContext, useEffect } from "react"
import authConext from "../Context/authProvider"
import './login.css'
import { Link, useNavigate, Navigate, useLocation } from "react-router"
import useInterceptorHook from "../Hooks/axiosPrivateInterceptorHook"
export default function Login() {
    
    const axios = useInterceptorHook()
    const loginRef = useRef(null)
    const {accessToken, setToken, trust, setTrust, baseURL} = useContext(authConext)
    
    const location = useLocation()
    const navigate = useNavigate()


    async function handleSubmit(){
        let url = baseURL + '/login'
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
    function toggleTrust(){
        setTrust(prev => !prev)
    }
    useEffect(()=>
        localStorage.setItem('trust', trust)
    , [trust])
    async function signinwithgoogle() {
        localStorage.setItem('trust', true)
        window.open(baseURL + "/auth/google", "_self");
    }
    return(
        <>
        {
            accessToken &&
             <Navigate to='/' state={{from : location}} replace />
        }
        {
            (accessToken == null) &&
            <form className='loginForm Background' ref={loginRef}>
                <label htmlFor="email">Email or Username</label>
                <input id="email" name="email"></input>
                <label htmlFor="password">Password</label>
                <input id="password" name="password"></input>

                <label htmlFor="trust">
                    <input type="checkbox" name="trust" id="trust" onChange={toggleTrust} checked={trust}/>
                    Trust This Computer
                </label>
                
                <button className='loginButton' type="submit" onClick={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}>Login</button>
                <button className="googleLoginButton" onClick={(e) => {
                    e.preventDefault()
                    signinwithgoogle()
                }}>

                    <img alt='google icon' src={process.env.PUBLIC_URL + '/Assets/googleIcon.svg'}/>
                    <span>Sign In With Google</span>
                </button>
            </form>
        }
        </>
    )
}