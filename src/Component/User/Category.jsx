import React, { useState } from 'react';
import "../../Css/Category.css";
import Navbar from '../Header/Navbar';
import CategImg1 from '/assets/img/CategImg1.webp';
import CategImg2 from '/assets/img/CategImg2.webp';
import CategImg3 from '/assets/img/CategImg3.webp';
import CategImg4 from '/assets/img/CategImg4.jpg';
import CategImg5 from '/assets/img/CategImg5.jpg';
import CategImg6 from '/assets/img/CategImg6.jpg';
import CategImg7 from '/assets/img/CategImg1.webp';
import CategImg8 from '/assets/img/CategImg2.webp';
import CategImg9 from '/assets/img/CategImg3.webp';
import CategImg10 from '/assets/img/CategImg4.jpg';
import CategImg11 from '/assets/img/CategImg5.jpg';
import CategImg12 from '/assets/img/CategImg6.jpg';
import thumbnailOne from '/assets/img/CatThumbnail1.jpg';
import thumbnailTwo from '/assets/img/CatThumbnail1.jpg';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

const Category = () => {
    const CategoryArr = [
        {
            id: 1,
            thumbnail: thumbnailOne,
            images: [CategImg1, CategImg2, CategImg3, CategImg4, CategImg5, CategImg6]
        },
        {
            id: 2,
            thumbnail: thumbnailTwo,
            images: [CategImg7, CategImg8, CategImg9, CategImg10, CategImg11, CategImg12]
        },
    ];

    const [selectedImages, setSelectedImages] = useState(CategoryArr.map(c => c.thumbnail));

    const handleImageClick = (categoryIndex, image) => {
        const updatedImages = [...selectedImages];
        updatedImages[categoryIndex] = image;
        setSelectedImages(updatedImages);
    };

    return (
        <>
            <Navbar />
            <section className='my-md-4 container'>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='fs-4 text-uppercase'>Rectangular Table collections</p>
                    <p className='FS-6'>RH MEMBERS PROGRAM SAVE 25% ON EVERYTHING*</p>
                </div>
            </section>
            <section className='py-5'>
                {
                    CategoryArr.map((category, index) => (

                        <div className='row flex-column-reverse flex-sm-row m-0 my-lg-5 align-items-end'>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-12 text-center  ">
                                <p className='fs-10 text-uppercase'>introducing</p>
                                <p className='fs-2 custom-font-size-category text-uppercase '>byron emperador</p>
                                <div className='my-3'>
                                    <p className='text-uppercase fs-12'>in american white oak</p>
                                    <p className='text-uppercase fs-12'>designed by harrison & nicholas candos</p>
                                </div>
                                <div className='my-4'>
                                    <p className='text-uppercase fs-12'>dining table starting at</p>
                                    <p className='text-uppercase fs-15'><span className='fw-bold'>$4195 member</span> / $5595 regular</p>
                                </div>
                                <div className='my-3'>
                                    <p className='text-uppercase fs-12'>stocked in 6 finishes, delivered in 2-7 days</p>
                                    <p className='fs-12'>shown in whitewashed oak with white emperador marble</p>
                                </div>

                                <div className='d-flex gap-1'>
                                    {
                                        category.images.map((img, i) => (
                                            <div key={i} onClick={() => handleImageClick(index, img)} style={{ cursor: "pointer" }}>
                                                <img className='img-fluid' src={img} alt="" />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-12 col-12 ">
                                <Link to={`/categoryView/${category.id}`} key={index} >
                                    <div className='categoryMani-Images'>
                                        <img className='img-fluid' src={selectedImages[index]} alt="" />
                                    </div>
                                </Link>
                            </div>
                        </div>

                    ))
                }
            </section>
            <Footer />
        </>
    );
};

export default Category;
