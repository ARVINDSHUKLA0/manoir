import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group'; 

const CheckOutPopUp = ({ show, handleClose, showAddAddress, cartData, checkoutHandle  }) => { 
    const [addressDisplay, setAddressDisplay] = useState(false)
    const [address, setAddress] = useState()  
    const user = useSelector(store=>store.user[0]) 
    const addressAllData = useSelector(store=>store.address.data) 
    const productAllData = useSelector(store=>store.product.data) 
    const updateAddressFunc = async()=>{ 
        const findAdd = await addressAllData.find(data=> data._id === user.address) 
        setAddress(findAdd) 
    }
    const changeAddressFunc = (addressValue)=>{ 
        setAddress(addressValue)
        setAddressDisplay(false) 
    }

    useEffect(()=>{ 
        updateAddressFunc()
    }, [user, addressAllData])
  return (
    <CSSTransition
      in={show}
      timeout={900}
      classNames="popup"
      unmountOnExit
    >
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>CheckOut</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-3 align-items-top">
            <p className='fw-bold text-capitalize fit-content cl-blue'>address :- </p>
            <p>{address ? <> 
            <p className='fs-14'>{address.receiver}</p>
            <p className='fs-14'>{address.address} ,{address.state}, {address.pincode}</p>
            <small className='fs-12 '>{address.primaryNumber} , {address.secondaryNumber}</small>
             </> : null}</p>
          </div>
          
          <div className="text-end d-flex align-items-center justify-content-end gap-3"> 
          {!addressDisplay ?
            <small className='cl-blue pointer' onClick={()=>setAddressDisplay(true)}>change address</small>:null} 
            <small className='cl-blue pointer' onClick={()=>showAddAddress(true)}>add new address</small> 
          </div>
          {addressDisplay?
          <div className=" position-relative">
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary pointer " onClick={()=>setAddressDisplay(false)}>X </span>
            <div className='border p-2 rounded shadow-sm overflow-auto my-3 h-120'>
            {addressAllData.length > 0 && addressAllData.map((addressValue)=>{
                return( 
                    <div className="d-flex align-items-center gap-3 py-1 border-bottom border-bottom-not-last border-1" key={addressValue._id}>
                        <input type="radio" name="addressSelect" checked={address ? address._id === addressValue._id : false}  onChange={e=>changeAddressFunc(addressValue)} />
                        <div onClick={e=>changeAddressFunc(addressValue)}> 
                        <p>{addressValue.receiver}</p>
                        <p>{addressValue.address} , {addressValue.state  }, {addressValue.pincode}</p>
                        <small className='fs-12 '>{addressValue.primaryNumber} , {addressValue.secondaryNumber}</small>
                        </div>
                    </div>
                )
            })}
            </div>
          </div> : null} 
          {cartData ?  
          <div className='mt-3 border-top'> 
            <div className="table-response " >
                  <table className="table table-borderles table-sm">
                    <tbody>
            {cartData.product.map((productValue)=>{
                const product = productAllData.find(data=>data._id === productValue.productId)
                // console.log("product", product); 
                // console.log("productValue", productValue); 
              return( 
                <tr key={productValue.productId}>
                  <td><img src={`${product.thumbnailImage}`} style={{width:"50px"}} alt={product.altTag || "imofficial"} /></td>
                  <td > 
                  <p className='text-ellipsis w-180 '>{product.productName}</p>
                  </td> 
                  <td>{productValue.price} x </td> 
                  <td>{productValue.productQuantity} = </td>
                  <td>{productValue.price * productValue.productQuantity}</td> 
                </tr>  
              )
            })}
            </tbody>
                  </table>
                </div> </div>:null}

          <div className='border-bottom mb-2'>
            <div className="d-flex mb-1 px-2 align-items-center justify-content-between">
              <p className='cl-blue'>Total Selling Price</p>
              <p><span className='text-muted'> &#x20B9; </span>{cartData.totalproductPrice}</p>
            </div>
            {cartData.offerDiscount &&
            <div className="d-flex mb-1 px-2 align-items-center justify-content-between">
              <p className='cl-blue'>Offer Discount (&#x20B9;)</p>
              <p><span className='text-muted'>- &#x20B9; </span>{cartData.offerDiscount}</p>
            </div>}
            <div className="d-flex mb-1 px-2 align-items-center justify-content-between">
              <p className='cl-blue'>GST (5%)</p>
              <p><span className='text-muted'> &#x20B9; </span>{cartData.totalGst}</p>
            </div>
            <div className="d-flex mb-1 px-2 align-items-center justify-content-between">
              <p className='cl-blue'>Dilivery Charge</p>
              <p><span className='text-muted'> &#x20B9; </span>{cartData.diliveryCharge}</p>
            </div>
          </div>
          <div>
          <div className="d-flex px-2 align-items-center justify-content-between">
              <p className='cl-blue fw-bold'>Total</p>
              <p><span className='text-muted'> &#x20B9; </span> {cartData.totalCheckOut}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-blue btn-outline-blue  px-2 me-3 py-1" onClick={()=>checkoutHandle(address)}>
            Place Order
          </Button> 
        </Modal.Footer>
      </Modal>
    </CSSTransition>
  );
};

export default CheckOutPopUp;
