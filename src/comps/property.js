import { useState, useRef, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function Property() {

    const { property_id, propertyAddress, propertyPostcode } = useParams()

    const urlPropertyProperties = `/propertyProp/${property_id}/${propertyAddress}/${propertyPostcode}`


    const [propertyList, setpropertyList] = useState([])
    const navigate = useNavigate()
    const [propCriteria, setPropCriteria] = useState([])


    const inputGardenRef = useRef()
    const inputBedRef = useRef()
    const inputBathRef = useRef()
    const inputTypeRef = useRef()
    const inputMaxPriceRef = useRef()
    const inputStatusRef = useRef()


    useEffect(() => {

        fetch(`http://localhost:8080/prop/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read properties");
                    throw new Error(response.status);
                } else
                    return response.json();
            })
            .then(properties => {
                setpropertyList(properties)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const removeR = (recno) => {

        let tempR = propertyList.filter((recs) => recs.property_id !== recno);
        let choice = window.confirm("Are you sure you want to delete this record");
        if (choice) {
            setpropertyList(tempR);
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
    const showProperties = (property) => {
        const urlProperty = `/property/${property.property_id}/${property.address}/${property.postcode}`;
        navigate(urlProperty);
    };



    function showRec() {

        const tempR = {
            "garden": inputGardenRef.current.value,
            "bedroom": inputBedRef.current.value,
            "bath": inputBathRef.current.value,
            "type": inputTypeRef.current.value,
            "maxprice": inputMaxPriceRef.current.value,
            "status": inputStatusRef.current.value,


        }



        fetch(`http://localhost:8080/prop/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            .then(sellers => { setpropertyList(sellers) })
            .then(
                properties => {
                    setpropertyList(properties.filter(property => {
                        return (
                            (tempR.garden === 'Any' || property.garden == tempR.garden) &&
                            (tempR.bedroom === 'Any' || property.bedrooms == tempR.bedroom) &&
                            (tempR.bath === 'Any' || property.bathrooms == tempR.bath) &&
                            (tempR.type === 'Any' || property.type == tempR.type) &&
                            (tempR.maxprice === 'Any' || property.price == tempR.price) &&
                            (tempR.status === 'Any' || property.status == tempR.status) 

                        );
                    }));
                }) //linking IDs
            .catch(error => {
                console.error(error);
            });










    }

    // const [validated, setValidated] = useState(false)
    // const handleSubmit = (event) => {
    //     const form = event.currentTarget
    //     if (form.checkValidity() === false) {
    //         event.preventDefault()
    //         event.stopPropagation()
    //     }
    //     setValidated(true)
    // }



    return (
        <main>
            <h1>Our Properties</h1>
            <form>

                <div class="row topSeller" >


                    <div class="col-md-1">
                        <label for="inputGarden">Garden</label>
                        <select ref={inputGardenRef} class="form-control">
                            <option selected>Any</option>
                            <option>1</option>
                            <option>0</option>

                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="inputMinBed">Bedrooms</label>
                        <select ref={inputBedRef} class="form-control">
                            <option selected>Any</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>

                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="inputMinBath">Bathrooms</label>
                        <select ref={inputBathRef} class="form-control">
                            <option selected>Any</option>

                            <option>1</option>
                            <option>2</option>
                            <option>3</option>

                        </select>
                    </div>

                    <div class="col-md-2">
                        <label for="inputType">Type</label>
                        <select ref={inputTypeRef} class="form-control">
                            <option selected>Any</option>

                            <option>DETACHED</option>
                            <option>APARTMENT</option>
                            <option>SEMI</option>

                        </select>
                    </div>


                    <div class="col-md-2">
                        <label for="inputMaxPrice">Max Price</label>
                        <select ref={inputMaxPriceRef} class="form-control" >
                            <option selected>Any</option>

                            <option>100000</option>
                            <option>150000</option>
                            <option>200000</option>
                            <option>250000</option>
                            <option>300000</option>
                            <option>350000</option>

                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="inputStatus">Status</label>
                        <select ref={inputStatusRef} class="form-control">
                            <option selected>Any</option>

                            <option>SOLD</option>
                            <option>FOR SALE</option>
                            <option>WITHDRAWN</option>

                        </select>
                    </div>



                </div>






            </form>

            <br />
            <br />
            <div className="topSeller"><button className="btn btn-secondary" id="showButton" onClick={() => showRec()}>Search For properties</button>
            </div>



            <br />
            <br />
            <br />
            <table class="table1">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Address</th>
                        <th scope="col">Postcode</th>
                        <th scope="col">Type</th>
                        <th scope="col">Price</th>
                        <th scope="col">Bedrooms</th>
                        <th scope="col">Bathrooms</th>
                        <th scope="col">Garden</th>
                        <th scope="col">Status</th>
                        <th></th>
                        <th></th>


                    </tr>
                </thead>
                <tbody>
                    {

                        propertyList.map(rec =>
                            <tr key={rec.property_id}>
                                <td> {rec.property_id}  </td>
                                <td> {rec.address}  </td>
                                <td> {rec.postcode}  </td>
                                <td> {rec.type}  </td>
                                <td> {rec.price}  </td>
                                <td> {rec.bedrooms}  </td>
                                <td> {rec.bathrooms}  </td>
                                <td> {rec.garden}  </td>
                                <td> {rec.status} </td>

                                {
                                    rec.status == "FOR SALE" ?
                                        <td>FOR SALE <button className="btn btn-success" onClick={() => showProperties(rec)}>Book</button>
                                        </td>


                                        :
                                        <td> {rec.status}  </td>


                                }

                                {/* { <td> {rec.sellers_id}  </td> }
                        { <td> {rec.buyers_id}  </td> } */}

                                


                            </tr>
                        )
                    }
                </tbody>
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
    )

        ;

}