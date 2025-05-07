import React from 'react'
import Slider from "react-slick"; 

const HeaderSlider = () => {



    var settings = {
        autoplay: true,
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover:false,
        pauseOnFocus: false,
      };
    
    const imgArr = ["slider1.jpeg","slider2.jpeg", "slider3.jpeg"]
  
  return (
    <>
    <section className='slider-header-wrap w-100'> 
      <div className="container-fluid px-4 mb-3">
    <Slider {...settings} className='w-100'> 
      {imgArr.map((img, i)=>{
        return(
          <div className='header-slider' key={i}>
            <div key={i}>
              <img src={`/assets/img/${img}`} alt='dooziedo' loading='lazy' className='img-fluid w-100'/>
            </div> 
          </div>
        )
      })} 
    </Slider>
    </div>
    </section>
    </>
  )
}

export default HeaderSlider