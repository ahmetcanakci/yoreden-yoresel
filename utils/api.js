import axios from "axios"
import fetch from 'isomorphic-unfetch'
export const getJewelleryList = () => {
  return fetch(process.env.NEXT_PUBLIC_API_PATH + '/api/jewellery').then(res => res)
}

export const getJewellery = (id) => {
  return fetch(process.env.NEXT_PUBLIC_API_PATH + '/api/jewellery/' + id).then(res => res)
}

export async function upsertJewellery(jewellery, isUpdate) {
  const res = isUpdate ? await updateJewellery(jewellery) : await insertJewellery(jewellery)
}

async function insertJewellery(jewellery) {
  return await fetch(process.env.NEXT_PUBLIC_API_PATH + '/api/jewellery', {
    method: 'post', headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jewellery)
  })
}

async function updateJewellery(jewellery) {
  return await fetch(process.env.NEXT_PUBLIC_API_PATH + '/api/jewellery/' + jewellery.id, {
    method: 'put', headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jewellery)
  })
}

export async function deleteJewellery(id) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + '/api/jewellery/' + id, {
    method: 'delete'
  })
}

export const uploadFile = async file => {
  const formData = new FormData()
  formData.append("image", file, file.name)
  return axios.post("https://us-central1-news-26417.cloudfunctions.net/uploadFile", formData).then(res => {
    return res
  })
}