import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type DataLogin = {
    username?: string
    status?: string
}

const Login: React.FC = (): JSX.Element => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [dataLogin, setDataLogin] = useState<DataLogin>()

    let navigate = useNavigate()

    const onLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:3500/api/login', {
            username, password
        })

        setDataLogin({
            username: response?.data?.username,
            status: response?.data?.success
        })
        // console.log(response.data)
        if(response?.data?.success) {
            navigate("/", { replace: true })
        }
    }
    return (
        <form onSubmit={onLogin} className='flex justify-center items-center h-screen'>
            <div className="flex flex-col bg-blue-500 p-6">
                <input type="text" className="inline-block mb-3" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" className="inline-block mb-3" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                <button>Login</button>
            </div>
        </form>
    )
}

export default Login