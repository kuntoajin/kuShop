import { useEffect, useState } from "react"

const Status: React.FC = (): JSX.Element => {
    const [status, setStatus] = useState<number>(0)
    const [listStatus, setListStatus] = useState<string[]>([])
    const allStatus = ['Barang diambil', 'Barang sampai gudang', 'Barang sampai kota tujuan', 'Barang diantar', 'Barang sampai tujuan']
    
    useEffect(() => {
        const update = setInterval(() => {
            if(status < 5) {
                setStatus(() => status + 1)
            }
        }, 4000)

        setListStatus(() => [...listStatus, allStatus[status]])

        return () => clearInterval(update);
    }, [status])
    console.log(status)

    return (
        <div>
            <div className="flex justify-center h-screen items-center flex-col">
                <p className="mb-10 text-4xl">{listStatus.map((list, index) => <ol><li key={index}>{list}</li></ol>)}</p>
            </div>
        </div>
    )
}

export default Status