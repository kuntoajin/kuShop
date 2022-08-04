import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";
import snap from '../../../library/snap.js'

interface PropData {
    datas?: [];
}

interface Data {
    id: number
    image: string
    title: string
}

const Detail: React.FC<PropData> = ({datas}): JSX.Element => {
    const [selectedProduct, setSelectedProduct] = useState<Data>()
    const [token, setToken] = useState<string>('')
    let {id} = useParams()

    useEffect(() => {
        // console.log(data)
        setSelectedProduct(datas?.find(data => data['id'] == id))
        // console.log(test)
    }, [datas])

    const handlePost = async () => {
        const response = await axios.post('http://localhost:3500/api/getToken', {
            harga: 50000,
            first_name: "Gunawan",
            last_name: "Sulis"
        })
        console.log(response)
        setToken(response?.data?.token)
    }

    useEffect(() => {
        token && snap.pay('TRANSACTION_TOKEN_HERE')
    })
    console.log(token)

    return (
        <div className="content">
            <h1>KuShop</h1>
            <script type="text/javascript"
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key="SB-Mid-client-WjzrUPLaHVUvMFJp"></script>
            <input type="text" />
            <div>
                <p>{selectedProduct?.title}</p>
                <img src={selectedProduct?.image} alt="" width='100' height='100' />
                <button className="bg-cyan-500 p-2" onClick={handlePost}>beli</button>
            </div>
        </div>
    )
}

export default Detail