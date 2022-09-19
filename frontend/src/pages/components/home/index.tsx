import { useEffect, useState } from 'react'
import { collection, addDoc, Timestamp, doc, getDoc, CollectionReference } from 'firebase/firestore'
import { db } from '../../../../config/firebase'
import axios from 'axios'

interface PropData {
    datas: []
}

interface Options {
    body: string
    dir: string
    image: string
}

const Home: React.FC<PropData> = ({datas}): JSX.Element => {
    const [open, isOpen] = useState(true)
    const [login, isLogin] = useState(false)
    const [username, setUsername] = useState('Guest')
    const [files, setFiles] = useState<[]>([])
    // datas.splice(9, 10)
    
    const handleLogout = async () => {
        const response = await axios.get('http://localhost:3500/api/logout')
        isLogin(response?.data?.isLogin)
    }

    function showNotification() {
        if (Notification.permission !== 'granted') {
          Notification.requestPermission().then(permission => {
            console.log(permission)
          })
        } else if(Notification.permission === 'granted') {
          console.log(Notification.permission)
        }
    }
    useEffect(() => {
        const dataFetch = async () => {
            const response = await axios.get('http://localhost:3500/api/getFiles')
            console.log(response)
            setFiles(response.data)
        }
        showNotification()
        dataFetch()
    }, [])

    useEffect(() => {
        // throw Error("error")
    }, [])

    return (
        <div className="content">
            <header className="flex justify-center py-8 bg-blue-500 items-center">
                <h1 className='mx-3'>KuShop</h1>
                <ul className='mx-3 font-bold text-white'>Kategori</ul>
                <input type="text" className="w-7/12 h-10 outline-0 drop-shadow-md px-3 rounded-md" />
                <a href="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </a>
                {
                    login ? (
                        <button onClick={handleLogout}>
                            <p className='text-white ml-4'>Logout</p>
                        </button>
                    ) : (
                        <button>
                            <a href='/login' className='text-white'>Login</a>
                        </button>
                    )
                }
                <p className='text-white font-bold ml-4'>{username}</p>
            </header>
            <div className='bg-blue-500 pb-8 rounded-b-lg'>
                <ul className={`flex justify-center px-3 ${open ? 'block' : 'hidden'}`}>
                    {files?.map((file, index) => (
                        <li key={index} className='flex-1 mx-3 shadow-lg py-4 px-3 bg-white rounded-md'>
                            <a href={`/product/${file['id']}`}>
                                <div className='flex justify-center'>
                                    {/* <img src={product['image']} alt={product['title']} className="mx-auto w-28"/> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                </div>
                                <p className="font-bold overflow-hidden truncate whitespace-normal">{file['filename']}</p>
                            </a>
                        </li>
                    ))}
                </ul>
                <div className='flex justify-center pt-3'>
                    <button onClick={() => isOpen(!open)} className='font-bold text-white'>{open ? 'Tutup' : 'Tampilkan'}</button>
                </div>
            </div>
            <button onClick={() => {throw Error("error")}}>error</button>
        </div>
    )
}

export default Home