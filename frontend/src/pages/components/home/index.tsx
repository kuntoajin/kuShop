interface PropData {
    datas: []
}

const Home: React.FC<PropData> = ({datas}): JSX.Element => {
    datas.splice(9, 10)
    
    return (
        <div className="content">
            <header className="flex justify-center">
                <h1>KuShop</h1>
                <ul>Kategori</ul>
                <input type="text" className="outline outline-offset-2 outline-1 outline-emerald-500" />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
</svg>
            </header>
            <div>
                <ul className='flex'>
                    {datas?.map((product, index) => (
                        <li key={index}>
                            <img src={product['image']} alt={product['title']} width='50' height='50' />
                            <a className="font-bold overflow-hidden truncate w-5" href={`/product/${product['id']}`}>{product['title']}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Home