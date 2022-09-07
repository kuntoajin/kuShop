import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Cart: React.FC = (): JSX.Element => {
    const [cart, setCart] = useState<[]>([])
    const [empty, setEmpty] = useState<string>('')
    const [login, isLogin] = useState<boolean>(false)
    const [willCheckout, setWillCheckout] = useState<number[]>([])
    const navigate = useNavigate()
    
    useEffect(() => {
        const dataFetch = async () => {
            const response = await axios.get('http://localhost:3500/api/getCart')
            if(response?.data?.message) {
                setEmpty(response?.data?.message)
            } else {
                setCart(response?.data)
            }
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

    useEffect(() => {
        
    })

    const selected = async (index: number) => {
        await setWillCheckout([...willCheckout, index])
        console.log(willCheckout)
    }

    const handleDelete = async (index: any) => {
        const response = await axios.post('http://localhost:3500/api/delete', {
            index
        })
        console.log(response)
    }

    return (
        <ul>
            <p className="text-3xl">{empty}</p>
            {
                cart.map((list, index) => (
                    <li key={index}>
                        <label htmlFor="subscribeNews" className="flex">
                            <input type="checkbox" id="subscribeNews" name="subscribe" value={list['id']} className="mr-4" onChange={() => selected(index)}/>
                            <a href={`/product/${list['id']}`} className='flex'>
                                <img className="w-16 mr-4" src={list['image']} alt={list['productName']} />
                                <div>
                                    <p>{list['productName']}</p>
                                    <p>{list['priceShow']}</p>
                                </div>
                            </a>
                            <button onClick={() => handleDelete(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </label>
                    </li>
                ))
            }
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm mt-5 px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:w-auto sm:text-sm"
                  >
                    <a href="/checkout">
                        Checkout
                    </a>
                </button>
        </ul>
    )
}

export default Cart