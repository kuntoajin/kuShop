const Success: React.FC = (): JSX.Element => {
    return (
        <div>
            <div className="flex justify-center h-[50vh] items-center flex-col">
                <p className="mb-10 text-4xl">Pembayaran berhasil!</p>
                <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:w-auto sm:text-sm">
                    <a href="/cart">Kembali ke keranjang</a>
                </button>
                <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:w-auto sm:text-sm mt-4">
                    <a href="/status">Lihat status pengiriman</a>
                </button>
            </div>
        </div>
    )
}

export default Success