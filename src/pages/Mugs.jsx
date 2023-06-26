import React from "react";
import pin from "../../models/pin";
import mongoose from "mongoose";
import conndb from "../../middlewire/mongoose";
import product from "../../models/product";
import Link from "next/link";
import Head from "next/head";

const Tshirts = ({ products }) => {
  return (
    <div>
      <Head>
        <title>LOCOCART - Mugs</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="png" href="/logo.png" />
      </Head>
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto md:ml-16">
          <div className="flex flex-wrap -m-4 ">
            {Object.keys(products).map((items) => {
              return (
                <div
                  passHref={true}
                  key={products[items]._id}
                  className="lg:w-1/5 md:w-1/4 p-4 w-full shadow-lg m-4 bg-pink-50"
                >
                  <Link href={`/product/${products[items].slug}`}>
                    <div
                      href={`/product/${products[items].slug}`}
                      className="block relative h-64 shadow-md  rounded overflow-hidden"
                    >
                      <img
                        alt="ecommerce"
                        className=" w-full h-full object-center block "
                        src={products[items].img}
                      />
                    </div>
                  </Link>

                  <div className="mt-4 text-center">
                    <h3 className="text-pink-400 text-md tracking-widest title-font font-semibold mb-1">
                      {products[items].title}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[items].descp}
                    </h2>
                    <p className="mt-1">₹{products[items].price}</p>
                    <div className="text-grey-200  text-sm font-light mt-2">
                      {products[items].size.includes("free") && (
                        <span className=" border-2 rounded-lg p-1 m-1 font-semibold border-gray-300">
                          FREE SIZE
                        </span>
                      )}
                      {products[items].size.includes("medium") && (
                        <span className=" border-2 rounded-lg p-1 m-1 font-semibold border-gray-300">
                          MEDIUM
                        </span>
                      )}
                      {products[items].size.includes("large") && (
                        <span className=" border-2 rounded-lg p-1 m-1 font-semibold border-gray-300">
                          LARGE
                        </span>
                      )}
                      {products[items].size.includes("xl") && (
                        <span className=" border-2 rounded-lg p-1 m-1 font-semibold border-gray-300">
                          XL
                        </span>
                      )}
                    </div>
                    <div className="mt-1">
                      {products[items].color.includes("gray") && (
                        <button className="rounded-full border-1 border-gray-700 bg-gray-400 p-2 mx-1"></button>
                      )}
                      {products[items].color.includes("red") && (
                        <button className="rounded-full border-1 border-gray-700 bg-red-600 p-2 mx-1"></button>
                      )}
                      {products[items].color.includes("blue") && (
                        <button className="rounded-full border-gray-700 border-1 bg-blue-800 p-2 mx-1"></button>
                      )}
                      {products[items].color.includes("green") && (
                        <button className="rounded-full border-gray-700 border-1 bg-green-800 p-2 mx-1"></button>
                      )}
                      {products[items].color.includes("yellow") && (
                        <button className="rounded-full border-gray-700 border-1 bg-yellow-300 p-2 mx-1"></button>
                      )}
                      {products[items].color.includes("black") && (
                        <button className="rounded-full border-gray-700 border-1 bg-black p-2 mx-1"></button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true});
  }
  let products = await product.find({ category: "mugs" });

  let mugs = {};
  for (let i of products) {
    if (i.title in mugs) {
      if (!mugs[i.title].color.includes(i.color) && i.qav > 0) {
        mugs[i.title].color.push(i.color);
      }
      if (!mugs[i.title].size.includes(i.size) && i.qav > 0) {
        mugs[i.title].size.push(i.size);
      }
    } else {
      mugs[i.title] = JSON.parse(JSON.stringify(i));
      if (i.qav > 0) {
        mugs[i.title].color = [i.color];
        mugs[i.title].size = [i.size];
      } else {
        mugs[i.title].color = [];
        mugs[i.title].size = [];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(mugs)) },
  };
}

export default Tshirts;