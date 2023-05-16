import { Link, useNavigate, useParams } from "react-router-dom"
import React, { useRef, useState, useEffect } from "react";



export default function PropForm() {

    const typeInputRef = useRef();
    const priceInputRef = useRef();
    const bedInputRef = useRef();
    const bathInputRef = useRef();
    const gardenInputRef = useRef();
    const addressInputRef = useRef();
    const postcodeInputRef = useRef();

    const { sellers_id, sellerFirstName, sellerLastName } = useParams()

    const urlSellerProperty = `/sellerProp/${sellers_id}/${sellerFirstName}/${sellerLastName}`

    const navigate = useNavigate()

    const [propertyList, setpropertyList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/prop/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read propertys");
                    throw response.status;
                } else return response.json();
            })
            .then(properties => { setpropertyList(properties) })
            .catch(error => {
                console.error(error);
            });
    }, []);
    function removeR( ){
        const TempR = {
            "type": typeInputRef.current.value,
            "price": priceInputRef.current.value,
            "bedroom": bedInputRef.current.value,
            "bathroom": bathInputRef.current.value,
            "garden": gardenInputRef.current.value,
            "address": addressInputRef.current.value,
            "postcode": postcodeInputRef.current.value,
            "sellers": {
            "sellers_id": sellers_id
            },
            "status": "FOR SALE"

        }
    }

    function addR() {
        const tempR = {
            "type": typeInputRef.current.value,
            "price": priceInputRef.current.value,
            "bedroom": bedInputRef.current.value,
            "bathroom": bathInputRef.current.value,
            "garden": gardenInputRef.current.value,
            "address": addressInputRef.current.value,
            "postcode": postcodeInputRef.current.value,
            "sellers": {
                "sellers_id": sellers_id
                },
            "status": "FOR SALE"

        }

        const compareObjects = (obj1, obj2) => {
            return obj1.address.toLowerCase() === obj2.address.toLowerCase();
        };

        if (!propertyList.some(item => compareObjects(item, tempR))) {

            if (postcodeInputRef.current.value != "") {




                fetch("http://localhost:8080/prop/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(tempR)


                })
                    .then((response) => {
                        if (!response.ok) {
                            alert("An error has occured, unable to read propertys");
                            throw response.status;
                        } else navigate(urlSellerProperty);
                    })
                    .catch(error => {
                        console.error(error);
                    });


            }
            else {

                alert("Please enter all details")
            }
        } else {

            alert("Sorry, this user is already registered")
        }



    }

    function removeR(recno) {

        let tempR = propertyList.filter(recs => recs.property_id != recno)
        let choice = window.confirm("Are you sure you want to delete this record")
        if (choice) {
            setpropertyList(tempR)


            fetch('http://localhost:8080/prop/delete/${recno}', {
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
    function withdrawR(recno, status) {
        fetch(`http://localhost:8080/prop/update/${recno}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: status
            })
        })
            .then(response => response.json())
            .then(data => {
                // find the record with the updated status
                const updatedPropertyList = propertyList.find(rec => rec.property_id === recno);
                updatedPropertyList.status = status;
                setpropertyList([...propertyList]);
            })
            .catch(error => console.error('Error updating record', error));
    }

    function resubmitR(recno, status) {
        fetch(`http://localhost:8080/prop/update/${recno}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: status
            })
        })
            .then(response => response.json())
            .then(data => {
                // find the record with the updated status
                const updatedPropertiesList = propertyList.find(rec => rec.property_id === recno);
                updatedPropertiesList.status = status;
                setpropertyList([...propertyList]);
            })
            .catch(error => console.error('Error updating record', error));
    }

    function onK(event) {
        if (event.keyCode === 13) {

            addR()


        }


    }

    return (
        <>

            <form>

                <div className="form-group col">

                    <label htmlFor="propertyType">Type</label>
                    <select className="form-select" ref={typeInputRef}>
                        <option value="DETACHED"> Detached </option>
                        <option value="SEMI"> SEMI </option>
                        <option value="APARTMENT"> Apartment </option>


                    </select >
                </div>
                <div className="form-group col">
                    <label htmlFor="propertyPrice">Price</label>
                    Price:<input ref={priceInputRef} /><br />
                </div>
                Bed Rooms:
                <select className="form-select" ref={bedInputRef}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>

                </select>
                Bath Rooms:
                <select className="form-select" ref={bathInputRef}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>

                </select>
                Garden:
                <select className="form-select" ref={gardenInputRef}>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>

                Address: <input ref={addressInputRef} /><br />
                Post Code: <input ref={postcodeInputRef} /><br />
            </form> <Link className="btn btn-primary" onClick={() => addR()}> Submit </Link>
            <Link to={urlSellerProperty} className="btn btn-block"> Cancel </Link>

        </>)

}



