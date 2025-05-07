import React, { useEffect, useState } from "react";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import ViewImage from "../Parts/ViewImage";
import Rating from "@mui/material/Rating";
import ProductDetailCollapse from "../Parts/ProductDetailCollapse";
import SimilarProduct from "../Parts/SimilarProduct";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import { addCartApi } from "../../Api/api";
import { useDispatch } from "react-redux";
import { cartdata } from "../../redux/slice/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addWishlistApi } from "../../Api/api";
import { wishlistdata } from "../../redux/slice/wishlist";
import { BeatLoader } from "react-spinners";
import ProductSmall from "../Parts/ProductSmall";
import axios from "axios";
import { Url } from "../../url/url";
import cartIcon from '/assets/icon/cart_icon.svg'
import Swal from "sweetalert2";

const ProductView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeLocation = window.location.href;
  const productAllData = useSelector((store) => store.product.data);
  const ratingAllData = useSelector((store) => store.rating.data);
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [rating, setRating] = useState([]);
  const [ratingData, setRatingData] = useState();
  const [selectedSize, setSelectedSize] = useState({})
  const stringToSlug = (str) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .trim();
  };

  const arr = [1, 2, 3, 4, 5, 6, 7]

  const addtocart = async (productId) => {
    if (selectedSize && selectedSize?.quantity > 0) {
      const userdata = localStorage.getItem("userdata");
      const usertoken = localStorage.getItem('usertoken')
      if (userdata && usertoken) {
        const userdataobj = JSON.parse(userdata);
        const userId = userdataobj._id;
        await addCartApi(userId, productId, selectedSize.size).then(() => {
          dispatch(cartdata(userId));
        });
      }
      else {
        needLoginFunc()
      }
    }
    else {
      toast.warning("Product Out Of Stock", { autoClose: 1500, })
    }
  };

  const addWishlistFunc = async (productId) => { 
    const userdata = localStorage.getItem("userdata");
    const usertoken = localStorage.getItem('usertoken')
    if (userdata && usertoken) {
      const userdataobj = JSON.parse(userdata);
      const userId = userdataobj._id;
      await addWishlistApi(userId, productId, selectedSize.size).then(() => {
        dispatch(wishlistdata(userId));
      });
    }
    else{
      needLoginFunc()
    }

  };

  const productShowFunc = async () => {
    setRatingData();
    if (productAllData.length > 0) {
      const data = await productAllData.find((data) => data._id === productId);
      setProduct(data);
      setSelectedSize(data.productSize[0])
      // const ratingFind = await ratingAllData.find(
      //   (val) => val.productId === data._id
      // );
      // setRatingData(ratingFind);
      // const responseRating = await axios.get(
      //   `${Url}/api/rating/productrating?productId=${data._id}`
      // );
      // if (responseRating) {
      //   const { data } = responseRating;
      //   setRating(data);
      // }
    }
  };

  const needLoginFunc = () => {
    Swal.fire({
      title: "Need to Login!",
      // text: "You won't be able to revert this!",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log In"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('locationHistory', window.location.pathname)
        navigate('/login')
      }
    });
  };
  


  useEffect(() => {
    productShowFunc();
  }, [productAllData, changeLocation]);

  return (
    <>
      <ToastContainer />
      <div className='main-color pt-3 pb-5'>
        <Navbar />
      </div>
      {product &&
        <section>
          <div className="container-fluid py-3 main-color">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                <div className="row mx-0">
                  {arr.map((cv, i) => (
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-1 p-1 " key={i}>
                      <img src={product.thumbnailImage} className='img-fluid w-100' alt="" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 sm-size-padding ">
                <div className='custam-width cutam-stkicky '>
                  <div>
                    <h5 className='text-capitalize mb-3 product-heading'>{product.productName}</h5>
                    <div className='d-flex text-size'>
                      <h5 className='px-2 text-clor-maroom'><i className="fa-solid fa-fire-flame-curved"></i></h5>
                      <p className='text-clor-maroom font-size mb-3'>12 sold in last 15 hours</p>
                    </div>
                    <div>
                      <p className='mb-2'>{product.shortDescription}</p>
                      {/* <p className='text-capitalize mb-2'>vendor : &nbsp;  collette</p> */}
                      <p className='text-capitalize mb-2'>SKU :&nbsp;  {product.sku}</p>
                      <p className='text-capitalize mb-2'>availability :&nbsp; {selectedSize?.quantity > 0 ? "in stock" : "Out of stock"}  </p>
                      {/* <p className='text-capitalize mb-2'>product type : &nbsp;  dincidunteros</p> */}
                      <h5 className='mb-2'> &#8377;{product.salePrice}</h5>
                      {selectedSize?.quantity < 11 && selectedSize?.quantity > 0 &&
                        <p className='text-clor-maroom mb-2'>Please hurry! Only {selectedSize?.quantity} left in stock </p>}
                      <p className='text-capitalize mb-2'>color: darkorange</p>

                      {/* ----------->> these are important code for later <<-----------  */}
                      {/* <div className='d-flex gap-3'>
                      <div className='size-imges'>
                        <img src="/assets/img/small-1.png" className='' alt="" />
                      </div>
                      <div className='size-imges'>
                        <img src="/assets/img/small-1.png" className='' alt="" />
                      </div>
                      <div className='size-imges'>
                        <img src="/assets/img/small-1.png" className='' alt="" />
                      </div>
                    </div> */}
                      {/* ----------->> these are important code for later <<-----------  */}
                      <div>
                        <p className='text-capitalize mb-2'>size: {selectedSize?.size}</p>
                        <div className='d-flex gap-3 flex-wrap'>
                          {selectedSize && product?.productSize?.map((sizeValue) => (
                            <span className={`px-3 py-1 border  ${selectedSize.size === sizeValue.size ? "border-danger" : "border-dark "} fw-bold`} onClick={() => setSelectedSize(sizeValue)} key={sizeValue.size}>{sizeValue.size}</span>
                          ))}
                        </div>
                      </div>
                      <div className='row align-items-center mt-3 mb-3'>
                        <div className='col-lg-5 col-md-6 col-sm-6 col-12'>
                          <button className='px-4 py-2 sm-size text-capitalize size-border-color bg-dark text-white btn-width' onClick={() => addtocart(product._id)}>add to cart</button>
                        </div>
                        {/* <div className='col-lg-5 col-md-6 col-sm-6 col-12'>
                          <button className='px-4 py-2 sm-size text-capitalize size-border-color bg-clor-maroom text-white btn-width'>buy now</button>
                        </div> */}
                        <div className='col-lg-5 col-md-6 col-sm-6 col-12'>
                          <button className='px-4 py-2 sm-size text-capitalize size-border-color bg-clor-maroom text-white btn-width' onClick={() => addWishlistFunc(product._id)}>add to wishlist</button>
                        </div>
                      </div>


                    </div>
                  </div>


                  <div className='text-decoration-none text-muted'>
                    <div className='d-flex'>
                      <div className='new-custam-width-one custam-width-border'></div>
                      <div className='new-custam-width-two custam-width-border  mx-2'></div>
                      <div className='new-custam-width-three custam-width-border'></div>
                    </div>
                    <div className="accordion" id="accordionExample">

                      <div >
                        <div className="d-flex justify-content-between align-items-center py-4" type="button" data-bs-toggle="collapse" data-bs-target="#one" aria-expanded="true" aria-controls="one">
                          <span className='m-0 text-capitalize'>Product Description</span>
                          <span>+</span>
                        </div>
                        <div id="one" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            {product.description &&
                              <div dangerouslySetInnerHTML={{ __html: product.description }} />}
                          </div>
                        </div>
                        <div className='d-flex'>
                          <div className='new-custam-width-one custam-width-border'></div>
                          <div className='new-custam-width-two custam-width-border  mx-2'></div>
                          <div className='new-custam-width-three custam-width-border'></div>
                        </div>
                      </div>

                      <div >
                        <div className="d-flex justify-content-between align-items-center py-4 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#two" aria-expanded="true" aria-controls="two">
                          <span className='m-0 text-capitalize'>Product Details</span>
                          <span>+</span>
                        </div>
                        <div id="two" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            {product.productDetails &&
                              <div dangerouslySetInnerHTML={{ __html: product.productDetails }} />}
                          </div>
                        </div>
                        <div className='d-flex'>
                          <div className='new-custam-width-one custam-width-border'></div>
                          <div className='new-custam-width-two custam-width-border  mx-2'></div>
                          <div className='new-custam-width-three custam-width-border'></div>
                        </div>
                      </div>

                      <div >
                        <div className="d-flex justify-content-between align-items-center py-4 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#three" aria-expanded="true" aria-controls="three">
                          <span className='m-0 text-capitalize'>care & Maintenance</span>
                          <span>+</span>
                        </div>
                        <div id="three" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            It is shown by default, until the collapse plugin adds the appropriate classes
                          </div>
                        </div>
                        <div className='d-flex'>
                          <div className='new-custam-width-one custam-width-border'></div>
                          <div className='new-custam-width-two custam-width-border  mx-2'></div>
                          <div className='new-custam-width-three custam-width-border'></div>
                        </div>
                      </div>

                      <div >
                        <div className="d-flex justify-content-between align-items-center py-4 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#four" aria-expanded="true" aria-controls="four">
                          <span className='m-0 text-capitalize'>return & exchange</span>
                          <span>+</span>
                        </div>
                        <div id="four" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            It is shown by default, until the collapse plugin adds the appropriate classes
                          </div>
                        </div>
                        <div className='d-flex'>
                          <div className='new-custam-width-one custam-width-border'></div>
                          <div className='new-custam-width-two custam-width-border  mx-2'></div>
                          <div className='new-custam-width-three custam-width-border'></div>
                        </div>
                      </div>
                    </div>
                  </div>













                </div>
              </div>
            </div>
          </div>
        </section>}








      {/* <Navbar />
      {product ? (
        <>
          <section className="border-top py-5">
            <div className="container">
              <div className="row">
                <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                  <div>
                    <MDBBreadcrumb>
                      <MDBBreadcrumbItem>
                        <Link to="/">
                          {" "}
                          <i className="fa-solid fa-house"></i> Home
                        </Link>
                      </MDBBreadcrumbItem>
                      <MDBBreadcrumbItem>
                        <Link to="/category">
                          {" "}
                          {product && product.category}
                        </Link>
                      </MDBBreadcrumbItem>
                      <MDBBreadcrumbItem>
                        <Link
                          to={`/category/${
                            product ? product.subcategory : null
                          }`}
                        >
                          {" "}
                          {product && product.subcategory}
                        </Link>
                      </MDBBreadcrumbItem>
                      <MDBBreadcrumbItem>
                        <Link to="/character">
                          {" "}
                          {product && product.character}
                        </Link>
                      </MDBBreadcrumbItem>
                      <MDBBreadcrumbItem>
                        <Link
                          to={`/character/${
                            product ? product.subcharacter : null
                          }`}
                        >
                          {" "}
                          {product && product.subcharacter}
                        </Link>
                      </MDBBreadcrumbItem>
                      <MDBBreadcrumbItem active>
                        {product && product.productName}
                      </MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                  </div>
                  {product ? <ViewImage images={product} /> : null}
                </div>
                <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                  <div className="">
                    <div className="iconbox text-end">
                      <button
                        className="btn border-0"
                        onClick={() => addWishlistFunc(product._id)}
                      >
                        <i className="fa-regular text-muted fa-heart fa-lg me-2"></i>
                      </button>
                      <i className="fa-solid fa-share fa-lg cl-blue"></i>
                    </div>
                    <p className="cl-blue text-uppercase">
                      {product.subcharacter}
                    </p>
                    <h2>{product && product.productName}</h2>
                    {ratingData && (
                      <div className="d-flex align-items-center ">
                        <Rating
                          name="half-rating-read"
                          defaultValue={ratingData.avrageRating}
                          precision={0.5}
                          readOnly
                        />
                        <small className="ms-2">
                          ({ratingData.avrageRating}){" "}
                          {ratingData.totalRatingCount} Reviews{" "}
                        </small>
                      </div>
                    )}
                    <p className="mb-3">
                      {product && product.shortDescription}
                    </p>
                    <div className="d-flex align-items-center gap-2 text-dark mb-2"> <span> Size : </span> <small className="mb-0 textPrimary">{product.productSize.height} * {product.productSize.width} * {product.productSize.depth}</small>  <span className="text-capitalize textPrimarySecond">{product.productSize.measurement} </span> </div>

                    <div className="d-flex align-items-center gap-3">
                      {product.discount > 0 && (
                        <p className="text-decoration-line-through mb-0 fw-normal fs-14 fs-xs-10">
                          Rs. {product.salePrice}
                        </p>
                      )}

                      <p className="mb-0 fs-xs-10 fw-bold">
                        {" "}
                        Rs.{" "}
                        {product.discount > 0
                          ? product.salePrice -
                            Math.ceil(
                              (product.salePrice * product.discount) / 100
                            )
                          : product.salePrice}
                      </p>

                      {product.discount > 0 && (
                        <p className="mb-0 textPrimarySecond fs-14 fs-xs-10">
                          ({product.discount} % off)
                        </p>
                      )}
                    </div>
                    {product.totalProduct > 0 ?
                    <div className="my-3">
                      {false ? (
                        <Link className="btn btn-blue  me-3 fw-bold" to="/cart">
                          Go to cart{" "}
                          <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                      ) : (
                        <button
                          className="btn btn-blue  me-3 fw-bold"
                          onClick={() => addtocart(product)}
                        >
                          Add to cart{" "}
                          <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                      )}
                      <Link className="btn btn-outline-blue fw-bold">
                        Buy Now <i className="fa-solid fa-bag-shopping"></i>
                      </Link>
                    </div> : <button
                          className="btn btn-blue my-2  me-3 fw-bold"
                          onClick={() => addtocart(product)}
                        >
                          Notify Me 
                        </button> } 
                    {product &&
                      product.totalProduct > 0 &&
                      product.totalProduct < 10 && (
                        <p className="textPrimary">
                          Limited Stock! {product.totalProduct} pieces left
                        </p>
                      )}
                    {product &&
                      product.totalProduct <= 0  && (
                        <p className="textDanger">
                          Out Of Stock
                        </p>
                      )}
                  </div>
                  <ProductDetailCollapse product={product} />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container">
              <div className="row">
                {rating.length > 0 &&
                  rating
                    .filter((item) => item.comment)
                    .slice(0, 8)
                    .map((ratingValue) => {
                      return (
                        <div
                          className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2"
                          key={ratingValue._Id}
                        >
                          <div className="border shadow p-3">
                            <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
                              <p className="mb-0 fw-bold text-capitalize">
                                {ratingValue.userName}
                              </p>
                              <Rating
                                name="half-rating-read"
                                defaultValue={ratingValue.rating}
                                precision={0.5}
                                readOnly
                              />
                            </div>
                            <p>{ratingValue.comment}</p>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </section>
          <section className="py-5">
            <div className="container">
              <div className="d-flex justify-centent-center align-items-center ">
                <div className=" flex-grow-1 border borderPrimarySecond "></div>
                <h2 className="  text-center px-2 text-uppercase fw-bold cl-welcome">
                  most similar products
                </h2>
                <div className=" flex-grow-1 border borderPrimarySecond"></div>
              </div>
              <div className="row">
                {productAllData
                  .filter((data) => data.character === product.character)
                  .slice(0, 8)
                  .map((cv, index) => {
                    return (
                      <div key={index} className="col-lg-3 col-sm-4 col-6 p-2">
                        <ProductSmall productData={cv} />
                      </div>
                    );
                  })}
              </div>
              <div className="text-center mt-4">
                <Link
                  to={`/products/character/${
                    product && stringToSlug(product.character)
                  }`}
                  className="homebtn"
                >
                  Show More
                </Link>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <BeatLoader />
        </div>
      )}

      <Footer /> */}
    </>
  );
};

export default ProductView;
