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
  const [jewellery, setJewellery] = useState(isUpdate ? props.jewellery ? props.jewellery : CONST.DEFAULT_JEWELLERY : CONST.DEFAULT_JEWELLERY)

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
        setJewellery({ ...jewellery, image: res.data.fileUrl })
        setSubmitting(true)
      })
  }

  useEffect(() => {
    if (isSubmitting) {
      API.upsertJewellery(jewellery, isUpdate).then(() => {
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
                value={jewellery.name}
                onChange={e => setJewellery({ ...jewellery, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Açıklama</Form.Label>
              <Form.Control
                value={jewellery.description}
                onChange={e => setJewellery({ ...jewellery, description: e.target.value })}
                as="textarea"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ücret</Form.Label>
              <Form.Control
                value={jewellery.fromPrice}
                onChange={e => setJewellery({ ...jewellery, fromPrice: Number.parseInt(e.target.value) })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>İndirimli Ücret</Form.Label>
              <Form.Control
                value={jewellery.price}
                onChange={e => setJewellery({ ...jewellery, price: Number.parseInt(e.target.value) })}
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
                  API.deleteJewellery(jewellery.id).then(function (res) {
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

  const res = await API.getJewelleryList()
  const jewelleryList = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = jewelleryList.map((jew) => ({
    params: { id: jew.id },
  }))
  paths.push({ params: { id: 'new' } })

  return { paths, fallback: true }
}

export const getStaticProps = async ({ params }) => {
  let jewellery = CONST.DEFAULT_JEWELLERY;
  if (params.id != 'new') {
    const res = await API.getJewellery(params.id)
    jewellery = await res.json()
  }
  return {
    revalidate: 1,
    props: {
      jewellery
    }
  }
}

export default Editor