import { Form, Button } from "react-bootstrap"
import Layout from "../../components/Layout"
import { useState, useRef } from "react"
import { useRouter } from 'next/router'
import * as API from '../../utils/api'
import * as CONST from '../../utils/constant'
import Router from 'next/router'
import { useEffect } from 'react'
import Resizer from "react-image-file-resizer"

const Editor = (props) => {

  const fileInput = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isSubmitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const isUpdate = id != 'new';
  const [product, setProduct] = useState(isUpdate ? props.product ? props.product : CONST.DEFAULT_PRODUCT : CONST.DEFAULT_PRODUCT)

  const fileSelectorHandler = event => {
    setSelectedFile(event.target.files[0])
  }

  function urlToFile(url, filename, mimeType) {
    return fetch(url)
      .then(res => {
        return res.arrayBuffer()
      })
      .then(buf => {
        return new File([buf], filename, { type: mimeType })
      })
      .then(file => {
        return API.uploadFile(file)
      })
      .then(res => {
        setProduct({ ...product, image: res.data.fileUrl })
        setSubmitting(true)
      })
  }

  useEffect(() => {
    if (isSubmitting) {
      API.upsertProduct(product, isUpdate).then(() => {
        Router.push('/panel')
      })
      setSubmitting(false)
    }
  }, [isSubmitting])

  const handleSubmit = async event => {
    event.preventDefault()
    if (selectedFile) {
      Resizer.imageFileResizer(
        selectedFile,
        2000,
        1400,
        "JPEG",
        100,
        0,
        uri => {
          urlToFile(uri, selectedFile.name, "image/jpeg").then(() => { })
        },
        "base64"
      )
    } else if (isUpdate) {
      setSubmitting(true)
    }
  }

  return (
    <Layout>
      <div className="center-item">
        <div className="center">
          <Button
            variant={selectedFile ? "info" : "primary"}
            onClick={() => fileInput.current.click()}
          >
            {isUpdate ? "Fotoğrafı Güncelle" : "Fotoğraf Ekle"}
          </Button>
          <p>{selectedFile ? selectedFile.name : "Fotoğraf Seç"}</p>
        </div>
        <input
          ref={fileInput}
          style={{ display: "none" }}
          id="imageSelector"
          type="file"
          onChange={fileSelectorHandler}
        />

        <div>
          <Form onSubmit={handleSubmit} className="col-md-10 col-xl-10">
            <Form.Group>
              <Form.Label>Adı</Form.Label>
              <Form.Control
                value={product.name}
                onChange={e => setProduct({ ...product, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Açıklama</Form.Label>
              <Form.Control
                value={product.description}
                onChange={e => setProduct({ ...product, description: e.target.value })}
                as="textarea"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ücret</Form.Label>
              <Form.Control
                value={product.fromPrice}
                onChange={e => setProduct({ ...product, fromPrice: Number.parseInt(e.target.value) })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>İndirimli Ücret</Form.Label>
              <Form.Control
                value={product.price}
                onChange={e => setProduct({ ...product, price: Number.parseInt(e.target.value) })}
              />
            </Form.Group>
            <Button style={{ marginRight: 7 }} variant="primary" type="submit">
              {isUpdate ? "Güncelle" : "Ekle"}
            </Button>
            <Button style={{ marginRight: 7 }} variant="warning" onClick={() => Router.push('/panel')}>Geri</Button>
            {isUpdate && (
              <Button
                variant="danger"
                onClick={() =>
                  API.deleteProduct(product.id).then(function (res) {
                    Router.push('/panel')
                  })
                }
              >
                Sil
              </Button>
            )}
          </Form>
        </div>
      </div>
    </Layout>)
}

export async function getStaticPaths() {

  const res = await API.getProductList()
  const productList = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = productList.map((p) => ({
    params: { id: p.id },
  }))
  paths.push({ params: { id: 'new' } })

  return { paths, fallback: true }
}

export const getStaticProps = async ({ params }) => {
  let product = CONST.DEFAULT_PRODUCT;
  if (params.id != 'new') {
    const res = await API.getProduct(params.id)
    product = await res.json()
  }
  return {
    revalidate: 1,
    props: {
      product
    }
  }
}

export default Editor