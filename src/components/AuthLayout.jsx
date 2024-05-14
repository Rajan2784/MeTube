import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication }) {
    const {status} = useSelector((store) => store.auth)
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)

    useEffect(()=>{
        if(authentication && status !== authentication){
            navigate("/login")
        } else if(!authentication && status !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[status,navigate,authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
