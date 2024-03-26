import { useContext } from "react"
import { Layout, Spin } from "antd"
import AppHeader from "./AppHeader"
import AppSider from "./AppSider"
import AppContent from "./AppContent"
import CriptoContext from "../../context/crypto-context"

const AppLayout = () => {
  const { loading } = useContext(CriptoContext)
  if (loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  )
}

export default AppLayout
