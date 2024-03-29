import axios from "axios"
const base_url = "http://localhost:8000/api/transaksi"


const headerConfig = () => {
  const token = localStorage.getItem("token")
  let header = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return header
}

// api 
const show = async () => {
  let url = base_url
  try {
    let result = await axios.get(url, headerConfig())
    if (result.status === 200) {
      let transaksi = result.data.data
      return transaksi
    }
  } catch (error) {
    console.log(error)
  }
}

const createPayload = (id_transaksi, id_user, id_member, tgl_diterima, batas_waktu, status, dibayar, member, user, outlet, detail, total) => {
  return { id_transaksi, id_user, id_member, tgl_diterima, batas_waktu, status, dibayar, member, user, outlet, detail, total }
}


// api 
const showOne = async (payload) => {
  let url = base_url + '/' + payload.id_transaksi
  try {
    let result = await axios.get(url, headerConfig())
    if (result.status === 200) {
      let transaksi = result.data.data
      const payload = createPayload(...transaksi)
      return payload
    }
  } catch (error) {
    console.log(error)
  }
}




const bayar = async (payload) => {
  let url = base_url + '/bayar/' + payload.id_transaksi
  try {
    let result = await axios.put(url, payload, headerConfig())
    if (result.status === 200) {
      return {success: true}
    }
  } catch (error) {
    console.log(error)
    return {success:false}
  }
}

const updateStatus = async (payload) => {
  let url = base_url + '/status/' + payload.id_transaksi
  try {
    let result = await axios.put(url, payload, headerConfig())
    if (result.status === 200) {
      return { success: true }
    }
  } catch (error) {
    console.log(error)
    return { success: false }
  }
}


const add = async (payload) => {
  let url = base_url
  try {
    let result = await axios.post(url, payload, headerConfig())
    if (result.status === 200) {
      return { success: true }
    }
  } catch (error) {
    console.log(error)
    return { success: false }
  }
}

// const destroy = async (payload) => {
//   let url = base_url + '/' + payload.id_transaksi
//   try {
//     let result = await axios.delete(url, headerConfig())
//     if (result.status === 200) {
//       return { success: true }
//     }
//   } catch (error) {
//     console.log(error)
//     return { success: false }
//   }
// }


export default {show, add, showOne, bayar, updateStatus}

