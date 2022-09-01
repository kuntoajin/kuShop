import { useEffect, useState } from "react"
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios'
import Home from "./pages/components/home";
import Detail from "./pages/components/detail";
import Cart from "./pages/components/cart";
import Login from "./pages/components/login";
import Checkout from "./pages/components/checkout";
import Success from "./pages/components/success";

const App: React.FC<{}> = () => {
    const [datas, setDatas] = useState<[]>([])

    useEffect(() => {
        const dataFetch = async () => {
            const response = await axios.get('https://fakestoreapi.com/products')
            setDatas(response.data)
        }
        dataFetch()
    }, [])

    return (
        <div className="container mx-auto px-3">
            <Routes>
                <Route path="/" element={<Home datas={datas} />} />
                <Route path="product/:id" element={<Detail datas={datas} />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="login" element={<Login />} />
                <Route path="success" element={<Success />} />
            </Routes>
        </div>
    )
}

export default App