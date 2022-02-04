import Navbar from './navbar'
import Footer from './footer'

export default ({ children }) => {
  return (
    <>
      <h1>media</h1>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
