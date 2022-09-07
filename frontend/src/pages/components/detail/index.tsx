import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";
import { currencyConverter } from '../../../library/currencyConverter'
import Modal from "../../../components/modal";

interface PropData {
    datas?: [];
}

interface Data {
    id: number
    image: string
    title: string
    price: number
    rating?: {
        rate?: number
    }
    priceShow: string
}

const Detail: React.FC<PropData> = ({datas}): JSX.Element => {
    const [selectedProduct, setSelectedProduct] = useState<Data>()
    const [token, setToken] = useState<string>('')
    const [usdToIdr, setUsdToIdr] = useState<string>('')
    const [openModal, isOpenModal] = useState<boolean>(false)
    let {id} = useParams()

    useEffect(() => {
        setSelectedProduct(datas?.find(data => data['id'] == id))
    }, [datas])

    const handlePost = async () => {
        const response = await axios.post('http://localhost:3500/api/getToken', {
            harga: 50000,
            first_name: "Gunawan",
            last_name: "Sulis"
        })
        setToken(response?.data?.token)
    }

    useEffect(() => {
        token && window?.snap?.pay(token)
    }, [token])

    const ratingProduct: undefined | number = selectedProduct?.rating?.rate && Math.floor(selectedProduct?.rating?.rate)
    let starRating: JSX.Element[] = []
    let decilmalRating: JSX.Element[] = []
    let noneRating: JSX.Element[] = []
    let showRating: number | undefined | string

    if(ratingProduct) {
        for(let i = 1; i <= ratingProduct; i++) {
            starRating.push(<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-yellow-500" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>)
        }
    }

    if(ratingProduct) {
        const decimalRatingProduct = selectedProduct?.rating?.rate && selectedProduct?.rating?.rate - ratingProduct
        const getLastRatingProduct = decimalRatingProduct && Math.ceil(decimalRatingProduct*100)

        decilmalRating.push(<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20">
              <linearGradient id="gradient-star-decimal">
                <stop stopColor="#eab308" offset={`${getLastRatingProduct}%`} />
                <stop stopColor="#64748b" offset={`${getLastRatingProduct}%`} />
            </linearGradient>
            <path className="star-rating-decimal" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        )
    }
    if(ratingProduct) {
        for(let i = 1; i <= (4-ratingProduct); i++) {
            noneRating.push(<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-slate-500" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>)
        }
    }

    if(selectedProduct?.rating?.rate && Number.isInteger(selectedProduct?.rating?.rate)) {
        showRating = selectedProduct?.rating?.rate && selectedProduct?.rating?.rate.toFixed(1)
    } else {
        showRating = selectedProduct?.rating?.rate
    }

    useEffect(() => {
        const dataFetch = async () => {
            const idrConverted = await currencyConverter(selectedProduct?.price)
            setUsdToIdr(idrConverted)
        }
        dataFetch()
    }, [selectedProduct])

    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });

    const priceIdr = formatter.format(selectedProduct?.price)

    return (
        <div className="content">
            <header className="flex">
                <h1>KuShop</h1>
                <input type="text" />
                <a href='/cart'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </a>
            </header>
            <div className="flex">
                <div className="h-96 w-80 border-4 rounded-lg border-blue-500 flex justify-center items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </div>
                </div>
                <div className="mx-8 border-r border-black">
                    <h1 className="text-4xl font-bold">{selectedProduct?.title}</h1>
                    <div className="flex items-center mt-3">
                        <p className="text-4xl font-bold text-blue-500">{priceIdr}</p>
                        <div className="flex ml-6">{starRating}</div>
                        <div className="flex">{decilmalRating}</div>
                        <div className="flex">{noneRating}</div>
                        <p className="text-lg ml-3">{`(${showRating})`}</p>
                        {openModal && <Modal 
                            name={selectedProduct?.title} 
                            price={selectedProduct?.price} 
                            image={selectedProduct?.image} 
                            isOpenModal={isOpenModal} 
                            id={selectedProduct?.id}
                            priceShow={priceIdr}
                        />}
                    </div>
                </div>
                <div className="w-52">
                    <button className="bg-blue-500 p-2 w-full text-white font-bold tracking-wider rounded-lg mb-4 py-3" onClick={() => isOpenModal(!openModal)}>Tambah Keranjang</button>
                    <button className="bg-blue-500 p-2 w-full text-white font-bold tracking-wider rounded-lg py-3" onClick={handlePost}>Beli</button>
                </div>
            </div>
        </div>
    )
}

export default Detail