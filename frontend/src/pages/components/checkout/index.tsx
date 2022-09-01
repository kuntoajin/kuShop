import axios from "axios"
import { useEffect, useState } from "react"

const Checkout: React.FC = (): JSX.Element => {
    const [data, setData] = useState<any[]>([])
    const [token, setToken] = useState<string>('')
    useEffect(() => {
        const dataFetch = async () => {
            const response = await axios.get('http://localhost:3500/api/addToCheckout')
            setData(response?.data)
        }
        dataFetch()
    }, [])
    const handlePost = async () => {
        const response = await axios.post('http://localhost:3500/api/getToken', {
            harga: TotalCost,
            first_name: "Gunawan",
            last_name: "Sulis"
        })
        setToken(response?.data?.token)
    }
    const TotalCost = data.reduce((sum, p) => sum + p.price, 0)

    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    });

    useEffect(() => {
        token && window?.snap?.pay(token)
    }, [token])

    return (
        <>
            <ul>
                {
                    data.map((list, index) => (
                        <li key={index}>
                            <a href={`/product/${list['id']}`} className='flex'>
                                <img className="w-16 mr-4" src={list['image']} alt={list['productName']} />
                                <p>{list['productName']}</p>
                            </a>
                        </li>
                    ))
                }
            </ul>
            <div>
                <p>Kirim ke alamat: Jakarta</p>
                <strong>Total belanja: {formatter.format(TotalCost)}</strong>
            </div>
            <button className="bg-blue-500 p-2 text-white font-bold tracking-wider rounded-lg py-3 mt-4" onClick={handlePost}>Bayar</button>
        </>
    )
}

export default Checkout