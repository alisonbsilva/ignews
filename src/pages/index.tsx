import { GetServerSideProps } from 'next'
import Head from 'next/head'
import stripe from 'stripe'
import { SubscribeButton } from '../components/SubscribeButton'
import styles from './home.module.scss'


interface HomeProps {
  product:{
    priceId: string;
    amount: number;
  }
}


export default function Home({ product }: HomeProps) {

  return (
     <>
     <Head>
      <title>Home | Ig.News</title>

      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world. </h1>
          <p>Get access to all the publivations <br />
          <span>for {product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="images/avatar.svg" alt="Girl coding" />

      </main>


     </>    
  )
}
export const getServerSideProps:GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1LLEjCJC90KSurPoX7JjnXFf', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: price.unit_amount
  };


  return {
    props: {
      product,
    }
  }
}
