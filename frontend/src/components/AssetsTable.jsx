import { Table } from "antd"
import { useCrypto } from "../context/crypto-context"

const AssetsTable = () => {
  const { assets } = useCrypto()

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      //   sortDirections: ["descend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Price $",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.amount - b.amount,
    },
  ]
  const data = assets.map((a) => ({
    key: a.id,
    name: a.name,
    price: a.price,
    amount: a.amount,
  }))

  return <Table pagination={false} columns={columns} dataSource={data} />
}

export default AssetsTable
