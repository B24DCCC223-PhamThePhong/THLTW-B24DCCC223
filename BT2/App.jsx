import { Tabs } from 'antd'
import Dashboard from './components/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'
import useLocalStorage from './hooks/useLocalStorage'
import { initOrders, initProducts } from './data/initData'

const { TabPane } = Tabs

export default function App() {
  const [products] = useLocalStorage('products', initProducts)
  const [orders, setOrders] = useLocalStorage('orders', initOrders)

  return (
    <div style={{ padding: 24 }}>
      <Dashboard products={products} orders={orders} />
      <Tabs>
        <TabPane tab="Quản lý Sản phẩm" key="1">
          <Products products={products} />
        </TabPane>
        <TabPane tab="Quản lý Đơn hàng" key="2">
          <Orders products={products} orders={orders} setOrders={setOrders} />
        </TabPane>
      </Tabs>
    </div>
  )
}