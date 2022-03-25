import { Route, Routes } from 'react-router-dom';

import GenerateLaporan from '../components/pages/laporan/GenerateLaporan';
import HomePage from '../components/pages/dashboard/DashboardPage';
import DeniedPage from '../components/pages/DeniedPage'
import MemberPage from '../components/pages/member/MemberPage';
import OutletPage from '../components/pages/outlet/OutletPage';
import PaketPage from '../components/pages/paket/PaketPage';
import TransaksiPage from '../components/pages/transaksi/TransaksiPage';
import UserPage from '../components/pages/user/UserPage';



export const MainRoute = () => (
  <Routes>
    <Route path='/dashboard' element={<HomePage />}></Route>
    <Route path='/member' element={<MemberPage />}></Route>
    <Route path='/outlet' element={<OutletPage />}></Route>
    <Route path='/paket' element={<PaketPage />}></Route>
    <Route path='/transaksi' element={<TransaksiPage />}></Route>
    <Route path='/user' element={<UserPage />}></Route>
    <Route path='/generate/laporan' element={<GenerateLaporan />}></Route>
    <Route path='/denied' element={<DeniedPage />}></Route>
  </Routes>
)

