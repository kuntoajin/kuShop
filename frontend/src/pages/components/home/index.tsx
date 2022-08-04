interface PropData {
    data: []
}

const Home: React.FC<PropData> = ({data}): JSX.Element => {
    return (
        <div className="content">
            <h1>KuShop</h1>
            <input type="text" />
            <div>
                <ul>
                    {data?.map((product, index) => (
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