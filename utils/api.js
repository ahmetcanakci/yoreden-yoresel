import axios from "axios"
import fetch from 'isomorphic-unfetch'
export const getProductList = () => {
  return fetch(process.env.NEXT_PUBLIC_API_PATH + '/api/yoresel').then(res => res)
}

export const getProduct = (id) => {
  return fetch(process.env.NEXT_PUBLIC_API_PATH + '/api/yoresel/' + id).then(res => res)
}

export async function upsertProduct(product, isUpdate) {
  const res = isUpdate ? await updateProduct(product) : await insertProduct(product)
}

async function insertProduct(product) {
  return await fetch(process.env.NEXT_PUBLIC_API_PATH + '/api/yoresel', {
    method: 'post', headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
}

async function updateProduct(product) {
  return await fetch(process.env.NEXT_PUBLIC_API_PATH + '/api/yoresel/' + product.id, {
    method: 'put', headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
}

export async function deleteProduct(id) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + '/api/yoresel/' + id, {
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