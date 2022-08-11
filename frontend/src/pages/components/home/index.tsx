import { useEffect, useState } from 'react'
import { collection, addDoc, Timestamp, doc, getDoc, CollectionReference } from 'firebase/firestore'
import { db } from '../../../../config/firebase'

interface PropData {
    datas: []
}
// console.log(db)
const Home: React.FC<PropData> = ({datas}): JSX.Element => {
    const [open, isOpen] = useState(true)
    datas.splice(9, 10)
    
    useEffect(() => {
        const dataFetch = async () => {
            const usersCollectionRef = collection(db, 'task')
            // const docSnap = await getDoc(usersCollectionRef)
        }
        dataFetch()
    }, [])

    const handleSubmit = async () => {
        // e.preventDefault()
        try {
          const response = await addDoc(collection(db, 'tasks'), {
            title: 'test 1',
            description: 'test juga 1',
            completed: false,
            created: Timestamp.now()
          })
          console.log(response)
        } catch (err) {
          alert(err)
        }
      }
    
    return (
        <div className="content">
            <header className="flex justify-center py-8 bg-blue-500 items-center">
                <h1 className='mx-3'>KuShop</h1>
                <ul className='mx-3 font-bold text-white'>Kategori</ul>
                <input type="text" className="w-7/12 h-10 outline-0 drop-shadow-md px-3 rounded-md" />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
</svg>
            </header>
            <div className='bg-blue-500 pb-8 rounded-b-lg'>
                <ul className={`flex justify-center px-3 ${open ? 'block' : 'hidden'}`}>
                    {datas?.map((product, index) => (
                        <li key={index} className='flex-1 mx-3 shadow-lg py-4 px-3 bg-white rounded-md'>
                            <a href={`/product/${product['id']}`}>
                                <div className='w-[50px] h-[100px] mx-auto'>
                                    <img src={product['image']} alt={product['title']} className="mx-auto w-28"/>
                                </div>
                                <p className="font-bold overflow-hidden truncate whitespace-normal">{product['title']}</p>
                            </a>
                        </li>
                    ))}
                </ul>
                <div className='flex justify-center pt-3'>
                    <button onClick={() => isOpen(!open)} className='font-bold text-white'>{open ? 'Tutup' : 'Tampilkan'}</button>
                </div>
            </div>
        </div>
    )
}

export default Home