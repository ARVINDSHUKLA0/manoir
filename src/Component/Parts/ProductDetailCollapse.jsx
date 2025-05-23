import React, { useState } from 'react'
import parse from 'html-react-parser';
import '../../Css/ProductDetailCollapse.css'

const ProductDetailCollapse = (props) => { 
    const { product} = props 
    const [feature, setFeature] = useState(false)
    const [description, setDescription] = useState(false)
    const [specifications, setSpecifications] = useState(false)
    const [other, setOther] = useState(false) 
  return (
    <>
    {product && 
    <div className="collapse-wrap">
        {product.keyFeature !== '<p><br></p>' && product.keyFeature !== null &&
        <div className='collapse-item-box'>
            <div className='collapse-item d-flex align-items-center justify-content-between' onClick={e=>setFeature(!feature)} >
                <h3 className='mb-0'>Key Features</h3>
                <span>{!feature? <><h3 className='fw-bold mb-0'>+</h3></> :  <><h3 className='fw-bold mb-0'>-</h3></>}</span>
            </div>
            {feature ? 
            <div>
                <p>{parse(product && product.keyFeature)}</p>
            </div> : null }
        </div>} 
        {product.description !== '<p><br></p>' && product.description !== null &&
        <div className='collapse-item-box'>
            <div className='collapse-item d-flex align-items-center justify-content-between' onClick={e=>setDescription(!description)} >
                <h3 className='mb-0'>Description</h3> 
                <span>{!description? <><h3 className='fw-bold mb-0'>+</h3></> :  <><h3 className='fw-bold mb-0'>-</h3></>}</span>
            </div>
            {description ? 
            <div>
                {parse(product && product.description)}
            </div> : null }
        </div>}
        {product.specification !== '<p><br></p>' && product.specification !== null &&
        <div className='collapse-item-box'> 
            <div className='collapse-item d-flex align-items-center justify-content-between' onClick={e=>setSpecifications(!specifications)} >
                <h3 className='mb-0'>Specifications</h3> 
                <span>{!specifications? <><h3 className='fw-bold mb-0'>+</h3></> :  <><h3 className='fw-bold mb-0'>-</h3></>}</span>
            </div>
            {specifications ? 
            <div>
                {parse(product && product.specification)}
            </div> : null }
        </div>}
        {product.otherInfo !== '<p><br></p>' && product.otherInfo !== null &&
        <div className='collapse-item-box'> 
            <div className='collapse-item d-flex align-items-center justify-content-between' onClick={e=>setOther(!other)}  >
                <h3 className='mb-0'>Other Information</h3> 
                <span>{!other? <><h3 className='fw-bold mb-0'>+</h3></> :  <><h3 className='fw-bold mb-0'>-</h3></>}</span>
            </div>
            {other ? 
            <div>
                {parse(product && product.otherInfo)}
            </div> : null }
        </div>}

    </div> }
    </>
  )
}

export default ProductDetailCollapse