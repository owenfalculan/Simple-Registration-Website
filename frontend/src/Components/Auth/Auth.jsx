import React from 'react'
import { Outlet } from "react-router-dom";
import Layout from '../Layout';

function Auth() {
  return (
    <Layout>
      <Outlet/>
    </Layout>
  )
}

export default Auth
