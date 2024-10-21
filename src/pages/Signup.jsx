import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearMessage } from "../Redux/authSlice";
import Background from "../Components/Background";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, status } = useSelector((state) => state.auth);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      const redirectTimeout = setTimeout(() => {
        navigate("/login");
      }, countdown * 1000);
      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimeout);
      };
    }
  }, [status, navigate, countdown]);
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      country: "",
    },
    validationSchema: yup.object({
      fname: yup.string().required("First name is required"),
      lname: yup.string().required("Last name is required"),
      email: yup
        .string()
        .required("Email is required")
        .email("Enter a valid email"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      phone: yup.string().required("A valid phone number is required"),
      address: yup.string().required("Address is required"),
      country: yup.string().required("Country is required"),
    }),
    onSubmit: async (values, { resetForm, setStatus }) => {
      try {
        const result = await dispatch(signup(values));
        if (signup.fulfilled.match(result)) {
          resetForm();
        } else {
          setStatus(result.payload);
        }
      } catch (error) {
        setStatus("An uexpected error occured!");
      }
    },
  });
  return (
    <section className="h-screen relative z-10">
      <Background />
      <div className="relative h-28 z-20 bg-white">
        <img src="/images/taikent.png" alt="logo" className="ml-10" />
      </div>
      <div className="relative z-50 h-full">
        <div>
          {message && (
            <div
              className="text-center text-sm mt-5"
              style={{ color: status === "failed" ? "red" : "green" }}
            >
              {message}
              {status === "succeeded" && (
                <p> redirecting to login page in {countdown} seconds...</p>
              )}
            </div>
          )}
          <h1 className="font-medium text-2xl text-center mt-10 ">
            Let's get you started.
          </h1>
          <form
            className="w-4/5 lg:w-2/5 mx-auto py-12 px-7 bg-slate-50 shadow-2xl shadow-fuchsia-300"
            autoComplete="off"
            method="POST"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex gap-5 flex-col lg:flex-row mb-5">
              <div className="flex flex-col w-full">
                <label htmlFor="fname" className="mb-1 ml-1 text-sm">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="First Name"
                  className="p-3 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fname}
                />
                <small className="text-rose-700 font-medium ml-1 mt-1">
                  {formik.touched.fname && formik.errors.fname}
                </small>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="lname" className="mb-1 ml-1 text-sm">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  placeholder="Last Name"
                  className="p-3 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lname}
                />
                <small className="text-rose-700 font-medium ml-1 mt-1">
                  {formik.touched.lname && formik.errors.lname}
                </small>
              </div>
            </div>
            <div className="flex gap-5 flex-col lg:flex-row mb-5">
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="mb-1 ml-1 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  className="p-3 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <small className="text-rose-700 font-medium ml-1 mt-1">
                  {formik.touched.email && formik.errors.email}
                </small>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="password" className="mb-1 ml-1 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="p-3 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <small className="text-rose-700 font-medium ml-1 mt-1">
                  {formik.touched.password && formik.errors.password}
                </small>
              </div>
            </div>
            <div className="flex gap-5 flex-col lg:flex-row mb-5">
              <div className="flex flex-col w-full">
                <label htmlFor="phone" className="mb-1 ml-1 text-sm">
                  Phone No.(without dailing code)
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  className="p-3 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                <small className="text-rose-700 font-medium ml-1 mt-1">
                  {formik.touched.phone && formik.errors.phone}
                </small>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="address" className="mb-1 ml-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  className="p-3 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                <small className="text-rose-700 font-medium ml-1 mt-1">
                  {formik.touched.address && formik.errors.address}
                </small>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="country" className="mb-1 ml-1 text-sm">
                Country
              </label>
              <select
                className="p-3 border-2 border-fuchsia-300 outline-0 rounded-lg"
                id="country"
                name="country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
              >
                <option value="">-- Select your Country --</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia & Herzegovina">
                  Bosnia & Herzegovina
                </option>
                <option value="Botswana">Botswana</option>
                <option value="Brazil">Brazil</option>
                <option value="Brunei">Brunei</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cabo Verde">Cabo Verde</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Central african Republic">
                  Central African Republic
                </option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo(Democratic republic) ">
                  Congo(Democratic Republic)
                </option>
                <option value="Congo(republic)">Congo(Republic)</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Côte d’Ivoire">Côte d’Ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="East Timor (Timor-Leste)">
                  East Timor (Timor-Leste)
                </option>
                <option value="Ecuador">Ecaduor</option>
                <option value="Eqypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Eswatini">Eswatini</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Greece">Greece</option>
                <option value="Grenada">Grenada</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-Bissau">Guinea-Bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Honduras">Honduras</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea North">Korea (North)</option>
                <option value="Korea South">Korea (South)</option>
                <option value="Kosovo">Kosovo</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Laos">Laos</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">liberia</option>
                <option value="Libya">Libya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia">Micronesia</option>
                <option value="Moldova">Moldova</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar (burma)">Myanmar(Burma)</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Morth Macedonia">North Macedonia</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">palau</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea"></option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Qatar">Qatar</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint kitts & Nevis">Saint Kitts & Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Vincent & the Grenadines">
                  Saint Vincent & the Grenadines
                </option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Sudan(south)">Sudan (south)</option>
                <option value="Suriname">Suriname</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syria</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Thailand">Thailand</option>
                <option value="Togo">Togo</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">
                  United Arab Emirates
                </option>
                <option value="United Kingdom">United kingdom</option>
                <option value="United States">United States</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Vatican City">Vatican City</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
              <small className="text-rose-700 font-medium ml-1 mt-1">
                {formik.touched.country && formik.errors.country}
              </small>
            </div>
            <div className="mt-14 flex lg:justify-center">
              <button
                type="submit"
                className="p-3 w-full lg:w-2/5 font-medium text-2xl bg-black text-white hover:bg-fuchsia-700 transition ease-in duration-200 rounded-lg"
              >
                Register
              </button>
            </div>
            <div className="text-center font-medium mt-8">
              <small>
                Already have an account?
                <Link
                  to="/login"
                  className="text-sm text-fuchsia-500 hover:text-purple-500"
                >
                  Login
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
