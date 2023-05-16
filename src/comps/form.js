import { Link, useNavigate, useParams } from "react-router-dom"
import React, { useRef, useState, useEffect } from "react";



export default function NewForm() {

    const forenameInputRef = useRef();
    const lastNameInputRef = useRef();
    const addressInputRef = useRef();
    const emailInputRef = useRef();
    const postcodeInputRef = useRef();
    const phoneInputRef = useRef();
    const navigate = useNavigate()
    const { sellerID, sellerFirstName, sellerLastName } = useParams()
    const [sellerList, setSellerList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/seller/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            .then(sellers => { setSellerList(sellers) })
            .catch(error => {
                console.error(error);
            });
    }, []);


    function addR() {





        const tempR = {
            "firstName": forenameInputRef.current.value,
            "lastName": lastNameInputRef.current.value,
            "address": addressInputRef.current.value,
            "email": emailInputRef.current.value,
            "postcode": postcodeInputRef.current.value,
            "phone": phoneInputRef.current.value
        }

        const compareObjects = (obj1, obj2) =>{
            const firstNameMatch = obj1.firstName === obj2.firstName;  
            const lastNameMatch = obj1.lastName === obj2.lastName;
            return firstNameMatch && lastNameMatch;
};

        if (!sellerList.some(item => compareObjects(item, tempR))) {


            if (forenameInputRef.current.value != "" && lastNameInputRef.current.value != "") {




                fetch("http://localhost:8080/seller/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(tempR)


                })
                    .then((response) => {
                        if (!response.ok) {
                            alert("An error has occured, unable to read sellers");
                            throw response.status;
                        } else navigate("/seller");
                    })
                    .catch(error => {
                        console.error(error);
                    });


            }
            else {

                alert("Please input your full name")
            }
        } else {

            alert("Sorry, this user is already registered")
        }


    }



     function onK(event) {
         if (event.keyCode === 13) {

             addR()


         }


     }


    return (
        <main>




            <form id="sellerForm" class="row g-3 needs-validation" noValidate>
                <div class="form-row">
                    <div class="mx-auto col-10 col-md-8 col-lg-6">
                        <div for="validationCustom01" class="form-label form-group col form-control is-valid">
                            <label for="InputName">Forename</label>
                            <input type="Name" ref={forenameInputRef} class="form-control" id="InpForename validationCustom01" aria-describedby="InputName" placeholder="Enter your forename" required></input>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div for="validationCustom02" class="form-label form-group col form-control is-valid">
                            <label for="InputName">Surname</label>
                            <input type="Name" ref={lastNameInputRef} class="form-control" id="InpSurname" aria-describedby="InputName" placeholder="Enter your surname" reqiured></input>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div for="validationCustom0" class="form-label form-group col form-control is-valid">
                            <label for="InputEmail">Email</label>
                            <input type="Name" ref={emailInputRef} class="form-control" id="InpEmail" aria-describedby="InputName" placeholder="Enter your email address" required></input>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div class="form-group form-control is-valid">
                            <label for="InputPhone">Phone Number</label>
                            <input type="phone" ref={phoneInputRef} class="form-control" id="InputPhone" placeholder="Phone Number" required></input>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div class="form-group form-control is-valid">
                            <label for="InputAddress">Address</label>
                            <input type="text" ref={addressInputRef} class="form-control" id="InputAddress" placeholder="Address" required></input>

                        </div>
                        {/* <label for="inputAddress">Address</label> */}
                        {/* <input type="text" class="form-control" id="inputAddress" placeholder="House Number"></input> */}
                        
                        <div class="form-group col-md-3 form-control is-valid">
                            <label for="inputPcode">Post Code</label>
                            <input type="text" ref={postcodeInputRef} class="form-control" id="inputPcode validationCustom03" required></input>
                            <div class="invalid-feedback">
                                Please provide a postcode.
                            </div>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" required></input>
                            <label class="form-check-label" for="exampleCheck1 invalidCheck">        Agree to terms and conditions
                            </label>
                            <div class="invalid-feedback">
                                You must agree before submitting.
                            </div>
                        </div>

                        <Link className="btn btn-success" onClick={() => addR()}> Save </Link>

                        <Link to="/seller" className="btn btn-primary"> Cancel </Link>


                    </div>




                </div>
            </form>
        </main>
    )
}

// const MyForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     isValid: false,
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Form submission logic
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//         pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
//       />
//       {formData.isValid && <i className="fa fa-check" />} {/* Render tick icon if form field is valid */}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default MyForm;