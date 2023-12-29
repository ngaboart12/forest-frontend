import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import jsonData from "./ui/data.json";

const Register = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    province: "",
    district: "",
    sector: "",
    role: "", // default value
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        formData
      );

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect based on user role
      const role = response.data.user.role;
      toast.success("success login");
      setLoading(false);
      switch (role) {
        case "sector-leader":
          // Redirect to sector leader page
          // Replace '/sector-leader' with your actual route
          window.location.href = "/starter";
          break;
        case "district-leader":
          // Redirect to district leader page
          // Replace '/district-leader' with your actual route
          window.location.href = "/district";
          break;
        case "rab-leader":
          // Redirect to rab portal page
          // Replace '/rab-portal' with your actual route
          window.location.href = "/rabportal";
          break;
        default:
          // Redirect to a default page if the role is not recognized
          // Replace '/default-page' with your actual route
          window.location.href = "/login  ";
          break;
      }
    } catch (error) {
      console.error(error.response.data); // handle error, maybe show an error message to the user
    }
  };

  const handleProvinceChange = (event) => {
    const selectedProvinceValue = event.target.value;

    // Reset lower-level dropdown when district changes
    setFormData((prevFormData) => ({
      ...prevFormData,
      province: selectedProvinceValue,
    }));

    setSelectedProvince(selectedProvinceValue);

    // Reset other dropdowns when province changes
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictValue = event.target.value;

    // Reset lower-level dropdown when district changes
    setFormData((prevFormData) => ({
      ...prevFormData,
      district: selectedDistrictValue,
    }));

    setSelectedDistrict(selectedDistrictValue);
  };

  const handleSectorChange = (event) => {
    const selectedSectorValue = event.target.value;

    // Reset lower-level dropdown when sector changes
    setFormData((prevFormData) => ({
      ...prevFormData,
      sector: selectedSectorValue,
    }));

    setSelectedSector(selectedSectorValue);
  };

  return (
    <div className="w-full relative md:justify-center flex flex-col bg-blue-100/50 h-screen md:flex-row">
      <motion.div
        initial={{ opacity: 0, y: -250 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 py-8 w-full bg-blue-500 md:ml-[-40px] flex flex-col justify-center items-center gap-4 px-10 lg:px-20"
      >
        <h1 className="text-[40px] font-bold text-white text-center leading-10 uppercase">
          AgroForestry management system
        </h1>
        <p className="text-center text-[14px] text-gray-300 leading-4">
          Feel free to adapt this form based on your specific requirements and
          any legal or regulatory considerations in Rwanda. Ensure that the form
          clearly communicates the responsibilities and expectations of farmers
          engaging in agriculture within forested areas. .
        </p>
        <a
          href="/login"
          className="border-1 border-white py-2 px-8 text-white rounded-md hover:scale-110 transition-all"
        >
          Login Here
        </a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 250 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className=" px-4 flex flex-col items-center justify-center  gap-8 w-full md:w-1/2 py-4    bg-white rounded-md "
      >
        <h1 className="text-[24px] font-semibold">Sign Up</h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className=" items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  gap-4"
        >
          <div className="flex flex-col w-full gap-1">
            <h1>Full name</h1>
            <input
              required
              placeholder="Full name"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              type="text"
              className="border rounded-md outline-none border-black/80 p-3  "
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <h1>Your email address</h1>
            <input
              required
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="border rounded-md outline-none border-black/80 p-3  "
            />
          </div>
          <div className="flex flex-col w-full gap-1" onChange={handleChange}>
            <h1>Password</h1>
            <input
              required
              minLength={6}
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-md outline-none border-black/80 p-3  "
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <h1>Role</h1>
            <select
              required
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border rounded-md outline-none border-black/80 p-3  "
            >
              <option value="">please select</option>
              <option value="sector-leader">sector leader</option>
              <option value="district-leader">District leader</option>
              <option value="rab-leader">RAB</option>
            </select>
          </div>

          {formData.role === "district-leader" && (
            <div className="flex flex-col gap-1">
              <label>District:</label>
              {/* Render district dropdown and update options based on selected province */}
              <select
                className="border border-black/50 py-3 px-4 rounded-md"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="">Select District</option>
                {Object.keys(jsonData).flatMap((province) =>
                  Object.keys(jsonData[province]).map((district) => (
                    <option key={`${province}-${district}`} value={district}>
                      {district}
                    </option>
                  ))
                )}
              </select>
            </div>
          )}
          {formData.role === "sector-leader" && (
            <>
              <div className="flex flex-col gap-1">
                <label>Province:</label>
                <select
                  className="border border-black/50 py-3 px-4 rounded-md"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                >
                  <option value="">Select Province</option>
                  {Object.keys(jsonData).map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              {selectedProvince && (
                <div className="flex flex-col gap-1">
                  <label>District:</label>
                  <select
                    className="border border-black/50 py-3 px-4 rounded-md"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                  >
                    <option value="">Select District</option>
                    {Object.keys(jsonData[selectedProvince]).map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedDistrict && (
                <div className="flex flex-col gap-1">
                  <label>Sector:</label>
                  <select
                    className="border border-black/50 py-3 px-4 rounded-md"
                    value={selectedSector}
                    onChange={handleSectorChange}
                  >
                    <option value="">Select Sector</option>
                    {Object.keys(
                      jsonData[selectedProvince][selectedDistrict]
                    ).map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            className=" h-[50px] bg-blue-400 hover:bg-blue-500 transition-all w-full rounded-md text-white text-[14px]"
          >
            {loading ? "Loading ..." : "Register"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
