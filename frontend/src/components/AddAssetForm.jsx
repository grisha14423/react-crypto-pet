import { useRef, useState } from "react"
import { useCrypto } from "../context/crypto-context"
import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd"
import { useForm } from "antd/es/form/Form"
import CoinInfo from "./CoinInfo"

const validateMessages = {
  required: "${label} is reauired",
  types: {
    number: "${label} is not valid number",
  },
  number: {
    range: "${label} must be berween ${min} and ${max}",
  },
}

const AddAssetForm = ({ onClose }) => {
  const [form] = useForm()
  const { crypto, addAsset } = useCrypto()
  const [coin, setCoin] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const assetRef = useRef()

  if (submitted)
    return (
      <Result
        status="success"
        title="New Asset Added Successfully"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="close" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    )

  if (!coin)
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
    )

  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    }
    assetRef.current = newAsset
    addAsset(newAsset)
    setSubmitted(true)
  }

  function hadleAmountChange(value) {
    const price = form.getFieldValue("price")
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    })
  }

  function hadlePriceChange(value) {
    const amount = form.getFieldValue("amount")
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    })
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={hadleAmountChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber style={{ width: "100%" }} onChange={hadlePriceChange} />
      </Form.Item>

      <Form.Item label="Date and time" name="date">
        <DatePicker showTime style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add asset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddAssetForm
