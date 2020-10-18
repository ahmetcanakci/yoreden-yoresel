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
        <title>Hayatım Organik - Organik Gıda</title>
        <meta name="title" content="Hayatım Organik - Organik Gıda" />
        <meta name="description" content="Organik ürünler bir tık uzağınızda." />
        <meta property="og:image" content={props.products[0] ? props.products[0].image : ""}/>
        <meta property="og:url" content="https://hayatimorganik.com"/>
        <meta name="twitter:card" content="summary_large_image"/>

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hayatimorganik.com" />
        <meta property="og:title" content="Hayatım Organik - Organik Gıda" />
        <meta property="og:description" content="Organik ürünler bir tık uzağınızda." />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hayatimorganik.com/" />
        <meta property="twitter:title" content="Hayatım Organik - Organik Gıda" />
        <meta property="twitter:description" content="Organik ürünler bir tık uzağınızda" />
        <script async src='https://www.googletagmanager.com/gtag/js?id=G-MB7Z4ZXDQQ'></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', 'G-MB7Z4ZXDQQ');
              `
          }}>
        </script>
      </Head>
      <Header />
      <main className="main">
        <img src="/background-jew.png" alt="a" className="background-image" />
        <div className="promotional-message">
          <h3>Hayatım</h3>
          <h2>Organik</h2>
          <p><strong>Organik ürünler</strong> bir tık uzağınızda.</p>
        </div>
        <ProductList products={props.products} />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await API.getJewelleryList()
  const jewelleryList = await res.json()
  return {
    revalidate: 15,
    props: {
      products: jewelleryList
    }
  }
}


export default Index