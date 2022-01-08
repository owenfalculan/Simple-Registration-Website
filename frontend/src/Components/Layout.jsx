import React from 'react'

function Layout({ children }) {
  return (
    <main className="row m-0 p-0" style={{height:"100vh", overflow: 'auto'}}>
      <article className="col-sm-6 mx-auto" style={{ marginTop: '8%' }}>
        <div className="shadow p-4 mb-4 bg-white">
          { children }
        </div>
      </article>
    </main>
  )
}

export default Layout
