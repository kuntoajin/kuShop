import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom"

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
    let {id} = useParams()

    useEffect(() => {
        // console.log(data)
        setSelectedProduct(datas?.find(data => data['id'] == id))
        // console.log(test)
    }, [datas])

    return (
        <div className="content">
            <h1>KuShop</h1>
            <input type="text" />
            <div>
                <p>{selectedProduct?.title}</p>
            </div>
        </div>
    )
}

export default Detail