import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '@mui/material/Rating';
import { Modal, Button } from 'react-bootstrap'; 
import { CSSTransition } from 'react-transition-group'; 
import { Link, useNavigate } from 'react-router-dom'  
import { addCartApi, addWishlistApi } from '../../Api/api'
import { wishlistdata } from '../../redux/slice/wishlist';
import { cartdata } from '../../redux/slice/cart';
import UserAddressUpdateModel from './UserAddressUpdateModel';
import cartIcon from '/assets/icon/cart_icon.svg'
import wishlistIcon from '/assets/icon/wishlist_icon.svg'
import { toast } from 'react-toastify';


const ProductSmall = (props) => {
    const dispatch = useDispatch()  
    const navigation = useNavigate()
    const ratingAllData = useSelector(store=>store.rating.data)
    const {productData, newActive, saleActive=true} = props
    const [showModal, setShowModal] = useState(false)

    const addWishlistFunc = async(productId)=>{ 
        const userdata = localStorage.getItem('userdata')  
        const usertoken = localStorage.getItem('usertoken')  
        if(userdata && usertoken){
            const userdataobj = JSON.parse(userdata) 
            const userId = userdataobj._id   
            const productSize = await productData.productSize.filter(d => d.selected)[0].size 
            await addWishlistApi(userId, productId, productSize).then(()=>{ 
                dispatch(wishlistdata(userId))
            })
        }
        else{
            handleShow()
        }
    }
    const addtocart = async(product)=>{ 
        const productId = product._id 
        const userdata = localStorage.getItem('userdata') 
        const usertoken = localStorage.getItem('usertoken')
        
        if(product.totalProduct > 0){
        if(userdata && usertoken){  
            const userdataobj = JSON.parse(userdata) 
            const userId = userdataobj._id   
            await addCartApi(userId, productId, productData.productSize[0]).then(()=>{   
                dispatch(cartdata(userId))  
            })  
        }  
        else{  
            handleShow()  
        }}  
        else{
          toast.warning("Product Out Of Stock",  {autoClose: 1500,})
        }
    } 
    const handleShow = () =>{ 
        setShowModal(true)
      }; 
    const handleClose = () => setShowModal(false) 
    const logInFunc = ()=>{ 
        localStorage.setItem('locationHistory', window.location.pathname)
        navigation('/login')
    }
    
    const ratingData = ratingAllData.find(data=>data.productId === productData._id)
  return (
    <div className=" p-2 "> 
        <div className='text-center d-block product-img-box'>
            <Link to={`/productview/${productData.slug}/${productData._id}`}>
                <img src={`${productData.thumbnailImage}`} alt={productData.altTag || "doozie do"} className='img-fluid h-100 w-100'/>
            </Link>
            <div className="saveicon">
            <button className=' btn border-0 p-1 lh-1 text-muted wishicon d-block' onClick={()=>addWishlistFunc(productData._id)} >
              {/* <i className="fa-regular cl-darkLight fa-heart  fs-20 fs-sm-15 "></i> */}
              <img src={wishlistIcon} alt="dooziedo" />
              </button>
            <button className=' btn border-0 p-1 lh-1 text-muted carticon d-block' onClick={()=>addtocart(productData)}>
              {/* <i className="fa-solid fa-cart-shopping cl-darkLight fs-sm-15 fs-20 "></i> */}
              <img src={cartIcon} alt="dooziedo" />
              </button>
            </div>

            {newActive && <div className="newIcon position-absolute top-0 start-0 bgPrimary text-white py-0 px-1 fs-12 text-uppercase"> 
                <small className='text-uppercase'>new</small>
                </div>}
            {saleActive && productData.discount > 0 ?
            <div className="newIcon position-absolute top-0 start-0 bgDanger text-white py-0 px-lg-2 px-1  text-uppercase fs-12">  
                <small className='text-uppercase align-items-center'>Flat {productData.discount} 
                </small>
            </div>: null}
            {/* {!(productData.totalProduct > 0) ?
            <div className="position-absolute bottom-0 start-50 translate-middle-x bgPrimarySecond text-white px-3 text-uppercase max-width">out of stock</div>:null} */}
        </div>
        <div className='category-name-box'> 
            <Link to={`/productview/${productData.slug}/${productData._id}`} className='pt-2 d-block text-center mb-2 fs-xs-10'>{productData.productName}</Link>
        </div>
        
        <div className='d-flex align-items-end justify-content-center gap-2'>
            
            {productData.discount > 0 && <p className='text-decoration-line-through mb-0 fw-normal fs-14 fs-xs-10'>Rs. {productData.salePrice}</p>   } 

            <p className='mb-0 fs-xs-10 fw-bold'>  Rs.  {productData.discount > 0 ? productData.salePrice - Math.ceil(productData.salePrice * productData.discount/100) : productData.salePrice}</p>

            {productData.discount > 0 && <p className='mb-0 fw-normal textPrimarySecond fs-14 fs-xs-10'>({productData.discount} % off)</p>   } 
        </div>

        {ratingData &&
        <div className='d-flex align-items-center justify-content-center'> 
        <Rating name="half-rating-read" defaultValue={ratingData.avrageRating} precision={0.5} readOnly />
        <small className='ms-2 fs-xs-10'>({ratingData.totalRatingCount})</small>
        </div>} 
        <CSSTransition
      in={showModal}
      timeout={900}
      classNames="popup"
      unmountOnExit
    >
      <Modal show={showModal} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Need to log in</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
          <div className="d-flex gap-3 align-items-top">
            hello
          </div>
          
          
        </Modal.Body> */}
        <Modal.Footer>
          <Button className="btn btn-blue btn-outline-blue  px-2 me-3 py-1 text-capitalize" >
          <i className="fa-solid fa-left-long"></i> back to Products 
          </Button> 
          <Button className="btn btn-blue btn-outline-blue  px-2 me-3 py-1 text-capitalize" onClick={logInFunc} >
            Go to Sign In <i className="fa-solid fa-right-long"></i>
          </Button> 
        </Modal.Footer>
      </Modal>
    </CSSTransition>
    </div>
  )
}

ProductSmall.defaultProps = {
    // saleActive: true,
    newActive:false
  };

export default ProductSmall