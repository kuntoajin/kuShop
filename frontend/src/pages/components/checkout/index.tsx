import axios from "axios"
import { useEffect, useState } from "react"

const Checkout: React.FC = (): JSX.Element => {
    const [data, setData] = useState<[]>([])
    useEffect(() => {
        const dataFetch = async () => {
            const response = await axios.get('http://localhost:3500/api/addToCheckout')
            setData(response?.data)
        }
        dataFetch()
    }, [])
    return (
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
    )
}

export default Checkout