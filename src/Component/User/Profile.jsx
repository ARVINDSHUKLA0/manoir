import React, { useEffect, useState } from "react";
import "../../Css/Profile.css";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartdata } from "../../redux/slice/cart";
import { wishlistdata } from "../../redux/slice/wishlist";
import { removeuser } from "../../redux/slice/user";
import axios from "axios";
import { Url } from "../../url/url";
import UserAddressUpdateModel from "../Parts/UserAddressUpdateModel";
import { ToastContainer } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showUpdateAddressModel, setShowUpdateAddressModel] = useState(false);
  const [orderList, setOrderList] = useState([]); 
  const [userId, setUserId] = useState(); 
  const addressList = useSelector(store=>store.address.data) 
  const user = useSelector(store=>store.user[0]) 
  const productAllData = useSelector(store=>store.product.data) 
  
  const auth = localStorage.getItem("usertoken");
  const userdata = localStorage.getItem("userdata");
  
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  });
  const orderListFunc = async () => {
    const userId = await JSON.parse(userdata)._id;
    setUserId(userId);
    const { data } = await axios.get(`${Url}/api/order/user?userId=${userId}`);
    if (data) {
      setOrderList(data);
    }
  };
  const addressListFunc = async () => { 
    const userId = await JSON.parse(userdata)._id;
    if (userId) {
      const { data } = await axios.get(
        `${Url}/api/address/user?userId=${userId}`
      );
    //   setAddressList(data);
    }
  }; 
  const findAddress = (addId)=>{
    if(user){
    const finddata = addressList.find(data=>data._id === user.address); 
    return finddata ? <>{finddata.address}, {finddata.city}, {finddata.state}, {finddata.pincode}</> : null
    }
  }
  const addressUpdate = async (e, addressId) => {
    const userId = await JSON.parse(userdata)._id;
    console.log("jkgjfk", e.target.value);
    try {
      const { data } = await axios.post(`${Url}/user/updateAddress`, {
        addressId,
        userId,
      });
      localStorage.setItem("userdata", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowUpdateAddressModel = () =>{ 
    setShowUpdateAddressModel(true)
  }; 
  const handleCloseUpdateAddressModel = () => setShowUpdateAddressModel(false) 

  useEffect(() => {
    orderListFunc();
    addressListFunc();
  }, []);
 
 
  return (
    <>
    <div className="pt-3 pb-3">

      <Navbar />
    </div>
      <ToastContainer />
      <UserAddressUpdateModel show={showUpdateAddressModel} handleClose={handleCloseUpdateAddressModel}/>
      <section className="py-5 min-vh-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5 col-12">
              <div className="profile-left border border-2">
                {/* <div className="text-center bg-blue py-3 profile-card"> 
                  <h3 className="text-white text-capitalize">{user && user.name}</h3> 
                </div> */}
                <div className="p-3">
                  <h3 className="mb-3">Contact info</h3>  
                  <div className="table-response">
                    <table className="table ">
                      <tbody>
                        <tr >
                          <td className="d-flex align-items-center gap-2 border-0"><i className="fa-solid fa-user cl-blue fa-lg"></i> :- </td>
                          <td className="border-0 text-break text-capitalize  fs-14">{user && user.name}</td>
                        </tr>
                        <tr >
                          <td className="d-flex align-items-center gap-2 border-0"><i className="fa-solid fa-envelope cl-blue fa-lg"></i> :- </td>
                          <td className="border-0 text-break fs-14">{user && user.email}</td>
                        </tr>
                        <tr >
                          <td className="d-flex align-items-center gap-2 border-0"><i className="fa-solid fa-phone cl-blue fa-lg"></i> :- </td> 
                          <td className="border-0 fs-14">{user && user.phone}</td>
                        </tr>
                        <tr>
                          <td className="d-flex align-items-center gap-2 border-0"><i className="fa-solid fa-location-dot cl-blue fa-lg"></i> :- </td> 
                          <td className="border-0 fs-14">
                            {findAddress()}
                            <div className="text-end">
                              <small className="cl-blue me-3 pointer" onClick={handleShowUpdateAddressModel}>change </small>
                              <small className="cl-blue pointer" >add new </small> 
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                
                    <div>
                        <p className="fw-bold">Previous Address </p> 
                  {userId &&
                    addressList.map((addressValue) => {
                      return (
                        <div className="border-bottom border-bottom-not-last py-2 fs-14 border-1" key={addressValue._id}>
                          <p>{addressValue.address}, {addressValue.city}, {addressValue.state}, {addressValue.pincode}</p> 
                          <p className="fs-14">{addressValue.primaryNumber} , {addressValue.secondaryNumber}</p> 
                          <div>
                            <button className="btn py-0 px-1 me-3  btn-sm btn-blue btn-outline-blue fs-12">Edit</button>
                            <button className="btn py-0 px-1  btn-sm btn-dange btn-outline-danger  fs-12">remove</button>
                          </div>
                        </div>
                      );
                    })}
                    </div>

                  {/* <div>
                                <button className='btn btn-blue btn-outline-blue' onClick={e=>logout()}>Log Out</button>
                            </div> */}
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7 col-12">
              <div className="profile-right">
                <div className="border shadow rounded p-3">
                  {orderList.map((orderValue) => {  
                    return (
                      <div className="py-3 border-bottom" key={orderValue._id}>
                        <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                        {orderValue.product.map(productValue=>{
                          const product = productAllData.find(data=>data._id === productValue.productId) 
                          return(
                            <div className="text-center" key={productValue._id}>
                              <img src={`${product.thumbnailImage}`} alt={product.altTag} style={{width: "50px"}} />
                              <small className="d-block"> X {productValue.productQuantity}</small>
                            </div>
                          )
                        })}
                        </div>
                        <div>
                          <p className="mb-1"> Product Quantity :- {orderValue.product.length}</p>
                          <p className="mb-1">Total Price :- RS. {(orderValue.totalproductPrice) + (orderValue.totalGst) + (orderValue.diliveryCharge)}/-</p>
                        </div>
                        </div>
                        <p className="text-dange">payment : <span className={`fw-bold text-capitalize ${orderValue.paymentStatus === 'success'? 'text-success' : 'text-danger'}`}>{orderValue.paymentStatus}</span></p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Profile;
