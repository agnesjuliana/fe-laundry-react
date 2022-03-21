import React from 'react'
import  HomeAdmin  from './DashboardAdmin'
import { homeOwner } from './DashboardOwner'
import { homeKasir } from './DashboardKasir'

import paket from '../paket/PaketAPI'
import getRole from '../../../utils/access'

export default function HomePage() {
  // React.useEffect(() => {
  //   const User = getRole()
  //   if (User === undefined) {
  //     window.location = '/denied'
  //   }

  //   setRole(User)

  //   const fetchData = async () => {
  //     const dataPaket = await paket.count()
  //     console.log(dataPaket)
  //     setCounts(dataPaket)
  //   }

  //   fetchData()
  // }, []);

  // const [counts, setCounts] = React.useState();

  // const [role, setRole] = React.useState('');

  if (role === "admin") {
    return (
      // <>{homeAdmin(counts)}</>
      <></>
      // <HomeAdmin counts={counts}/>
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

