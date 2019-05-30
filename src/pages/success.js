import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Thank you for your purchase.</h1>
    <p>You should be receiving a receipt shortly, via email.</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
