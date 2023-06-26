import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";

import { BsFillCartFill, BsFillCartXFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import logo from "../../Images/LOCOCART.png";
import Link from "next/link";
import { useRouter } from "next/router";
const Navbar = ({
  logout,
  cart,
  subtotal,
  addtocart,
  removecart,
  clearcart,
}) => {
  const [dropdown, setdropdown] = useState(false);
  const [scart, setscart] = useState(false);
  const [userdata, setuserdata] = useState(false);
  const ref = useRef();
  const router = useRouter();
  useEffect(() => {
   
    let exempted = ["/Checkout", "/Order", "/Orders","/Login","/Register","/"];
    if (exempted.includes(router.pathname) || Object.keys(cart).length === 0) {
      setscart(false);
    }
    else if(Object.keys(cart).length !== 0){
      setscart(true);
    }
    if (localStorage.getItem("token")) {
      setuserdata(true);
    }
  }, []);
  const togglecart = () => {
    setscart(!scart);
  };

  return (
    <>
      <span onMouseLeave={() => setdropdown(false)}>
        {dropdown && (
          <div className="fixed md:right-16 right-14 top-8 md:top-9 text-sm text-justify rounded-md p-2 w-32 font-semibold z-30  bg-pink-200">
            <div>
              <ul>
                <Link href={"/Myaccount"}>
                  <li className="hover:text-pink-700 py-1 cursor-pointer">
                    My Account
                  </li>
                </Link>
                <Link href={"/Orders"}>
                  <li className="hover:text-pink-700 cursor-pointer py-1">
                    My Orders
                  </li>
                </Link>
                <li
                  onClick={logout}
                  className="hover:text-pink-700  cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        )}
      </span>
      <div
        className={`flex flex-col bg-white md:flex-row md:justify-start justify-center ${
          !scart && "overflow-hidden"
        } items-center py-2 shadow-md text-center sticky top-0 z-10`}
      >
        <div className="logo md:mx-5 mr-auto">
          <Link href={"/"} className="cursor-pointer">
            <Image
              width={160}
              height={100}
              className="m-auto  p-1"
              src={logo}
              alt="logo"
            />
          </Link>
        </div>
        <div className="nav  space-x-6 font md:text-md">
          <Link
            href={"/Tshirts"}
            className="  font-semibold hover:text-pink-600"
          >
            Tshirts
          </Link>
          <Link href={"/Mugs"} className="  font-semibold hover:text-pink-600">
            Mugs
          </Link>

          <Link href={"/About"} className=" font-semibold hover:text-pink-600">
            About
          </Link>
          <Link href={"/"} className=" font-semibold hover:text-pink-600">
            Others
          </Link>
          <Link href={"/"} className=" font-semibold hover:text-pink-600">
            Profile
          </Link>
        </div>
        <div className="cart   fixed right-1 top-4 space-x-1 mx-5 md text-2xl flex items-center justify-center ">
          <span onMouseOver={() => setdropdown(true)}>
            {userdata && (
              <BiUserCircle className="text-xl md:text-2xl  hover:text-pink-600  cursor-pointer mr-1" />
            )}
          </span>
          {!userdata && (
            <Link href={"/Login"}>
              <button className="bg-pink-500 text-white p-2 text-sm font-normal  mx-2 rounded-md">
                Login
              </button>
            </Link>
          )}

          <AiOutlineShoppingCart
            onClick={togglecart}
            className="text-xl md:text-2xl  hover:text-pink-600  cursor-pointer"
          />
        </div>
        <div
          ref={ref}
          className={`sidebar w-72 overflow-auto  h-screen  transition-all  ${
            scart ? "right-0" : "-right-96"
          }  top-0  absolute z-40 rounded-md bg-pink-100`}
        >
          <h2 className="font-bold text-xl pt-4">Shoping Cart</h2>
          <span
            onClick={togglecart}
            className="absolute top-2 right-2 text-xl cursor-pointer text-pink-600 hover:text-red-700 font-semibold"
          >
            <AiFillCloseCircle />
          </span>

          <ol className="list-decimal p-6 ">
            {Object.keys(cart).length == 0 && (
              <div className="my-4 text-black font-bold">Cart Is Empty</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="flex my-6 justify-between ">
                    <div className="w-2/4    text-justify">
                      {cart[k].name1} ({cart[k].size}/{cart[k].variant})
                    </div>
                    <div className="flex ">
                      <span className="p-1 cursor-pointer text-lg font-bold text-pink-600 hover:text-gray-700">
                        <AiOutlineMinusCircle
                          onClick={() => {
                            removecart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name1,
                              cart[k].size,
                              cart[k].variant
                            );
                          }}
                        />
                      </span>
                      <div className="w-1/5 flex  justify-center ">
                        {cart[k].qty}
                      </div>
                      <span className="p-1 cursor-pointer text-lg font-bold text-pink-600 hover:text-gray-700">
                        <AiOutlinePlusCircle
                          onClick={() => {
                            addtocart(
                              k,
                              1,
                              cart[k].price,
                              cart[k].name1,
                              cart[k].size,
                              cart[k].variant,
                              false
                            );
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div
            className={`${
              Object.keys(cart).length !== 0
                ? "bg-pink-300 p-8 pb-20 shadow-[10px_0px_2px_0px_rgba(0,0,0,0.56)]"
                : "bg-transparent"
            } p-2 `}
          >
            <span className="text-xl font-semibold">Subtotal : </span>
            <span className="text-red-600 font-semibold text-lg">
              ₹{subtotal}
            </span>
            <div className="flex justify-evenly items-center ">
              <Link
                href={`${Object.keys(cart).length !== 0 ? "/Checkout" : "/"}`}
              >
                <button
                  disabled={Object.keys(cart).length === 0}
                  onClick={() => {
                    toast.success(`redirecting to checkout page`, {
                      position: "bottom-center",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  }}
                  className="flex  mt-2 text-white disabled:hover:text-gray-100 hover:text-gray-900 disabled:bg-pink-300 bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-md"
                >
                  <BsFillCartFill className="m-1" />
                  Checkout
                </button>
              </Link>

              <button
              disabled={Object.keys(cart).length === 0}
                onClick={()=>{
                  clearcart();
                  setscart(false)
                }}
                className="flex  mt-2 text-white disabled:hover:text-gray-100 hover:text-gray-900 bg-pink-500 disabled:bg-pink-300 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-md"
              >
                <BsFillCartXFill className="m-1" />
                Clear cart
              </button>
            </div>
          </div>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
};

export default Navbar;
