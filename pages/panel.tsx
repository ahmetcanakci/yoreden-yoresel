import Layout from "../components/Layout"
import BootstrapTable from "react-bootstrap-table-next"
import * as API from "../utils/api"
import { IIndexProps } from "./index"
import Router from 'next/router'

const Panel = (props: IIndexProps) => {

  const columns = [
    {
      dataField: "name",
      text: "Adı",
      sort: true
    },
    {
      dataField: "fromPrice",
      text: "Ücret",
      sort: true
    },
    {
      dataField: "price",
      text: "İndirimli Ücret"
    },
    {
      dataField: "description",
      text: "Açıklama"
    }
  ]
  const navigateForCreate = () => Router.push('/editor/new')
  const navigateForUpdate = {
    onClick: (_e, jewellery) => {
      Router.push('/editor/' + jewellery.id)
    }
  }
  if (props.products) {
    return (
      <Layout>
        <div className="center-item">
          <input
            onClick={navigateForCreate}
            type="submit"
            value="Ekle"
          />
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={props.products}
            columns={columns}
            rowEvents={navigateForUpdate}
            striped
            hover
            condensed
          />
        </div></Layout>
    )
  }
}


export const getStaticProps = async () => {
  const res = await API.getJewelleryList()
  const jewelleryList = await res.json()
  return {
    revalidate: 1,
    props: {
      products: jewelleryList
    }
  }
}

export default Panel