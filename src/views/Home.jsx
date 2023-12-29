import React from "react";
import { MdMail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="w-full flex flex-col px-10">
      <div className="flex flex-row border-b py-2 justify-between">
        <div className="w-10 h-10">
          <img src={require("../assets/images/logos/rab.png")} />
        </div>
        <div className="flex flex-row items-center gap-4">
          <a href="/" className="hover:opacity-80 transition-all">
            Home
          </a>
          <a href="/usersign" className="hover:opacity-80 transition-all">
            Farmer
          </a>
          <a href="/transporter" className="hover:opacity-80 transition-all">
            Dashboard
          </a>
          <a href="/login" className="hover:opacity-80 transition-all">
            Login
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10 py-20  justify-center">
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h1 className="text-[26px] max-w-[300px] text-green-600     font-bold">
            <span className="">AGROFORESTRY</span> MANAGEMENT SYSTEM
          </h1>
          <p className=" text-[14px] text-black/40 leading-4 max-w-[500px]">
            RAB implements the national policy, laws and strategies on
            agriculture and contribute to the development of the national policy
            and strategies in
          </p>
          <div className="flex flex-row">
            <a href="/register">
              <button className="py-2 bg-green-500 px-10 text-white uppercase transition-all hover:scale-90 hover:bg-green-600">
                Start
              </button>
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative">
          <div className="w-[300px] h-[200px]">
            <img
              src={require("../assets/images/forest1.jpg")}
              alt=""
              className="rounded-md w-full h-full object-cover"
            />
          </div>
          <div className="w-[300px] h-[200px] absolute top-20 left-40">
            <img
              src={require("../assets/images/forest2.jpg")}
              alt=""
              className="rounded-md w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10">
        <div className="p-10 border bg-gray-100 rounded-md flex flex-col gap-3 items-center shadow-md cursor-pointer hover:scale-90 transition-all">
          <h1 className="text-[20px] font-bold">Agriculture Development</h1>
          <span className="text-center text-black/50">
            RAB implements the national policy, laws and strategies on
            agriculture and contribute to the development of the national policy
            and strategies in…
          </span>
        </div>
        <div className="p-10 border bg-gray-100 rounded-md flex flex-col gap-3 items-center shadow-md cursor-pointer hover:scale-90 transition-all">
          <h1 className="text-[20px] font-bold">Our Mission</h1>
          <span className="text-center text-black/50">
            To coordinate and fast track basic education programs and activities
            aimed at providing to all categories of Rwandans the quality
            education.
          </span>
        </div>
        <div className="p-10 border bg-gray-100 rounded-md flex flex-col gap-3 items-center shadow-md cursor-pointer hover:scale-90 transition-all">
          <h1 className="text-[20px] font-bold">Our Vision</h1>
          <span className="text-center text-black/50">
            To promote the quality of education in basic, specialized and adult
            schools.
          </span>
        </div>
      </div>
      <div className="w-full bg-blue-500 p-4 h-[40vh] grid grid-cols-3 mt-10">
        <div>
          <h1 className="text-[20px] text-white font-bold">
            AGORFORESTRY <br />
            MANAGEMENT SYSTEM
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-[20px]">Quick Links</h1>
          <div className="flex flex-col gap-2 text-white font-[200]">
            <a href="/" className="hover:opacity-80">
              Home
            </a>
            <a href="/usersign" className="hover:opacity-80">
              Farmer
            </a>
            <a href="/transporter" className="hover:opacity-80">
              Dashboard
            </a>
            <a href="/login" className="hover:opacity-80">
              Login
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-[20px]">Contact us</h1>
          <div className="flex flex-col gap-2 text-white font-[200]">
            <div className="flex flex-row gap-2 items-center">
              <MdMail size={20} />
              <span>info@rab.gov.rw</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <IoIosCall size={20} />
              <span>Mobile:+250788385312</span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <FaLocationDot />
              <span>Rubona, Huye District</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
