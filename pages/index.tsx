import Header from "../components/Header"
import ProductList from "../components/ProductList"
import { IProduct } from "../components/Product"
import Footer from "../components/Footer"
import Contact from "../components/Contact"
import Head from "next/head"
import * as API from "../utils/api"

export interface IIndexProps {
  products: IProduct[]
}

const Index = (props: IIndexProps) => {
  return (
    <div className="app">
      <Head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Yöreden Yöresel</title>
        <meta name="title" content="Yöreden Yöresel" />
        <meta name="description" content="Türkiye'nin dört bir yanından doğal ve yöresel ürünler." />
        <meta property="og:image" content={props.products[0] ? props.products[0].image : ""}/>
        <meta property="og:url" content="https://yoredenyoresel.com"/>
        <meta name="twitter:card" content="summary_large_image"/>

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoredenyoresel.com" />
        <meta property="og:title" content="Yöreden Yöresel" />
        <meta property="og:description" content="Türkiye'nin dört bir yanından doğal ve yöresel ürünler" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yoredenyoresel.com/" />
        <meta property="twitter:title" content="Yöreden Yöresel" />
        <meta property="twitter:description" content="Türkiye'nin dört bir yanından doğal ve yöresel ürünler" />
      </Head>
      <Header />
      <main className="main">
        <img src="/background-jew.png" alt="a" className="background-image" />
        <div className="promotional-message">
          <h3>Yöreden</h3>
          <h2>Yöresel</h2>
          <p><strong>Yöresel ürünler</strong> bir tık uzağınızda.</p>
        </div>
        <ProductList products={props.products} />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await API.getProductList()
  const productList = await res.json()
  return {
    revalidate: 15,
    props: {
      products: productList
    }
  }
}


export default Index