import React, { useState, useEffect } from 'react'
import ErrorBox from '../Errorbox/Errorbox'
import DeleteModal from '../DeleteModal/DeleteModal'
import EditModal from '../EditModal/EditModal'
import {AiOutlineDollarCircle} from 'react-icons/ai'

export default function Orders() {

  const [orders, setOrders] = useState([])
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [mainOrderID, setMainOrderId] = useState(null)

  const [orderNewNameProduct, setOrderNewNameProduct] = useState('')
  const [orderNewDate, setOrderNewDate] = useState('')
  const [orderNewHour, setOrderNewHour] = useState('')
  const [orderNewPrice, setOrderNewPrice] = useState('')
  const [orderNewOff, setOrderNewOff] = useState('')
  const [orderNewCount, setOrderNewCount] = useState('')
  const [orderNewPopularity, setOrderNewPopularity] = useState('')

  useEffect(() => {
   getAllOrders()
  } , [])

  function getAllOrders() {
    fetch('http://localhost:8000/api/orders')
    .then(res => res.json())
    .then(order => setOrders(order))
  }

  const closeDeleteModal = () => setIsShowDeleteModal(false)
  const closeEditModal = () => setIsShowEditModal(false)

  const removeOrder = () => {
    fetch(`http://localhost:8000/api/orders/${mainOrderID}` , {
      method: 'DELETE'
    }).then(res => res.json())
      .then(result => {
        setIsShowDeleteModal(false)
        getAllOrders()
      })
  }

  const editOrders = (event) => {
    event.prventDefault();

    const newInfosOrder = {
      productID: orderNewNameProduct,
      date: orderNewDate,
      hour: orderNewHour,
      price: orderNewPrice,
      off: orderNewOff,
      count: orderNewCount,
      popularity: orderNewPopularity
    }

    fetch(`http://localhost:8000/api/orders/${mainOrderID}` , {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newInfosOrder)
    }).then(res => res.json())
      .then(result => {
        setIsShowEditModal(false)
        getAllOrders()
      })
  }

  return (
    <div className='cms-table'>
      <h1 className='cms-title'>لیست سفارشات</h1>
      {
        orders.length ? (
          <table>
           <thead>
            <tr>
            <th>نام کالا</th>
            <th>تاریخ</th>
            <th>ساعت</th>
            <th>قیمت</th>
            <th>تخفیف</th>
            <th>تعداد فروش</th>
            <th>محبوبیت کالا</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map(order => (
                <tr key={order.id}>
                  <td>{order.productID}</td>
                  <td>{order.date}</td>
                  <td>{order.hour}</td>
                  <td>{order.price}</td>
                  <td>{order.off}%</td>
                  <td>{order.count}</td>
                  <td>{order.popularity}%</td>
                  <td>
                    <button onClick={() => {
                      setIsShowDeleteModal(true)
                      setMainOrderId(order.id)
                    }}>حذف</button>
                    <button onClick={() => {
                      setIsShowEditModal(true)
                      setMainOrderId(order.id)
                      setOrderNewNameProduct(order.productID)
                      setOrderNewDate(order.date)
                      setOrderNewHour(order.hour)
                      setOrderNewPrice(order.price)
                      setOrderNewOff(order.off)
                      setOrderNewCount(order.count)
                      setOrderNewPopularity(order.popularity)
                    }}>ویرایش</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
          </table>
        ) : (
          <ErrorBox msg="هیچ سفارشی یافت نشد" />
        )
      }

      {isShowDeleteModal && <DeleteModal title='آیا از حذف اطمینان دارید؟' cancelAction={closeDeleteModal} submitAction={removeOrder} />}

      {isShowEditModal && <EditModal onClose={closeEditModal} onSubmit={editOrders}>
        <div className='edit-user-info-input-group'>
        <span><AiOutlineDollarCircle/></span>
        <input type='text' className='edit-user-info-input' value={orderNewNameProduct} onChange={(event) => setOrderNewNameProduct(event.target.value)} placeholder='مقدار جدید را وارد نمایید' />
        </div>
        <div className='edit-user-info-input-group'>
        <span><AiOutlineDollarCircle/></span>
        <input type='text' className='edit-user-info-input' value={orderNewDate} onChange={(event) => setOrderNewDate(event.target.value)} placeholder='مقدار جدید را وارد نمایید' />
        </div>
        <div className='edit-user-info-input-group'>
        <span><AiOutlineDollarCircle/></span>
        <input type='text' className='edit-user-info-input' value={orderNewHour} onChange={(event) => setOrderNewHour(event.target.value)} placeholder='مقدار جدید را وارد نمایید' />
        </div>
        <div className='edit-user-info-input-group'>
        <span><AiOutlineDollarCircle/></span>
        <input type='text' className='edit-user-info-input' value={orderNewPrice} onChange={(event) => setOrderNewPrice(event.target.value)} placeholder='مقدار جدید را وارد نمایید' />
        </div>
        <div className='edit-user-info-input-group'>
        <span><AiOutlineDollarCircle/></span>
        <input type='text' className='edit-user-info-input' value={orderNewOff} onChange={(event) => setOrderNewOff(event.target.value)} placeholder='مقدار جدید را وارد نمایید' />
        </div>
        <div className='edit-user-info-input-group'>
        <span><AiOutlineDollarCircle/></span>
        <input type='text' className='edit-user-info-input' value={orderNewCount} onChange={(event) => setOrderNewCount(event.target.value)} placeholder='مقدار جدید را وارد نمایید' />
        </div>
        <div className='edit-user-info-input-group'>
        <span><AiOutlineDollarCircle/></span>
        <input type='text' className='edit-user-info-input' value={orderNewPopularity} onChange={(event) => setOrderNewPopularity(event.target.value)} placeholder='مقدار جدید را وارد نمایید' />
        </div>
        </EditModal>}

    </div>
  )
}
