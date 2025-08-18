import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
import ProductCard from './components/ProductCard'
import ProductList from './components/ProductList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ProductList />
    </>
  )
}

export default App
