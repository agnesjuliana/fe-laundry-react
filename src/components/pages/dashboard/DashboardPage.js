import React from 'react'
import { homeAdmin } from './DashboardAdmin'
import { homeOwner } from './DashboardOwner'
import { homeKasir } from './DashboardKasir'

export default function HomePage() {
  if(localStorage.getItem("role")){
    const role = localStorage.getItem("role")
    if (role === "admin") {
      return (
        <>{homeAdmin}</>
      )
    }

    if (role === "kasir") {
      return (
        <>{homeKasir}</>
      )
    }

    if (role === "owner") {
      return (
        <>{homeOwner}</>
      )
    }
  }

  return (
    <>
      {window.location = '/denied'}
    </>
  ) 

  
}

