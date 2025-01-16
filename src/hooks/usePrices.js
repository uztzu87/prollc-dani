import { useState, useEffect } from 'react'
import axios from 'axios'

export default function usePrices() {
  const [prices, setPrices] = useState({})
  const [loading, setLoading] = useState(true)

  const getPrices = async () => {
    try {
      const res = await axios('/api/get-prices')
      const priceObj = {}
      res.data.prices.forEach(price => {
        priceObj[price.nickname] = price
      })
      setPrices(priceObj)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPrices()
  }, [])

  return {loading, prices}
}
