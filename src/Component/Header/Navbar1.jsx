import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { cartdata } from '../../redux/slice/cart'
import { wishlistdata } from '../../redux/slice/wishlist'
import { removeuser } from '../../redux/slice/user'

const Navbar = (props) => {
    const cartAlldata = useSelector(store => store.cart.data)
    const wishlistalldata = useSelector(store => store.wishlist.data) 
    const [sidebarActive, setSidebarActive] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const { pageName } = props
    const navigate = useNavigate()
  const dispatch = useDispatch()


    const logout = ()=>{
        localStorage.removeItem("userdata")
        localStorage.removeItem("usertoken")
        dispatch(cartdata())
        dispatch(wishlistdata())
        dispatch(removeuser())
        setIsLogin(false)
        navigate('/')
      }

    useEffect(()=>{
        let checkAuth = localStorage.getItem('usertoken')
        if(checkAuth){ 
          setIsLogin(true)
        }
        else{ 
          setIsLogin(false)
        }
      })
    return (
        <>
            <nav>
                <div className="d-flex justify-content-between navbar px-4 ">
                    <div className="">
                        <Link to="/">
                            {pageName && pageName === 'Home' ? <img src="/assets/img/logo-long-white.png" alt="logo" style={{ width: "120px" }} /> : <img src="/assets/img/logo-long-dark.png" alt="logo" style={{ width: "120px" }} />
                            }
                        </Link>
                    </div>
                    <div>
                        <ul className="d-flex p-0 m-0 gap-3">
                            <li> 
                                <Link className="position-relative" to='/wishlist'>  
                                    <i className={`fa-regular fa-heart  ${pageName && pageName === 'Home' ? "text-white" : "text-dark"} `}> </i>
                                    {wishlistalldata.length > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill cl-pink ">{wishlistalldata.length} </span>}
                                </Link>
                            </li>
                            <li> 
                                <Link className="position-relative" to='/cart'>  
                                    <i className={`fa-solid fa-cart-shopping  ${pageName && pageName === 'Home' ? "text-white" : "text-dark"} `}></i>
                                    {cartAlldata.length > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill cl-pink ">{cartAlldata.length} </span>}
                                </Link>
                            </li>
                            
                            <li> 
                            {!isLogin ?
                                <Link className={`${pageName && pageName === 'Home' ? "text-white" : "text-dark"} `}  to='/login'> Login </Link> :
                                <span className={`${pageName && pageName === 'Home' ? "text-white" : "text-dark"} `} onClick={logout}> Logout </span>
                            }
                            </li>
                            <li>
                                <span onClick={() => { setSidebarActive(true) }}>
                                    <i className={`fa-solid fa-bars a-white  ${pageName && pageName === 'Home' ? "text-white" : "text-dark"}`}></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <aside className={` sidebar-wrapper ${sidebarActive ? "sidebar-active" : ""}`}>
                <div className="close-sidebar-box" onClick={() => { setSidebarActive(false) }}></div>
                <div className='sidebar-item-box shadow'>
                    <div>
                        <ul className="d-flex justify-content-end  gap-4 sidebar-ul ">
                            <li>
                                <a className="text-dark " href="#"><i className="fa-regular fa-heart"></i></a>
                            </li>
                            <li>
                                <a className="text-dark" href="#"><i className="fa-solid fa-cart-shopping"></i></a>
                            </li>
                            <li onClick={() => { setSidebarActive(!sidebarActive) }}>
                                <a className="text-dark" href="#"><i className="fa-solid fa-bars"></i></a>
                            </li>
                        </ul>

                    </div>
                    <div className="sidebar-margin-top">
                        <ul className="m-0">
                            <li className="mt-4">
                                <Link className="text-uppercase text-decoration-none text-dark sidebar-text" to="/">home</Link>
                            </li>
                            <li className="mt-4">
                                <Link to='/products/category/lifestyle' className="text-uppercase text-decoration-none text-dark sidebar-text">lisfestyle</Link>
                            </li>
                            <li className="mt-4">
                                <Link className="text-uppercase text-decoration-none text-dark sidebar-text">accessories</Link>
                            </li>
                            <li className="mt-4">
                                <Link className="text-uppercase text-decoration-none text-dark sidebar-text">customization</Link>
                            </li>
                            <li className="mt-4">
                                <Link className="text-uppercase text-decoration-none text-dark sidebar-text">about us</Link>
                            </li>
                            <li className="mt-4">
                                <Link className="text-uppercase text-decoration-none text-dark sidebar-text">contact us</Link>
                            </li>
                            {isLogin &&
                            <li className="mt-4">
                                <Link className="text-uppercase text-decoration-none text-dark sidebar-text" to='/profile'>My Profile</Link>
                            </li> }
                        </ul>
                    </div>

                </div>
            </aside>
        </>
    )
}

export default Navbar