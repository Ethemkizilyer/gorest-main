import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = () => {
    const token=useSelector((state:any)=>state.auth.token)
  return (
    <div>{token ? <Outlet/> :<Navigate to="/"/>}</div>
  )
}

export default PrivateRouter