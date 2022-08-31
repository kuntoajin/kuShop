/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import axios from 'axios'

type PropData = {
    price?: number | string
    isOpenModal: (openModal: boolean) => void
    name?: string
    image?: string
    id?: number
    priceShow?: string
}

type DataProductCart = {
    name: string
}

const Modal: React.FC<PropData> = ({ price, isOpenModal, name, image, id, priceShow }) => {
  const [open, setOpen] = useState(true)
  const [quantity, setQuantity] = useState<number | string>(1)
  const ListProducts: DataProductCart[] | string = []
  const cancelButtonRef = useRef(null)

    const addToCart = async () => {
      const response = await axios.post('http://localhost:3500/api/addToCart', {
        productName: name,
        price,
        priceShow,
        image,
        id,
        quantity
      })
        isOpenModal(false)
    }
    console.log(priceShow)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={isOpenModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ShoppingCartIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Tambah ke keranjang?
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <div className='px-4 py-3 sm:px-6 sm:flex'>
                    <img src={image} alt="" className='w-12 mr-4'/>
                    <div className='flex flex-1 flex-col'>
                      <div className='flex justify-between'>
                        <p className="text-gray-500 font-bold">
                            {name}
                        </p>
                        <p className="text-gray-500">{priceShow}</p>
                      </div>
                      <div>
                        <input 
                          className='border-2' 
                          type="number" 
                          id="quantity" 
                          name="quantity" 
                          min='1' 
                          defaultValue='1' 
                          onChange={e => setQuantity(e.target.value)}
                        />
                      </div>
                    </div>
                </div>
                <div className='px-4 py-3 sm:px-6 sm:flex'>
                    <div className='border-t border-black w-full sm:flex justify-between'>
                        <p className="text-gray-500 font-bold">
                            Total
                        </p>
                        <p className="text-gray-500 font-bold">
                            {priceShow}
                        </p>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={addToCart}
                  >
                    Tambah Keranjang
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Batal
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal