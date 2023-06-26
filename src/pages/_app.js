import "@/styles/globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setuser] = useState({ value: null });
  const [key, setkey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cart, setcart] = useState({});
  const [subtotal, setsubtotal] = useState(0);
  const logout = () => {
    localStorage.removeItem("token");
    setuser({ value: null });
    setkey(Math.random);
    router.push('/')
  };
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")));
        savecart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }

    const token = localStorage.getItem("token");
    if (token) {
      setuser({ value: token })
    }
    setkey(Math.random);

    // return () => {

    // }
  }, [router.query]);

  const savecart = (mycart) => {
    localStorage.setItem("cart", JSON.stringify(mycart));
    let subt = 0;
    let keys = Object.keys(mycart);
    for (let i = 0; i < keys.length; i++) {
      if (mycart[keys[i]] != null) {
        subt += mycart[keys[i]].price * mycart[keys[i]].qty;
      } else {
        subt = 0;
      }
    }

    setsubtotal(subt);
  };

  const buynow = (itemcode, qty, price, name1, size, variant) => {
    let nc ={}
    nc[itemcode] = { qty, price, name1, size, variant } ;
    setcart(nc);
    savecart(nc);
    router.push("/Checkout");
  };
  const addtocart = (itemcode, qty, price, name1, size, variant,togler) => {
    let newcart = cart;
    if (itemcode in cart) {
      newcart[itemcode].qty = cart[itemcode].qty + qty;
    } else {
      newcart[itemcode] = { qty: 1, price, name1, size, variant };
    }
    setcart(newcart);
    savecart(newcart);
    if(togler){
      setkey(Math.random);
    }
    
  };
  const removecart = (itemcode, qty, price, name1, size, variant) => {
    let newcart = cart;
    if (itemcode in cart) {
      newcart[itemcode].qty = cart[itemcode].qty - qty;
    }
    if (newcart[itemcode].qty <= 0) {
      delete newcart[itemcode];
    }
    setcart(newcart);
    savecart(newcart);
  };
  const clearcart = () => {
    console.log("cart cleared");
    setcart({});
    savecart({});
  };
  return (
    <>
      <LoadingBar
        color="#FF66B2"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      {key&& <Navbar
        user={user}
        logout={logout}
        key={key}
        cart={cart}
        subtotal={subtotal}
        addtocart={addtocart}
        removecart={removecart}
        clearcart={clearcart}
      />}
      <Component
        cart={cart}
        buynow={buynow}
        subtotal={subtotal}
        addtocart={addtocart}
        removecart={removecart}
        clearcart={clearcart}
        {...pageProps}
      />
      <Footer />
    </>
  );
}
