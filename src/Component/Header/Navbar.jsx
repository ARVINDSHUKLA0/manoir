import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { cartdata } from '../../redux/slice/cart'
import { wishlistdata } from '../../redux/slice/wishlist'
import { removeuser } from '../../redux/slice/user'  
import CartSidebar from '../Footer/CartSidebar'

const Navbar = (props) => {
    const categoryAllData = useSelector(store => store.category.data)
    const subCategoryAllData = useSelector(store => store.subcategory.data)
    const cartAlldata = useSelector(store => store.cart.data)
    const wishlistalldata = useSelector(store => store.wishlist.data)
    const [sidebarActive, setSidebarActive] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const { pageName } = props
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [sideSearchOpen, setSideSearchOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [sidebarDropdown, setSidebarDropdown] = useState(0)
    const [sidebarContact, setSidebarContact] = useState(true)
    const [sidebarImage, setSidebarImage] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0); 
    const toggleDropdown = (index) => { 
        setActiveIndex(prevIndex => prevIndex === index ? null : index);
    };
    const items = [
        {
            title: "Textiles",
            submenu: [
                "Table linens",
                "Table runners",
                "Cocktail linens",
                "Table placements",
            ]
        },
        {
            title: "Bed",
            submenu: [
                "Bedding Sets",
                "Quilts",
                "Duvet Covers & Shams",
                "Duvet Inserts & Sham fillers",
                "Coverlets",
                "Sheets & Pillows",
                "Throws",
                "Dećo Sets",
                "Shop by Room"
            ]
        },
        {
            title: "Bathware Assortment",
            submenu: ["Unveiling Shortly"]
        }
    ];





    const sidebarDropdownHandle = (i, dropdownStatus) => {
        setSidebarDropdown(i)
        if (dropdownStatus) {
            setSidebarImage(true)
            setSidebarContact(false)
        }
        else {
            setSidebarImage(false)
            setSidebarContact(true)
            openSidebar()
        }

    }

    const openSearchSidebar = () => {
        setSideSearchOpen(!sideSearchOpen)
    }
    const openSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const stringToSlug = (str) => {
        return str
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .trim();
    };
    const logout = () => {
        localStorage.removeItem("userdata")
        localStorage.removeItem("usertoken")
        dispatch(cartdata())
        dispatch(wishlistdata())
        dispatch(removeuser())
        setIsLogin(false)
        navigate('/')
    }

    useEffect(() => {
        let checkAuth = localStorage.getItem('usertoken')
        if (checkAuth) {
            setIsLogin(true)
        }
        else {
            setIsLogin(false)
        }


    })



    return (
        <>  
          <CartSidebar/>
            <nav className="py-3">
                <div className="container-fluid px-md-4">
                    <div className="row align-items-center">
                        <div className="col-4">
                            <div className="d-flex align-items-center gap-2">
                                <button className="btn btn-lg" onClick={openSidebar}>
                                    <i className="fa-solid fa-bars"></i>
                                </button>
                                {/* <p className="mb-0 fs-16 d-md-block d-none">Menu</p>
                                <button className="btn btn-lg d-lg-block d-none" onClick={openSearchSidebar}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button> */}
                            </div>
                        </div>
                        <div className="col-4 text-center">
                            <img src="/assets/img/logo.png" alt="" className="logo-img" />
                        </div>
                        <div className="col-4">
                            <div className="d-flex align-items-center justify-content-end gap-4">


                                <select name="language" id=""
                                    className="bg-transparent border-0 border-bottom border-bottom-1 border-dark fs-16 d-md-block d-none">
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                </select>
                                <button className="btn rounded-0 border border-dark px-4 py-1 d-lg-block d-none">Reserve</button>
                                <button className="btn btn-lg d-lg-none d-block" onClick={openSearchSidebar}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </nav>

            <section id="searchsidebar" className="searchsidebar bg-white position-fixed top-0  p-md-4 p-2 z-index-3 shadow" style={{ left: `${sideSearchOpen ? '0%' : "-100%"}` }}>
                <div className="text-end">
                    <button className="btn" onClick={openSearchSidebar}><i className="fa-solid fa-xmark fa-xl"></i></button>
                </div>
                {/*  
                <div>
                    <form action="" className="mb-2">
                        <p className="fs-16 mb-1">Search</p>
                        <input type="text" name="" id="" placeholder="Enter Search Item"
                            className="d-block w-100 border-0 border-bottom border-bottom-1 border-dark no-focus" />
                    </form>
                    <div className="text-end">
                        <button className="bg-dark text-white py-1 px-4 border-0">Search</button>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">

                </div>
                */}
            </section>

            {/* <section id="sidebar" className="sidebar bg-white position-fixed  top-0  p-md-5 p-2 z-index-3 shadow shadow-lg" style={{ left: `${sidebarOpen ? '0%' : "-100%"}` }}>
                <div className="sidebar-inner-wrapper position-relative d-flex flex-wrap justify-content-between">

                    <div className="d-flex align-items-center justify-content-between mb-5 position-absolute w-100 top-0 ">
                        <div>
                            <img src="/assets/img/logo.png" alt="manoir" width="100" />
                        </div>

                        <button className="btn" onClick={openSidebar}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>

                    <div className="sidebar-list-wrapper">
                        <ul className="sidebar-list border-secondary">
                            {categoryAllData.map((categoryValue, i) => {
                                const subcategory = subCategoryAllData.filter((sub) => sub.category === categoryValue.category)
                                return (
                                    <li className="mb-2" key={categoryValue._id}>
                                        {subcategory?.length > 0 ?
                                            <button className="sidebar-list-link d-flex align-items-cnter justify-content-between w-100 border-0 bg-transparent gap-3 fs-20 fs-sm-16" onClick={() => sidebarDropdownHandle(i + 1, subcategory?.length > 0)}> <span className='text-capitalize'> {categoryValue.category}</span><span><i
                                                className="fa-solid fa-angle-right fs-16 fs-sm-14"></i></span>
                                            </button> :
                                            <Link to={`/products/category/${stringToSlug(categoryValue.category)}`} className="text-muted fs-20 fs-sm-16 text-capitalize" onClick={() => sidebarDropdownHandle(i + 1, subcategory?.length > 0)}>{categoryValue.category}</Link>}

                                        {subcategory?.length > 0 &&
                                            <div className={`position-absolute top-0 start-100 sidebar-dropdown-wrap ${sidebarDropdown == i + 1 ? "" : "d-none"}`}>
                                                <ul>
                                                    {subcategory?.map((subcategoryValue) => (
                                                        <li className="pb-2" key={subcategoryValue._id}><Link to={`/products/category/${stringToSlug(categoryValue.category)}?subcategory=${stringToSlug(subcategoryValue.subcategory)}`} className="fs-18 fs-sm-15 text-dark text-capitalize" onClick={openSidebar}>{subcategoryValue.subcategory}</Link></li>
                                                    ))}
                                                </ul>
                                            </div>}

                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    {sidebarContact &&
                        <div className="sidebar-right-side-wrapper flex-grow-1 ">
                            <div className="border rounded p-4 shadow w-100 d-lg-block d-none">
                                <div>
                                    <h2 className="text-center"> Contact With Us</h2>
                                </div>
                                <form action="">
                                    <div className="mb-4">
                                        <p className="mb-1">Name</p>
                                        <input type="text" name="" id="" placeholder="Enter Your Full Name"
                                            className="d-block w-100 border-0 border-bottom border-bottom-1 border-secondary no-focus border-secondary-subtle" />
                                    </div>
                                    <div className="mb-4">
                                        <p className="mb-1">Email</p>
                                        <input type="text" name="" id="" placeholder="Enter Your Email"
                                            className="d-block w-100 border-0 border-bottom border-bottom-1 border-secondary no-focus border-secondary-subtle" />
                                    </div>
                                    <div className="mb-5">
                                        <p className="mb-1">Phone</p>
                                        <input type="text" name="" id="" placeholder="Enter Your Mobile Number"
                                            className="d-block w-100 border-0 border-bottom border-bottom-1 border-secondary no-focus border-secondary-subtle" />
                                    </div>
                                    <div>
                                        <button className="text-center btn form-control btn-secondary">Click</button>
                                    </div>
                                </form>
                            </div>
                        </div>}
                    {sidebarImage &&
                        <div className="sidebar-right2-side-wrapper ">
                            <div>
                                <div>
                                    <img src="/assets/img/villas.jpg" alt="manoir" className="img-fluid" />
                                </div>
                            </div>
                        </div>}
                </div>

            </section> */}

            <section id="sidebar" className="sidebar bg-white position-fixed  top-0  p-md-5 p-2 z-index-3 shadow shadow-lg" style={{ left: `${sidebarOpen ? '0%' : "-100%"}` }}>
                <div className="sidebar-inner-wrapper position-relative d-flex flex-wrap justify-content-between">

                    <div className="d-flex align-items-center justify-content-between mb-5 position-absolute w-100 top-0 ">
                        <div>
                            <img src="./assets/img/logo.png" alt="manoir" width="100" />
                        </div>

                        <button className="btn" onClick={openSidebar}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>

                    <div className="sidebar-list-wrapper">
                        <div className="sidebar-list-wrapper position-relative">
                            <ul className="sidebar-list border-secondary">
                                {items.map((item, index) => (
                                    <li className="mb-2 position-relative pe-5" key={index}>
                                        <button
                                            onClick={() => toggleDropdown(index)}
                                            className="sidebar-list-link d-flex align-items-center justify-content-between w-100 border-0 bg-transparent gap-3 fs-17 fs-sm-16"
                                        >
                                            <span className='fs-16'>{item.title}</span>
                                            <span>
                                                <i className={`fa-solid fa-angle-right fs-16 fs-sm-14 ${activeIndex === index ? '' : ''}`}></i>
                                            </span>
                                        </button>

                                        {activeIndex === index && (
                                            <div className="sidebar-dropdown-wrap position-absolute top-0 postion-section">
                                                <ul className="m-0 p-0 list-unstyled">
                                                    {item.submenu.map((subItem, i) => (
                                                        <li className="pb-2" key={i}>
                                                            <Link to="/category" className="fs-16 fs-sm-15 text-dark">{subItem}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </li>
                                ))}
                                <li className="mb-2"><Link className="text-muted fs-17 fs-sm-16">Bedroom</Link></li>
                                <li className="mb-2"><Link className="text-muted fs-17 fs-sm-16">Living Lounge</Link></li>
                                <li className="mb-2"><Link className="text-muted fs-17 fs-sm-16">Office Space</Link></li>
                                <li className="mb-2"><Link className="text-muted fs-17 fs-sm-16">Entertainment Area</Link></li>
                                <li className="mb-2"><Link  className="text-muted fs-17 fs-sm-16">Kids Room</Link></li>
                            </ul>
                        </div>

                    </div>





                    <div className="sidebar-right-side-wrapper flex-grow-1 ">
                        <div className="border rounded p-4 shadow w-100 d-lg-block d-none">
                            <div>
                                <h2 className="text-center"> Contact With Us</h2>
                            </div>
                            <form action="">
                                <div className="mb-4">
                                    <p className="mb-1">Name</p>
                                    <input type="text" name="" id="" placeholder="Enter Your Full Name"
                                        className="d-block w-100 border-0 border-bottom border-bottom-1 border-secondary no-focus border-secondary-subtle" />
                                </div>
                                <div className="mb-4">
                                    <p className="mb-1">Email</p>
                                    <input type="text" name="" id="" placeholder="Enter Your Email"
                                        className="d-block w-100 border-0 border-bottom border-bottom-1 border-secondary no-focus border-secondary-subtle" />
                                </div>
                                <div className="mb-5">
                                    <p className="mb-1">Phone</p>
                                    <input type="text" name="" id="" placeholder="Enter Your Mobile Number"
                                        className="d-block w-100 border-0 border-bottom border-bottom-1 border-secondary no-focus border-secondary-subtle" />
                                </div>
                                <div>
                                    <button className="text-center btn form-control btn-secondary">Click</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="sidebar-right2-side-wrapper ">
                        <div>
                            <div>
                                <img src="./assets/img/villas.jpg" alt="manoir" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            {/* 
            <section id="sidebar" className="sidebar bg-white position-fixed  top-0  p-md-5 p-2 z-index-3 shadow shadow-lg" style={{ left: `${sidebarOpen ? '0%' : "-100%"}` }}>
                <div className="sidebar-inner-wrapper position-relative d-flex flex-wrap justify-content-between">

                    <div className="d-flex align-items-center justify-content-between mb-5 position-absolute w-100 top-0 ">
                        <div>
                            <img src="./assets/img/logo.png" alt="manoir" width="100" />
                        </div>

                        <button className="btn" onClick={openSidebar}><i className="fa-solid fa-xmark fa-xl"></i></button>
                    </div>

                    <div className="sidebar-list-wrapper">
                        <ul className="sidebar-list border-secondary">
                            <li className="mb-2 data-hover">
                                <button
                                    className="sidebar-list-link d-flex align-items-cnter justify-content-between w-100 border-0 bg-transparent gap-3 fs-20 fs-sm-16"><span> Textiles</span><span><i
                                        className="fa-solid fa-angle-right fs-16 fs-sm-14"></i></span></button>
                                <div className="sidebar-dropdown-wrap ">
                                    <ul>
                                        <li className="pb-2"><a href="#" className="fs-18 fs-sm-15 text-dark">Table linens</a></li>
                                        <li className="pb-2"><a href="#" className="fs-18 fs-sm-15 text-dark">⁠⁠Table runners</a></li>
                                        <li className="pb-2"><a href="#" className="fs-18 fs-sm-15 text-dark">Cocktail linens</a></li>
                                        <li className="pb-2"><a href="#" className="fs-18 fs-sm-15 text-dark">Table placements</a></li>
                                    </ul>
                                </div>

                            </li>
                            <li className="mb-2 data-hover">
                                <button
                                    className="sidebar-list-link d-flex align-items-cnter justify-content-between w-100 border-0 bg-transparent gap-3 fs-20 fs-sm-16"><span> Bed</span><span><i
                                        className="fa-solid fa-angle-right fs-16 fs-sm-14"></i></span></button>
                                <div className=" sidebar-dropdown-wrap ">
                                    <ul>
                                        <li className="pb-2"><a href="#" className="fs-18 fs-sm-15 text-dark">Bedding Sets</a></li>
                                        <li className="pb-2"><a href="#" className="fs-18 fs-sm-15 text-dark">Quilts</a></li>
                                        <li className="pb-2"><a href="#" className="fs-18 fs-sm-15 text-dark">Duvet Covers & Shams</a></li>
                                        <li className="pb-2"><a href="#" className="fs-18 fs-sm-15 text-dark">Duvet Inserts & Sham fillers</a></li>
                                        <li className="pb-2"><a href="#" className="fs-18 fs-sm-15 text-dark">Coverlets</a></li>
                                        <li className="pb-2"><a href="#" className="fs-18 fs-sm-15 text-dark">Sheets & Pillows</a></li>
                                        <li className="pb-2"><a href="#" className="fs-18 fs-sm-15 text-dark">Throws</a></li>
                                        <li className="pb-2"><a href="#" className="fs-18 fs-sm-15 text-dark">Dećo Sets</a></li>
                                        <li className="pb-2"><a href="#" className="fs-18 fs-sm-15 text-dark">Shop by Room</a></li>
                                    </ul>
                                </div>

                            </li>
                            <li className="mb-2 data-hover">
                                <button
                                    className="sidebar-list-link d-flex align-items-cnter justify-content-between w-100 border-0 bg-transparent gap-4 fs-20 fs-sm-16"><span> Bathware Assortment </span><span><i className="fa-solid fa-angle-right fs-16 fs-sm-14"></i></span></button>
                                <div className="sidebar-dropdown-wrap ">
                                    <ul>
                                        <li className="pb-2"><a href="#" className="fs-18 fs-sm-15 text-dark">Unveiling Shortly</a></li>
                                    </ul>
                                </div> 

                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted fs-20 fs-sm-16">Bedroom</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted fs-20 fs-sm-16">Living Lounge</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted fs-20 fs-sm-16">Office Space</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted fs-20 fs-sm-16">Entertainment Area</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted fs-20 fs-sm-16">Kids Room</a>
                            </li>
                        </ul>
                    </div>

                  


                    
                    <div className="sidebar-right-side-wrapper flex-grow-1 ">
                        <div className="border rounded p-4 shadow w-100 d-lg-block d-none">
                            <div>
                                <h2 className="text-center"> Contact With Us</h2>
                            </div>
                            <form action="">
                                <div className="mb-4">
                                    <p className="mb-1">Name</p>
                                    <input type="text" name="" id="" placeholder="Enter Your Full Name"
                                        className="d-block w-100 border-0 border-bottom border-bottom-1 border-secondary no-focus border-secondary-subtle" />
                                </div>
                                <div className="mb-4">
                                    <p className="mb-1">Email</p>
                                    <input type="text" name="" id="" placeholder="Enter Your Email"
                                        className="d-block w-100 border-0 border-bottom border-bottom-1 border-secondary no-focus border-secondary-subtle" />
                                </div>
                                <div className="mb-5">
                                    <p className="mb-1">Phone</p>
                                    <input type="text" name="" id="" placeholder="Enter Your Mobile Number"
                                        className="d-block w-100 border-0 border-bottom border-bottom-1 border-secondary no-focus border-secondary-subtle" />
                                </div>
                                <div>
                                    <button className="text-center btn form-control btn-secondary">Click</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="sidebar-right2-side-wrapper ">
                        <div>
                            <div>
                                <img src="./assets/img/villas.jpg" alt="manoir" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>

            </section> */}
        </>
    )
}

export default Navbar