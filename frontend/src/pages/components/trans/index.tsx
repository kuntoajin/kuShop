import axios from "axios"
import { useEffect, useState } from "react"

const Trans: React.FC = (): JSX.Element => {
    const [price, setPrice] = useState<number>(0)
    const [bankName, setBankName] = useState<string>('')
    const [vaNumbers, setVaNumbers] = useState<[]>([])

    useEffect(() => {
        const dataFetch = async () => {
            const response = await axios.get('http://localhost:3500/api/addToPayment')
            setPrice(response?.data?.data?.reduce((sum: any, p: any) => sum + p.price, 0))
            console.log(response?.data?.data)
        }
        dataFetch()
    }, [])

    const handlePost = async () => {
        const response = await axios.post('http://localhost:3500/api/getToken', {
            harga: price,
            first_name: "Gunawan",
            last_name: "Sulis",
            bank_transfer: bankName
        })
        setVaNumbers(response?.data?.va_numbers)
    }
    console.log(vaNumbers)
    return (
        <div>
            <p>Pilih Metode Pembayaran:</p>
            <label className="border p-6" htmlFor="bca">
                <input type="radio" name="bank_transfer" id="bca" value='bca' onChange={e => setBankName('bca')} />
                <span className="inline-block ml-4">BCA</span>
            </label>
            <label className="border p-6" htmlFor="bni">
                <input type="radio" name="bank_transfer" id="bni" value='bni' onChange={e => setBankName('bni')} />
                <span className="inline-block ml-4">BNI</span>
            </label>
            {
                vaNumbers?.map((data, index) => (
                    <div key={index}>
                        <p>{data['bank']}</p>
                        <p>{data['va_number']}</p>
                    </div>
                ))
            }
            <button className="bg-blue-500 p-2 text-white font-bold tracking-wider rounded-lg py-3 mt-4" onClick={handlePost}>
                Bayar
            </button>
        </div>
    )
}

export default Trans