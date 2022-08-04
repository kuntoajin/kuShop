interface PropData {
    datas: []
}

const Home: React.FC<PropData> = ({datas}): JSX.Element => {
    return (
        <div className="content">
            <h1>KuShop</h1>
            <input type="text" />
            <div>
                <ul>
                    {datas?.map((product, index) => (
                            <li key={index}>
                                <a className="font-bold" href={`/product/${product['id']}`}>{product['title']}</a>
                                <img src={product['image']} alt={product['title']} width='50' height='50' />
                            </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Home