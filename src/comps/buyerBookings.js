import { useState, useRef, useEffect, Component } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom/client';
import React from 'react';

export default function BuyerBookings() {

    const { buyerID, buyerFirstName, buyerSurname } = useParams()

    // const urlAddbooking=`/propForm/${buyer.id}/${buyer.firstName}/${buyer.surname}`
    const urlAddbooking = `/buyerBookings/${buyerID}/${buyerFirstName}/${buyerSurname}`


    const [bookingList, setbookingList] = useState([])
    // const [uniqueID, setUniqueID] = useState(0)
    const navigate = useNavigate()
    const amendButton = useRef();

    const idRef = useRef()
    const addressRef = useRef()
    const postcodeRef = useRef()
    const typeRef = useRef()
    const priceRef = useRef()
    const bedroomRef = useRef()
    const bathroomRef = useRef()
    const gardenRef = useRef()
    // const buyerIdRef = useRef()
    const statusRef = useRef(null)
    // const buyerIdRef = useRef()


    // const [jsonData, setJsonData] = useState([]); // JSON data stored in state



    useEffect(() => {

        fetch(`http://localhost:3000/booking`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read buyers");
                    throw response.status;
                } else return response.json();
            })
            // .then(buyers => { setbookingList(buyers) })
            .then(pList => { setbookingList(pList.filter(booking => booking.buyerId == buyerID)) }) //linking IDs
            .catch(error => {
                console.error(error);
            });
    }, []);

    // const selID=1;
    bookingList.filter(booking => booking.buyerId === buyerID)

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const formattedDate = dateTime.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
        const formattedTime = dateTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric"
        });
        return `${formattedDate} at ${formattedTime}`;
      };

    function removeR(recno) {

        let tempR = bookingList.filter(recs => recs.id != recno)
        let choice = window.confirm("Are you sure you want to delete this record")
        if (choice) {
            setbookingList(tempR)


            fetch(`http://localhost:3000/booking/${recno}`, {
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
        }
        else { }
    };

    function resubmit(recno) {

        const statusChange = { status: "FOR SALE" };



        fetch(`http://localhost:3000/booking/${recno}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statusChange)
        })
            .then(response => response.json())
            .then(
        )
            .catch(error => {
                console.error('Failed to delete JSON entry:', error);
            });

        fetch(`http://localhost:3000/booking`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read buyers");
                    throw response.status;
                } else return response.json();
            })
            // .then(buyers => { setbookingList(buyers) })
            .then(pList => { setbookingList(pList.filter(booking => booking.buyerId == buyerID)) }) //linking IDs
            .catch(error => {
                console.error(error);
            });





    }

    



    function withdraw(recno) {

        const statusChange = { status: "WITHDRAWN" };

        fetch(`http://localhost:3000/booking/${recno}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statusChange)
        })
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read buyers");
                    throw response.status;
                } else return response.json();
            })
            .then()
            .catch(error => {
                console.error('Failed to delete JSON entry:', error);
            });


        fetch(`http://localhost:3000/booking`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read buyers");
                    throw response.status;
                } else return response.json();
            })
            // .then(buyers => { setbookingList(buyers) })
            .then(pList => { setbookingList(pList.filter(booking => booking.buyerId == buyerID)) }) //linking IDs
            .catch(error => {
                console.error(error);
            });



    }

    const [isAmend, setAmend] = useState(true);

    function canc() {


        setAmend(true)
    }

    const handleStatusChange = (event, ref) => {
        // Update the value in the ref
        ref.current.value = event.target.value;
    }; // handles the change event of the status <select> element



    function amend(recno) {

        if (amendButton.current.value == "Amend") {
            setAmend(false)

            // typeRef.current.value = 5
            // priceRef.current.value = recno.type
            // bedroomRef.current.value = recno.type
            // bathroomRef.current.value = recno.type
            // gardenRef.current.value = recno.type
            // addressRef.current.value = recno.type
            // postcodeRef.current.value = recno.type
            // recno.buyerId = recno.type
            // statusRef.current.value = recno.type



        }
        else if (amendButton.current.value == "Save") {
            // const statusChange = { status: "Withdrawn" };


            const tempR = {
                "type": typeRef.current.value,
                "price": priceRef.current.value,
                "bedroom": bedroomRef.current.value,
                "bathroom": bathroomRef.current.value,
                "garden": gardenRef.current.value,
                "address": addressRef.current.value,
                "postcode": postcodeRef.current.value,
                "buyerId": recno.buyerId,
                "status": statusRef.current.value

            }

            fetch(`http://localhost:3000/booking/${recno.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempR)
            })
                .then((response) => {
                    if (!response.ok) {
                        alert("An error has occured, unable to read buyers");
                        throw response.status;
                    } else return response.json();
                })
                .then()
                .catch(error => {
                    console.error('Failed to delete JSON entry:', error);
                });


            fetch(`http://localhost:3000/booking`)
                .then((response) => {
                    if (!response.ok) {
                        alert("An error has occured, unable to read buyers");
                        throw response.status;
                    } else return response.json();
                })
                // .then(buyers => { setbookingList(buyers) })
                .then(pList => { setbookingList(pList.filter(booking => booking.buyerId == buyerID)) }) //linking IDs
                .catch(error => {
                    console.error(error);
                });

            setAmend(true)


        }
        else if (amendButton.current.value == "Cancel") {
            setAmend(true)

        }






    }

    // ReactDOM.render(<p>Hallo</p>, document.getElementById('table1'))
    return (

        <>

            <main>

                <h1>Bookings of <b>{buyerFirstName} {buyerSurname}</b> </h1>


                <table class="table1">
                    <tr>
                        <th scope="col">Booking ID</th>
                        <th scope="col">Property ID</th>
                        <th scope="col">Date</th>

                        <th scope="col">Changes</th>
                        {/* <th scope="col"></th> */}
                 

                    </tr>
                    {

                        bookingList.map(rec => <tr>

                            <td><span>{rec.id}</span></td>
                            <td><span>{rec.propertyId}</span></td>
                            <td><span>  {formatDateTime(rec.time)}</span></td>






                            
                            {/* <td><input type="button" onClick={() => removeR(rec.id)}/><FontAwesomeIcon icon={faTrash} id="trashCan"/></td> */}
                            <td>    <button className="my-button"onClick={() => removeR(rec.id)} >
                                Cancel
                                 

                            </button></td>
                        </tr>
                        )
                    }
                </table>
                {/* </div> */}
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


