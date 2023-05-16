import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useParams } from "react-router-dom"

export default function BuyerData() {

    const [buyers, setBuyerList] = useState([])
    const [uniqueID, setUniqueID] = useState(0)
    const navigate = useNavigate()


    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const addressRef = useRef()
    const postcodeRef = useRef()
    const phoneRef = useRef()
    const bForm = useRef()
    const showButton = useRef()



    useEffect(() => {
        fetch("http://localhost:8080/buyer/read")
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occurred, unable to read buyers");
                    throw new Error(response.status);
                } else
                    return response.json();
            })
            .then(buyers => {
                setBuyerList(buyers)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const showBookings = (buyer) => {
        const urlBuyerProperties = `/buyerBookings/${buyer.buyers_id}/${buyer.firstName}/${buyer.lastName}`;
        navigate(urlBuyerProperties);
    };


    const removeR = (recno) => {
        let tempR = buyers.filter((recs) => recs.buyers_id !== recno);
        let choice = window.confirm("Are you sure you want to delete this record");
        if (choice) {
            setBuyerList(tempR);
            fetch(`http://localhost:8080/buyer/delete/${recno}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(deletedData => {
                    console.log('JSON entry deleted successfully!', deletedData);
                    // Perform additional actions as needed after successful deletion
                })
                .catch(error => {
                    console.error('Failed to delete JSON entry:', error);
                });
        } else {
            // User canceled deletion
        }
    };

    const addR = () => {
        const newBuy = {
            "firstName": firstNameRef.current.value,
            "lastName": lastNameRef.current.value,
            "email": emailRef.current.value,
            "address": addressRef.current.value,
            "postcode": postcodeRef.current.value,
            "phone": phoneRef.current.value,
            "id": buyers.length + uniqueID + 1
        };

        if (newBuy.firstName && newBuy.lastName && newBuy.email && newBuy.phone && newBuy.address && newBuy.postcode) {
            setUniqueID(uniqueID + 1);
            setBuyerList([...buyers, newBuy]);

            fetch("http://localhost:8080/buyer/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newBuy)
            })
                .then((response) => {
                    navigate("/Buyer");
                })
                .catch(error => {
                    console.error('Error saving buyer:', error);
                });
        } else {
            alert("Please fill in all the required fields");
        }
    };







    function onK(event) {
        if (event.keyCode === 13) {

            addR()


        }


    }

    let count = 0
    function formDisplay() {
        if (count % 2 == 0) {
            showButton.current.value = "Hide"

            bForm.current.style.display = "block"
            count++
        }
        else {
            count++
            showButton.current.value = "Add Record"
            bForm.current.style.display = "none"
        }


    }


    return (
        <>
            <main>

                <div className="topSeller">            <Link to="/formBuyer" className="btn btn-secondary" id="showButton"> Register To Buy </Link>
                </div>

                <form id="buyerForm" ref={bForm} style={{ display: "none" }}>
                    <div className="form-row">
                        <div className="mx-auto col-10 col-md-8 col-lg-6">
                            <div className="form-group col">
                                <label for="InputName">Forename</label>
                                <input type="Name" ref={firstNameRef} className="form-control" id="InpForename" aria-describedby="InputName" placeholder="Enter your forename"></input>
                            </div>

                            <div className="form-group col">
                                <label for="InputName">Surname</label>
                                <input type="Name" ref={lastNameRef} className="form-control" id="InpLastName" aria-describedby="InputName" placeholder="Enter your surname"></input>
                            </div>



                            <div className="form-group">
                                <label for="InputPhone">Phone Number</label>
                                <input type="phone" ref={phoneRef} className="form-control" id="InputPhone" placeholder="Phone Number"></input>

                            </div>

                            <div className="form-group">
                                <label for="InputAddress">Address</label>
                                <input type="text" ref={addressRef} className="form-control" id="InputAddress" placeholder="Address"></input>

                            </div>

                            <div className="form-group col-md-3">
                                <label for="inputPcode">Post Code</label>
                                <input type="text" ref={postcodeRef} className="form-control" id="inputPcode"></input>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                                <label className="form-check-label" for="exampleCheck1">Check me out</label>
                            </div>

                            {<button type="submit" className="btn btn-primary" onClick={() => addR()}>Submit</button>}
                            <input type="button" className="btn btn-success" value="Add Record" onClick={() => addR()} id="addButt"></input>


                        </div>




                    </div>
                </form>
                <br />
                <br />
                <br />
                {/* <div class = "theTable"> */}

                <table className="table1">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Forename</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Postcode</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Bookings</th>
                        </tr>
                    </thead>
                    <tbody>


                        {
                            buyers.map(rec =>

                                <tr key={rec.buyers_id}>
                                    <td> {rec.buyers_id}  </td>
                                    <td> {rec.firstName}  </td>
                                    <td> {rec.lastName}  </td>
                                    <td> {rec.email} </td>
                                    <td> {rec.address}  </td>
                                    <td> {rec.postcode}  </td>
                                    <td> {rec.phone}  </td>


                                    <td>
                                        <button className="btn-outline-dark" onClick={() => showBookings(rec)}>manage bookings</button>
                                    </td>

                                    <td>
                                        <button className="my-button">
                                            <FontAwesomeIcon icon={faTrash} onClick={() => removeR(rec.buyers_id)} />

                                        </button>
                                    </td>

                                </tr>
                            )}
                    </tbody>

                </table>
                <br />



                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />



            </main>
        </>);

}


