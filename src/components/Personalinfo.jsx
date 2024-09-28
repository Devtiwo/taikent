import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "../Redux/authSlice";
import { toast } from "react-toastify";

const Personalinfo = ({ user }) => {
  const formik = useFormik({
    initialValues: {
      fname: user.firstName || "",
      lname: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      country: user.country || ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      fname: yup.string().required("First name is required"),
      lname: yup.string().required("last name is required"),
      email: yup
        .string()
        .required("Email is required")
        .email("A valid email is required"),
      phone: yup
        .string()
        .required("Phone no. is required")
        .matches(
          /^\d{3,15}$/,
          "Enter a valid phone number without dailing code"
        ),
      address: yup.string().required("Address is required"),
      country: yup.string().required("Country is required"),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${baseUrl}/user/updateprofile`, values,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.status) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message || "Error updating profile");
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Server error! Please try again."
        );
      }
    },
  });
  return (
    <section className="mt-20">
      <div>
        <div>
          <h1 className="text-4xl ml-5">Personal Information</h1>
          <form
            className="p-5 w-full lg:w-4/5 mt-5 mb-10"
            method="POST"
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col lg:flex-row gap-7 mb-5">
              <div className="flex flex-col w-full">
                <label htmlFor="fname" className="mb-1 ml-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="Enter first name"
                  className="p-3 border-2 border-fuchsia-300 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fname}
                />
                <small className="text-rose-700 font-medium ml-1 mt-1">
                 {formik.touched.fname && formik.errors.fname}
                </small>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="lname" className="mb-1 ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  placeholder="Enter last name"
                  className="p-3 border-2 border-fuchsia-300 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lname}
                />
                <small className="text-rose-700 font-medium ml-1 mt-1">
                 {formik.touched.lname && formik.errors.lname}
                </small>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-7 mb-5">
              <div className="flex flex-col w-full">
                <label htmlFor="phone" className="mb-1 ml-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone no."
                  className="p-3 border-2 border-fuchsia-300 outline-0 border-2 border-fuchsia-300 rounded-lg"
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
                  name="address"
                  id="address"
                  placeholder="Enter your address"
                  className="p-3 border-2 border-fuchsia-300 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                <small className="text-rose-700 font-medium ml-1 mt-1">
                 {formik.touched.address && formik.errors.address}
                </small>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-7 mb-5">
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="mb-1 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="p-3 border-2 border-fuchsia-300 outline-0 border-2 border-fuchsia-300 rounded-lg"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <small className="text-rose-700 font-medium ml-1 mt-1">
                 {formik.touched.email && formik.errors.email}
                </small>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="country" className="mb-1 ml-1">
                  Country
                </label>
                <select
                  className="p-3 border-2 border-fuchsia-300 outline-0 border-2 border-fuchsia-300 rounded-lg"
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
                  <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
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
                  <option value="Central african Republic">Central African Republic</option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Congo(Democratic republic) ">Congo(Democratic Republic)</option>
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
                  <option value="East Timor (Timor-Leste)">East Timor (Timor-Leste)</option>
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
                  <option value="Saint Vincent & the Grenadines">Saint Vincent & the Grenadines</option>
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
                  <option value="United Arab Emirates">United Arab Emirates</option>
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
            </div>
            <div>
              <button
                type="submit"
                className="py-3 px-5 mt-14 w-auto font-medium text-lg bg-black text-white hover:bg-fuchsia-700 transition ease-in duration-200 rounded-lg"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Personalinfo;
