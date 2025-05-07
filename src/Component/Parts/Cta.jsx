import React from 'react'
import { Link } from 'react-router-dom'
// import savePlanetImg from '/assets/img/save-planet.avif'


const Cta = () => {
  return (
    <>
    <section className='bg-lightgray py-5'>
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-12 align-items-center justify-content-center d-flex">
                    <div className=''>
                        <p className="text-uppercase cta-line1 ">join the doozie-do</p>
                        <p className="text-uppercase cta-line2 ">army to save</p>
                        <p className="text-uppercase cta-line3  cl-pink">planet</p>
                        {/* <Link className="text-uppercase bg-blue btn btn-sm text-white ms-1 mt-3 mb-3 px-2 py-0">join now</Link> */}
                        <button className='cta-btn  '>Join Now</button>
                        
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                    <div className='cta-img-box text-center'> 
                        {/* <img src={savePlanetImg} alt="doozie do planet" className='img-fluid cta-img' />  */}
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Cta