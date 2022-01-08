import React from 'react'
import memeImage from '../images/404.png'
import Layout from './Layout'

function Page404() {
  return (
    <Layout>
      <div className='d-flex justify-content-center align-items-center'>
        <section className='text-center'>
          <img src={memeImage} alt="404" style={{maxHeight: '300px'}} />
          <div className='mt-5'>
            <h1 className="display-3 my-3">404</h1>
            <h1 className="display-6 text-secondary my-3" style={{fontSize: '25px'}}>Page not found!</h1>
            <h1 className="display-6 text-secondary my-3" style={{fontSize: '18px'}}>I saw what you did there! 🤣</h1>
          </div>
        </section> 
      </div>
    </Layout>
  )
}

export default Page404
