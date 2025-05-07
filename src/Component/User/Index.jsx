import React, { useEffect, useState, Suspense, lazy } from 'react'
import { ToastContainer } from 'react-toastify';
import HeaderSlider from '../Slider/HeaderSlider'
import Cta from '../Parts/Cta'
import Navbar from '../Header/Navbar'
import Footer from '../Footer/Footer'


import video1 from '/assets/video/vid1.mp4' 

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductSmall from '../Parts/ProductSmall';
const LazyLoadedVideo = lazy(() => import('../Parts/VideoPlayer'));

const Index = () => {
  const productAllData = useSelector(store => store.product.data)  
  
  return (
    <>
      <Navbar pageName="Home" /> 

      {/* <section>
        <div className="container-fluid banner-wrapper px-md-4">

            <div className="position-relative">

                <div className="owl-carousel">
                    <div>
                        <picture>

                            <source media="(min-width: 768px)" srcset="/assets/img/slider1.jpeg" />

                            <source media="(max-width: 767px)" srcset="/assets/img/2.webp" />

                            <img src="./assets/img/slider1.jpeg" alt="Fallback Image" />
                        </picture>
                    </div>
                    <div>
                        <picture>

                            <source media="(min-width: 768px)" srcset="/assets/img/slider2.jpeg" />

                            <source media="(max-width: 767px)" srcset="/assets/img/8.webp" />

                            <img src="./assets/img/slider2.jpeg" alt="Fallback Image" />
                        </picture>
                    </div>
                    <div>
                        <picture>

                            <source media="(min-width: 768px)" srcset="./assets/img/slider3.jpeg" />

                            <source media="(max-width: 767px)" srcset="./assets/img/5.webp" />

                            <img src="./assets/img/slider3.jpeg" alt="Fallback Image" />
                        </picture>
                    </div>

                </div>
                <div className="position-absolute top-50 start-50 translate-middle z-index-2">
                    <h1 className="text-center fs-70">Manoir </h1>
                    <h3 className="text-center">Luxary Furnishing</h3>
                </div>
            </div>

        </div>
    </section> */}
<HeaderSlider/>
    <section>
        <div className="container-fluid mb-5 px-md-4">
            <a className="text-muted " href="#">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                        <img src="./assets/img/1.webp" alt="Image 1" className="img-fluid" />
                        <div>
                            <p className="text-uppercase p-small mt-3">seasonal sakura</p>
                            <h4 className="text-capitalize">japan</h4>
                            <p className="p-medium">Lorem ipsum dolor Lorem ipsum dolor sit, amet consectetur adipisicing
                                elit. Doloremque quam tempore obcaecati sed quisquam qui iste dolores laborum cum vero
                                fugit delectus ab ipsa, sequi eligendi saepe at a quas. sit amet consectetur adipisicing
                                elit. Cum, sint.</p>
                            <a className="text-muted text-capitalize border-bottom border-dark p-medium" href="#">discover
                                more</a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                        <img aria-colspan="" src="./assets/img/4.webp" alt="Image 1" className="img-fluid" />
                        <div>
                            <p className="text-uppercase p-small mt-3">seasonal sakura</p>
                            <h4 className="text-capitalize">japan</h4>
                            <p className="p-medium">Lorem ipsum dolor Lorem ipsum dolor sit, amet consectetur adipisicing
                                elit. Doloremque quam tempore obcaecati sed quisquam qui iste dolores laborum cum vero
                                fugit delectus ab ipsa, sequi eligendi saepe at a quas. sit amet consectetur adipisicing
                                elit. Cum, sint.</p>
                            <a className="text-muted text-capitalize border-bottom border-dark p-medium" href="#">discover
                                more</a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12 ">
                        <img aria-colspan="" src="./assets/img/7.webp" alt="Image 1" className="img-fluid" />
                        <div>
                            <p className="text-uppercase p-small mt-3">seasonal sakura</p>
                            <h4 className="text-capitalize">japan</h4>
                            <p className="p-medium">Lorem ipsum dolor Lorem ipsum dolor sit, amet consectetur adipisicing
                                elit. Doloremque quam tempore obcaecati sed quisquam qui iste dolores laborum cum vero
                                fugit delectus ab ipsa, sequi eligendi saepe at a quas. sit amet consectetur adipisicing
                                elit. Cum, sint.</p>
                            <a className="text-muted text-capitalize border-bottom border-dark p-medium" href="#">discover
                                more</a>
                        </div>
                    </div>
                </div>
            </a>
        </div>
 
    </section>

    {/* <section className="product-wrapper">
        <div className="container-fluid text-center px-md-4">
            <div className="row">
                <div className="col-lg-6 col-md-5 col-sm-12 col-12 m-auto mb-4">
                    <h2 className="mb-3">Inspiration for the year ahead</h2>
                    <p className="p-medium">Plan a year of adventures, uncovering new horizons with Aman - from
                        soul-soothing moments by the coast to multi-destination journeys that spark the exploratory
                        spirit.</p>
                </div>
            </div>

            <div className="owl-carousel ">
                <div>
                    <img src="./assets/img/13.webp" alt="Image" className="img-fluid" />
                    <div className="pt-3 bg-white">
                        <p className="p-small text-uppercase">ski retreats</p>
                        <h5>Last tracks</h5>
                            <div className="p-medium mx-4 pb-4 ">Endless opportunities for outdoor adventure await in the
                                snow-blanketed mountains of Aman's two ski destinations in The French Alps and the USA.
                            </div>
                    </div>
                </div>
                <div>
                    <img src="./assets/img/14.webp" alt="Image" className="img-fluid" />
                    <div className="pt-3 bg-white">
                        <p className="p-small text-uppercase">ski retreats</p>
                        <h5>Last tracks</h5>
                            <div className="p-medium mx-4 pb-4 ">Endless opportunities for outdoor adventure await in the
                                snow-blanketed mountains of Aman's two ski destinations in The French Alps and the USA.
                            </div>
                    </div>
                </div>
                <div>
                    <img src="./assets/img/15.webp" alt="Image" className="img-fluid" />
                    <div className="pt-3 bg-white">
                        <p className="p-small text-uppercase">ski retreats</p>
                        <h5>Last tracks</h5>
                            <div className="p-medium mx-4 pb-4 ">Endless opportunities for outdoor adventure await in the
                                snow-blanketed mountains of Aman's two ski destinations in The French Alps and the USA.
                            </div>
                    </div>
                </div>
                <div>
                    <img src="./assets/img/a.webp" alt="Image" className="img-fluid" />
                    <div className="pt-3 bg-white">
                        <p className="p-small text-uppercase">ski retreats</p>
                        <h5>Last tracks</h5>
                            <div className="p-medium mx-4 pb-4 ">Endless opportunities for outdoor adventure await in the
                                snow-blanketed mountains of Aman's two ski destinations in The French Alps and the USA.
                            </div>
                    </div>
                </div>

            </div>

            <div className="row">

                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                    <img src="./assets/img/b.webp" alt="Image" className="img-fluid" />
                    <div className="pt-3 bg-white">
                        <p className="p-small text-uppercase">city</p>
                        <h5> By the coast</h5>
                            <div className="p-medium mx-4 pb-4 ">Endless opportunities for outdoor adventure await in the
                                snow-blanketed mountains of Aman's two ski destinations in The French Alps and the USA.
                            </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                    <img src="./assets/img/c.webp" alt="Image" className="img-fluid" />
                    <div className="pt-3 bg-white">
                        <p className="p-small text-uppercase">villas</p>
                        <h5> time together</h5>
                            <div className="p-medium mx-4 pb-4 ">Endless opportunities for outdoor adventure await in the
                                snow-blanketed mountains of Aman's two ski destinations in The French Alps and the USA.
                            </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                    <img src="./assets/img/d.webp" alt="Image" className="img-fluid" />
                    <div className="pt-3 bg-white">
                        <p className="p-small text-uppercase">Amanjena & Amangiri</p>
                        <h5>Desert retreats </h5>
                            <div className="p-medium mx-4 pb-4 ">Endless opportunities for outdoor adventure await in the
                                snow-blanketed mountains of Aman's two ski destinations in The French Alps and the USA.
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </section> */}

    <section>
        <div className="container-fluid px-md-4">

            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 col-12 mb-4 mt-5 ">
                    <img src="./assets/img/aa.webp" alt="" className="img-fluid w-100" />
                    <div className="">
                        <p>
                        <p className="text-uppercase p-small">aman fine fragrance</p>
                        </p>
                        <h5 className="text-capitalize">echoes of aman</h5>
                        <p className="p-medium ">Embark on a sensory journey with Aman Fine Fragrance - a range of seven
                            evocative scents, each inspired by the exotic aromas of an Aman destination - the perfect
                            gift for oneself or a loved one..</p>
                        <a className="text-muted text-capitalize border-bottom border-dark p-medium  " href="#">discover
                            more</a>
                    </div>

                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 col-12 mt-5 mb-3">
                    <img src="./assets/img/9.webp" alt="" className="img-fluid w-100" />
                    <div>
                        <p className="text-uppercase p-small mt-3 ">about us</p>
                        <h5 className="text-capitalize">the spirit of aman</h5>
                        <p className="p-medium">Time with Aman is akin to being welcomed into a gracious private home where
                            only a few guests are received.-Aman's discreet sanctuaries and spaces are sensitive and
                            authentic to geography, design and cultural heritage - every experience gently unfolds with
                            simplicity and elegance providing an immediate sense of belonging.</p>
                        <a className="text-muted text-capitalize border-bottom border-dark p-medium" href="#">discover
                            more</a>
                    </div>

                </div>
            </div>
        </div>
    </section>


    <footer>
        <div className="container-fluid bg-white border-bottom px-md-4">
            <div className="row  border-bottom ">
                <div className="col-lg-3 col-md-3 col-sm-3 col-12 pt-3">
                    <h5 className="text-capitalize ">get inspired</h5>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 pt-3">
                    <p className="p-medium">To receive updates about exclusive experiences, events, new destinations and
                        more, please register your interest.</p>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 mb-3 mt-3">
                    <button className="w-100 btn-bg border-0 p-2">
                        <a className="p-medium text-capitalize text-white " href="#">sing up</a>
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-3">
                    <img src="./assets/img/logo.png" alt="this is images" width="120" />
                    <ul>
                        <li><a href="#" className="text-muted p-medium">Textiles</a></li>
                        <li>
                            <a href="#" className="text-muted p-medium">Bed</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Bathware</a>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-3">
                    <h6>important link</h6>
                    <ul>
                        <li>
                            <a href="#" className="text-muted p-medium">About</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Categories</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Contact us</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Privacy & policy</a>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-3">
                    <ul>
                        <li>
                            <a href="#" className="text-muted p-medium">Table lines</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Table runners</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Cocktail linens</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium"> table placements</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Bedding sets</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Quilts</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Drvet cover & shams</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Duvet inserts & sham fillers</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Coverlets</a>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6 mb-3 ">
                    <ul>
                        <li>
                            <a href="#" className="text-muted p-medium">Sheets & pillows</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Throws</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Deco Sets</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium"> Shop by room</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Bedroom</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Living lounge </a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Office space</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Entertainment Area</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Kids room</a>
                        </li>
                        <li>
                            <a href="#" className="text-muted p-medium">Unveriling shortly</a>
                        </li>
                    </ul>
                </div>
                <div className="border-top ">
                    <div className="row">
                        <div className="col-lg-9 col-md-9 col-sm-12 col-12">
                            <ul className="d-flex pt-3">
                                <li className="px-3">
                                    <a className="text-muted" href="#">
                                        <i className="fa-brands fa-facebook"></i>
                                    </a>
                                </li>
                                <li className="px-3">
                                    <a className="text-muted" href="#">
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
                                </li>
                                <li className="px-3">
                                    <a className="text-muted" href="#">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                </li>
                                <li className="px-3">
                                    <a className="text-muted" href="#">
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                </li>
                                <li className="px-3">
                                    <a className="text-muted" href="#">
                                        <i className="fa-brands fa-whatsapp"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 col-12 mt-3">
                            <p className="p-medium px-3">Copyright 2024, Aman Group S.a.r.l.</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </footer>

      {/* <section className="banner-wrapper ">
        <div>
          <div>
            <div className="banner-center-logo">
              <img src="/assets/img/banner-center-logo.png" alt="" />
            </div>
            <div className="banner-center-text">
              <h1 className="text-white imofficial-text">imofficial</h1>
              <p className="text-white text-uppercase paragraph-grace">inspired by grace</p>
            </div>
          </div>
          <div>
            <img src="/assets/img/banner.jpeg" alt="banner " className="w-100 banner-img" />
          </div>
        </div>

      </section> */}

      {/* <section className=" banner-two position-relative">
        <div className="banner-opctiy"></div>
        <div className="aristocratice-text">
          <h2 className="text-white text-uppercase imofficial-text aristocratice-sm">aristocratice</h2>
          <p className="text-white aristocratice-paragraph">Aristocratice empowers you to express your regal spirt without sacrificing comfort Don the crown <br /> not literally, but with the effortless confidence that come form knowing you're impeccably dressed</p>
        </div>
        <div>
          <img src="/assets/img/banner-2.jpeg" alt="banner-2" className="banner-2-img " /> 
        </div>
      </section>

      {productAllData.map((productValue, i)=>(
        <section className="custom-background-color" key={i}>
        <div className="main-conatiner">
          <div className="row">
            <div className={`col-lg-6 col-md-6 col-sm-6 col-6 gap-3 pt-2 p-1 ${(i+1) % 2 === 0 ? 'order-2' : 'order-1'}`}>
              <div className="custom-border-right ">
                <img src={productValue.thumbnailImage} alt={productValue.altTag} className="img-fluid width-img" />
              </div>
            </div>
            <div className={`col-lg-6 col-md-6 col-sm-6 col-6 gap-3 custom-margin pt-2 p-1 ${(i+1) % 2 !== 0 ? 'order-2' : 'order-1'}`}>
              <div className="custom-border-left position-relative">
                <img src="/assets/img/car-1.jpeg" alt="" className="img-fluid width-img" />
                <div className="images-inner-border">
                  <div className="images-inner-text">
                    <h4 className="text-white text-uppercase sm-size-text">{productValue.representText}</h4> 
                    <Link to={`/productview/${productValue.slug}/${productValue._id}`} className="text-white text-uppercase border-0 custom-shape-btn">shop now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      ))} 

      <section>
        <div className="main-viedo">
          <video autoPlay muted loop src="/assets/img/viedo.mp4"></video>
        </div>
      </section>

      <section className="custom-background-color pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12-col-md-12-col-sm-12 col-12">
              <p className="text-uppercase text-white pt-3 m-0 p-0"> read update</p>
              <h2 className="text-uppercase  pb-3 blogs-color ">blogs</h2>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div>
                <img src="/assets/img/blogs-1.png" alt="" className="w-100" />
              </div>
              <div className="">
                <p className="text-white blogs-centent pt-4 ">Welcome to the world of imofficial clothing where tradition meets modemity and scphistication </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div>
                <img src="/assets/img/blogs-2.png" alt="" className="w-100    " />
              </div>
              <div>
                <p className="text-white blogs-centent pt-4">knows no bounds, with IMMOFFCIAL, every stitch tells a story of opulence and refinement destined to</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div>
                <img src="/assets/img/blogs-3.png" alt="" className="w-100" />
              </div>
              <div>
                <p className="text-white blogs-centent pt-4">transcend trends and become an enduring symbol of enduring style. jion us as we redefine lxury</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="custom-background-color-danger py-5 custom-border">
        <div className="container">
          <div className="">
            <div className="row align-items-center ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-2">
                <p className="text-uppercase text-white blogs-centent m-0">jion our communty</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 m-0 mt-2 ">
                <h2 className="text-uppercase text-white blogs-color m-0">newsletter</h2>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12 col-12 mt-4">
                <div className="w-100 d-flex align-items-center border border-1 rounded-5 ps-2">
                  <input type="text" className="border-0 form-control flex-grow-1 ps-1 bg-transparent text-white newsletter-form " />
                  <button className="px-5 border-0 text-uppercase py-2 rounded-5 btn-color">submit</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <footer className="custom-background-color pt-5 pb-4">
        <div className="container">
          <div className="d-flex  justify-content-between">
            <div>
              <ul className=" p-0">
                <li className="line-hight">
                  <a className="text-white text-uppercase footer-text" href="#">home</a>
                </li>
                <li className="line-hight">
                  <a className="text-white text-uppercase footer-text" href="#">lifestyle</a>
                </li>
                <li className="line-hight">
                  <a className="text-white text-uppercase footer-text" href="#">accessories</a>
                </li>
                <li className="line-hight">
                  <a className="text-white text-uppercase footer-text" href="#">customization</a>
                </li>
                <li className="line-hight">
                  <a className="text-white text-uppercase footer-text" href="#">abot us</a>
                </li>
                <li className="line-hight">
                  <a className="text-white text-uppercase footer-text" href="#">contact us</a>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <a className="text-white fs-5" href="#"><i className="fa-brands fa-instagram"></i></a>
                </li>
                <li>
                  <a className="text-white fs-5" href="#"><i className="fa-brands fa-square-facebook"></i></a>
                </li>
                <li>
                  <a className="text-white fs-5" href="#"><i className="fa-brands fa-linkedin"></i></a>
                </li>
                <li>
                  <a className="text-white fs-5" href="#"><i className="fa-brands fa-pinterest"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer> */}
      
    </>
  )
}

export default Index