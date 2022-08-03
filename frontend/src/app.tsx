import { useEffect, useState } from "react"
import axios from 'axios'

interface Data {
    datas: [];
    title: string;
    image: string;
}

const App: React.FC<{}> = () => {
    const [datas, setDatas] = useState<Data[]>([])

    useEffect(() => {
        const dataFetch = async () => {
            const response = await axios.get('https://fakestoreapi.com/products')
            setDatas([...response.data])
        }
        dataFetch()
    }, [])
    console.log(datas)
    return (
        <div className="container">
            <h1>KuShop</h1>
            <input type="text" />
            <div>
                {datas?.map((data, index) => (
                    <ul key={index}>
                        <li>
                            <p>{data.title}</p>
                            <img src={data.image} alt={data.title} />
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default App