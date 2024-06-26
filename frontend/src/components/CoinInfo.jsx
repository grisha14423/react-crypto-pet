import React from "react"
import { Typography, Flex } from "antd"
const CoinInfo = ({ coin, withSymbol }) => {
  return (
    <Flex align="center">
      <img
        alt={coin.name}
        src={coin.icon}
        style={{ width: 40, marginRight: 10 }}
      />
      <Typography.Title level={2} style={{ margin: 0 }}>
        {withSymbol && <span>({coin.symbol}) </span>}
        {coin.name}
      </Typography.Title>
    </Flex>
  )
}

export default CoinInfo
