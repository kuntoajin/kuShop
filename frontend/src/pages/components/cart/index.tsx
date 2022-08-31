import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Cart: React.FC = (): JSX.Element => {
    const [cart, setCart] = useState<[]>([])
    const [login, isLogin] = useState<boolean>(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        const dataFetch = async () => {
            const response = await axios.get('http://localhost:3500/api/getCart')
            setCart(response?.data)
        }
        dataFetch()
    }, [])

    useEffect(() => {
        const dataFetch = async () => {
            const response = await axios.get('http://localhost:3500/api/checkLogin')
            isLogin(response?.data?.isLogin)
        }
        dataFetch()
    }, [])

    useEffect(() => {
        if(login) {
            navigate('/', { replace: true })
        }
    }, [])

    return (
        <ul>
            {
                cart.map((list, index) => (
                    <li key={index}>
                        <a href={`/product/${list['id']}`} className='flex'>
                            <img className="w-16 mr-4" src={list['image']} alt={list['productName']} />
                            <div>
                                <p>{list['productName']}</p>
                                <p>{list['priceShow']}</p>
                                <p>Jumlah barang: {list['quantity']}</p>
                            </div>
                        </a>
                    </li>
                ))
            }
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:w-auto sm:text-sm"
                  >
                    <a href="/checkout">
                        Checkout
                    </a>
                </button>
        </ul>
    )
}

export default Cart