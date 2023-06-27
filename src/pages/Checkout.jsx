import React, { useEffect } from "react";
import Script from "next/script";
import axios from "axios";
import { useRouter } from "next/router";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const Checkout = ({ cart, addtocart, removecart, subtotal, clearcart }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [pin, setpin] = useState("");
  const [D, setD] = useState(true);

  const router = useRouter();
  let token;
  useEffect(() => {
    token = localStorage.getItem("token");
    if (token) {
      
      const fetem = async () => {
        let { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getemail`,
          {
            token: token,
          }
        );

        setname(data.data.name);
        setemail(data.data.email);
      };
      fetem();
    }
    else{
      toast.error(`Please Login to Checkout`, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setTimeout(() => {
        router.push('/Login')
      }, 400);
    }
  }, []);

  const handelchange = async (e) => {
    if (e.target.name === "name") {
      setname(e.target.value);
    } else if (e.target.name === "email") {
      setemail(e.target.value);
    } else if (e.target.name === "phone") {
      setphone(e.target.value);
    } else if (e.target.name === "address") {
      setaddress(e.target.value);
    } else if (e.target.name === "pin") {
      setpin(e.target.value);
      if (e.target.value.length == 6) {
        const pinjson = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getpins`
        ).then((res) => res.json());

        if (Object.keys(pinjson).includes(e.target.value)) {
          setstate(pinjson[e.target.value]["state"]);
          setcity(pinjson[e.target.value]["city"]);
        } else {
          setstate("");
          setcity("");
        }
      } else {
        setstate("");
        setcity("");
      }
    }
    if (token) {
      if (phone.length > 3 && pin.length > 3 && address.length > 3) {
        setD(false);
      } else {
        setD(true);
      }
    } else {
      if (
        name.length > 3 &&
        email.length > 3 &&
        phone.length > 3 &&
        pin.length > 3 &&
        address.length > 3
      ) {
        setD(false);
      } else {
        setD(true);
      }
    }
  };

  const initiatepayment = async () => {
    // const oid = Math.floor(Math.random() * Date.now()).toString();

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/pretransaction`,
      {
        subtotal,
        cart,
        phone:phone,
        pin:pin,
      }
    );

    if (data.success) {
      const { data1 } = await axios.post(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/postordr`,
        {
          email,
          oid: data.order.id,
          address,
          subtotal,
          cart,
        }
      );
      // const { data2 } = await axios.post(
      //   `${process.env.NEXT_PUBLIC_VERCEL_URL||'http://localhost:3000'}/api/posttransaction`,
      //   {
      //     oid,
      //   }
      // );

      const options = {
        key: process.env.NEXT_PUBLIC_key_id, // Enter the Key ID generated from the Dashboard
        amount: subtotal, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "LOKOCART",
        description: "Test Transaction",
        image: "https://i.ibb.co/87S5MLb/logo.png",
        order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posttransaction`,
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      clearcart();
      toast.error
      
      (`Sorry ! ${data.error}`, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_VERCEL_URL}`);
      }, 1500);
    }
  };
  return (
    <>
       <Head>
        <title>LOCOCART - Checkout</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type='png' href="/logo.png" />
      </Head>
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="text-center text-xl  font-bold py-8">Checkout</div>
      <div className="mx-8 my-4 md:mx-16 md:my-8">
        <h1 className="font-bold">1.Delivary Details</h1>
        <div className="md:flex md:space-x-2 items-center">
          <div className="  w-full ">
            <label
              htmlFor="name"
              className="leading-7 text-sm font-semibold text-gray-600"
            >
              Name
            </label>
            <input
              onChange={handelchange}
              value={name}
              type="text"
              id="name"
              name="name"
              placeholder="enter your name"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="  w-full">
            <label
              htmlFor="name"
              className="leading-7 text-sm font-semibold text-gray-600"
            >
              Email
            </label>

            <input
              onChange={handelchange}
              value={email}
              type="text"
              id="email"
              name="email"
              placeholder="enter your name"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="  w-full">
          <label
            htmlFor="name"
            className="leading-7 text-sm font-semibold text-gray-600"
          >
            Address
          </label>
          <br />
          <textarea
            onChange={handelchange}
            value={address}
            name="address"
            id="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            cols="30"
            rows="3"
          ></textarea>
        </div>

        <div className="md:flex md:space-x-2 items-center">
          <div className="  w-full ">
            <label
              htmlFor="phone"
              className="leading-7 text-sm font-semibold text-gray-600"
            >
              Phone
            </label>
            <input
              onChange={handelchange}
              value={phone}
              type="text"
              id="Phone"
              name="phone"
              placeholder="enter your Phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="  w-full">
            <label
              htmlFor="City"
              className="leading-7 text-sm font-semibold text-gray-600"
            >
              City
            </label>
            <input
              onChange={handelchange}
              value={city}
              type="text"
              id="city"
              name="city"
              placeholder="enter your City"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="md:flex md:space-x-2 items-center">
          <div className="  w-full">
            <label
              htmlFor="state"
              className="leading-7 text-sm font-semibold text-gray-600"
            >
              State
            </label>
            <input
              onChange={handelchange}
              value={state}
              type="text"
              id="state"
              name="state"
              placeholder="enter your state"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="  w-full ">
            <label
              htmlFor="pin"
              className="leading-7 text-sm font-semibold text-gray-600"
            >
              Pin
            </label>
            <input
              onChange={handelchange}
              value={pin}
              type="text"
              id="Pin"
              name="pin"
              placeholder="enter your Pin"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="section2 ">
          <h1 className="font-bold">1.Review Items</h1>
          <div className="box">
            <div className="sidebar w-full  p-4  rounded-md bg-pink-100">
              <ol className="list-decimal p-1 ">
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
                          <div className="w-1/5 flex  justify-around ">
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
              <div className="text-center mb-2">
                <span className="text-xl font-semibold">Subtotal : </span>
                <span className="text-red-600 font-semibold text-lg">
                  ₹{subtotal}
                </span>
              </div>
              <div className="flex justify-evenly items-center">
                <Link href={"/Checkout"}>
                  <button
                    disabled={D}
                    onClick={() => {
                      initiatepayment();
                      // clearcart();
                    }}
                    className="flex  disabled:bg-pink-300 mt-2 text-white hover:text-gray-900 bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-md"
                  >
                    Pay ₹{subtotal}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
