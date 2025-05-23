import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import user from "../../assets/img/user.jpg"
import logo from "../../assets/img/logo.png" 
import { useDispatch, useSelector } from 'react-redux'
import userAvatar from'/assets/icon/userAvatar.webp'
import { wishlistdata } from '../../redux/slice/wishlist' 
import lockIcon from '/assets/icon/lock-solid.svg'
import lockOpenIcon from '/assets/icon/lock-open-solid.svg'
import { removeuser } from '../../redux/slice/user'
import { cartdata } from '../../redux/slice/cart'
import { Button } from '@mui/material'
import cartIcon from '/assets/icon/cart_icon.svg'
import wishlistIcon from '/assets/icon/wishlist_icon.svg'
import searchIcon from '/assets/icon/search_icon.svg'
import userIcon from '/assets/icon/user_icon.svg'

const stringToSlug = (str) => {
  return str
    .toLowerCase()  
    .replace(/\s+/g, '-')  
    .replace(/[^\w-]+/g, '')  
    .replace(/--+/g, '-')  
    .trim();  
};


const Navbar = () => {
  const cartAlldata = useSelector(store => store.cart.data)

  const categoryalldata = useSelector(store => store.category.data) 
  const subcategoryalldata = useSelector(store => store.subcategory.data) 
  const characteralldata = useSelector(store => store.character.data) 
  const subcharacteralldata = useSelector(store => store.subcharacter.data) 
  const wishlistalldata = useSelector(store => store.wishlist.data)  
  const [active, setActive] = useState(false) 
  const [isLogin, setIsLogin] = useState(false)
  const [activeClass, setActiveClass] = useState(" ") 
  const [navDropValue, setNavDropValue] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const navSearchBtn = (e)=>{

    e.preventDefault()
    let searchInput = document.getElementById("searchinput")
    searchInput.classList.add("nav-search-active")
  }
  const activesidebar = ()=>{ 
    if(active == true){
      setActive(false)
      setActiveClass(" ")
    }
    else{
      setActive(true)
      setActiveClass("nav-active ")
    }
  }

  const logout = ()=>{
    localStorage.removeItem("userdata")
    localStorage.removeItem("usertoken")
    dispatch(cartdata())
    dispatch(wishlistdata())
    dispatch(removeuser())
    setIsLogin(false)
    navigate('/')
  }

  const dropdownFunc = async(value)=>{
    setActive(false)
    setActiveClass(" ")
    if(navDropValue === value){
      setNavDropValue('')
    } 
    else{setNavDropValue(value)}
    
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
    <nav className='bg-light-gra border bg-white position-relative shadow-sm'>
        <div className="container ">
            <div className="d-flex pt-lg-3 nav-container align-items-top justify-content-between h-100 nav-wrap">

                <div className='logo-box'>
                    <Link to="/" onClick={()=>dropdownFunc()}> 
                    <img src={logo} alt="doozie do" className='navbar-logo'/> 
                    </Link>
                </div> 

                <div className="nav-hamburger">
                  <button type='button' className='btn' onClick={activesidebar}><i className="fa-solid fa-bars" ></i></button>
                </div> 

                <div className={`d-flex align-items-center justify-content-between flex-grow-1 h-100 nav-link-box ${activeClass}`} id='nav-link-box'>
                   
                  <div className='flex-grow-1 navbar-list-wrap  '>
                      <ul className='navbar-list-box align-items-end flex-grow-1  justify-content-between w-100'>
                        <li className={`nav-item ${navDropValue === 'Characters' && 'nav-active'}`}  onClick={()=>dropdownFunc('Characters')}>
                          <span className='text-uppercase cl-darkLight fw-bold'>Characters</span>
                        </li>  
                        <li className={`nav-item ${navDropValue === 'Shop' && 'nav-active'}`} onClick={()=>dropdownFunc('Shop')}>
                          <span  className='text-uppercase cl-darkLight fw-bold '>Shop
                          </span> 
                        </li>  
                        <li className={`nav-item `} onClick={()=>dropdownFunc("")}>
                          <span className='text-uppercase cl-darkLight fw-bold' >Theme</span>
                        </li>  
                        <li className={`nav-item `} onClick={()=>dropdownFunc("")}>
                          <span className='text-uppercase cl-darkLight fw-bold' >Community</span>
                        </li>
                        <li className={`nav-item `} onClick={()=>dropdownFunc("")}>
                          <Link className='text-uppercase cl-darkLight fw-bold' >About</Link>
                        </li>  
                         
                        
                        {categoryalldata.slice(0, 0).map((cv, i)=>{
                          return(
                            <li className='nav-item' key={i}>
                            <Link className='text-capitalize'>{cv.category}<i className="fa-solid nav-angle fa-angle-down"></i></Link>
                              <ul  className='nav-drop nav-sub-category shadow border border-2 rounded bg-white '>  

                                {subcategoryalldata.filter(data => data.category === cv.category).map((value, index)=>{ 
                                  return( 
                                    <li className='nav-drop-item nav-sub-category-li' key={index}> 
                                      <Link className='nav-sub-category-a'>{value.subcategory} <i className="fa-solid nav-sub-angle fa-angle-right"></i></Link>
                                      <ul  className='nav-size-wise shadow border border-2 rounded bg-white w-100'> 
                                      <li className='w-100'><Link to={`/category-wise/${cv.category}/${value.subcategory}/big`}>big</Link></li> 
                                      <li className='w-100'><Link to={`/category-wise/${cv.category}/${value.subcategory}/small`}>small</Link></li>  
                                      </ul> 
                                    </li> 
                                  )
                                })}  
                              </ul>
                          </li>
                          )
                        })}  
                      </ul>
                  </div>  
                  <div className='nav-side-cut text-end w-100 pe-4 py-3'>
                    <div className="nav-hamburger">
                      <button type='button' className='btn' onClick={activesidebar}><i className="fa-solid fa-xmark fa-lg"></i></button>
                    </div> 
                  </div> 
                </div> 
                <div className='d-flex nav-user-side ms-md-2 gap-3 align-items-top'> 
                  <div className='d-flex gap-3  '>
                      <form className=''>
                        <div className='d-flex align-items-center justify-content-center nav-search-box'> 
                        <button className='border-0 bg-transparent' onClick={e=>navSearchBtn(e)}>
                          <img src={searchIcon} alt="dooziedo" />
                          </button>
                        </div>
                      </form>  
                      <Link  className="position-relative" to='/wishlist'> 
                      <img src={wishlistIcon} alt="dooziedo" />
                      {wishlistalldata.length > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill cl-pink ">{wishlistalldata.length} </span> }
                      </Link>
                      <Link  className="position-relative" to='/cart'>
                        
                        <img src={cartIcon} alt="dooziedo" />
                      {cartAlldata.length > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill cl-pink ">{cartAlldata.length} </span> }
                      </Link>
                  </div>
                  <span className='position-relative nav-user-wrap justify-content-center'> 
                    <div className="navUserIconWrappe nav-use bg-white "> 
                      <img src={userIcon} alt="" className='img-fluid'/> 
                    </div>
                    <div className='position-absolute  pt-3 end-0 nav-user-drop-wrap '>
                      <div className="nav-user-drop-box list-group"> 
                          {isLogin ? <>
                          <Link to={'/profile'} className="list-group-item py-1 list-group-item-action d-flex flex-no-wrap align-items-center gap-2"><img src={userIcon} alt="doozie do" /> Profile</Link>
                          <button onClick={e=>logout(e)} className="list-group-item py-1 list-group-item-action d-flex flex-no-wrap align-items-center gap-2"><img src={lockIcon} alt="doozie do" /> Log Out</button> </> :
                          <Link to={'/login'} className="list-group-item py-1 list-group-item-action d-flex flex-no-wrap align-items-center gap-2"><img src={lockOpenIcon} alt="doozie do" /> Login</Link> } 
                      </div>
                    </div>
                  </span>
                </div>

            </div>
        </div> 
        {navDropValue == 'Characters' && <Characters dropdownFunc={dropdownFunc}/>}
        {navDropValue == 'Shop' && <Shop dropdownFunc={dropdownFunc}/>}
    </nav>  
    <Outlet/>
    </>
  )
}  
const Characters = (props)=>{
  const {dropdownFunc} = props
  const characteralldata = useSelector(store=>store.character.data)
  const subcharacteralldata = useSelector(store=>store.subcharacter.data)
  return(
    <div className='dropbox-fix-wrap shadow-sm border-bottom'>
          <div className="border-top pt-4">
            <div className="container">
              <div className="row">
                {characteralldata && characteralldata.map(characterValue=>{
                  return(
                    <div className="col-lg-3 col-sm-6 col-12" key={characterValue._id}>
                  <div className="heading pe-5 fw-bold">
                      <h3 className='text-capitalize border-bottom border-dark border-2 mb-3 pb-2 cl-blue'>{characterValue.character}</h3>
                  </div>
                  <div className="heading-list mb-4">
                    <div>
                    <Link to={`/products/character/${stringToSlug(characterValue.character)}`}onClick={()=>dropdownFunc('')}>All</Link> 
                    </div>
                    <div className="row"> 
                    {subcharacteralldata && subcharacteralldata.filter(data=>data.character === characterValue.character).map(subcharacterValue =>{
                      return(
                        <div className="col-6" key={subcharacterValue._id}>
                        <Link to={`/products/character/${stringToSlug(characterValue.character)}?subcharacter=${stringToSlug(subcharacterValue.subcharacter)}`} onClick={()=>dropdownFunc('')} className='text-capitalize'>{subcharacterValue.subcharacter}</Link>
                        </div>
                      )
                    })} 
                    </div>
                  </div>  
                </div> 
                  )
                })}
                
              </div>
            </div>
          </div>
          <h6 className="removebtn border border-2 rounded px-2 border-secondary" onClick={()=>dropdownFunc('')}>
            X
          </h6>

        </div>
  )
}
 const Shop = (props)=>{
  const {dropdownFunc} = props
  const categoryalldata = useSelector(store=>store.category.data)
  const subcategoryalldata = useSelector(store=>store.subcategory.data)
  return(
    <div className='dropbox-fix-wrap shadow-sm border-bottom'>
          <div className="border-top pt-4">
            <div className="container">
              <div className="row">
                {categoryalldata && categoryalldata.map(categoryValue=>{
                  return(
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={categoryValue._id}>
                  <div className="heading pe-5">
                      <h3 className='text-capitalize cl-blue border-bottom border-dark border-2 mb-3 pb-2 '>{categoryValue.category}</h3>
                  </div>
                  <div className="heading-list mb-4">
                    <div>
                    <Link to={`/products/category/${stringToSlug(categoryValue.category)}`} onClick={()=>dropdownFunc('')}>All</Link>
                    </div>
                    {subcategoryalldata && subcategoryalldata.filter(data=>data.category === categoryValue.category).map(subcategoryValue =>{
                      return(
                        <div key={subcategoryValue._id}>
                        <Link to={`/products/category/${stringToSlug(categoryValue.category)}?subcategory=${stringToSlug(subcategoryValue.subcategory)}`} onClick={()=>dropdownFunc('')} className='text-capitalize'>{subcategoryValue.subcategory}</Link>
                        </div>
                      )
                    })} 
                  </div>  
                </div> 
                  )
                })}
                
              </div>
            </div>
          </div>
          <h6 className="removebtn border border-2 rounded px-2 border-secondary" onClick={()=>dropdownFunc('')}>
            X
          </h6>

        </div>
  )
} 


export default Navbar