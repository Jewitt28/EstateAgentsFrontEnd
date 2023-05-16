import { useState, useRef, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

// import { faTrash } from '@fortawesome/fontawesome-svg-core/import.macro'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function Seller() {

    const { sellers_id, sellerFirstName, sellerLastName } = useParams()

    const urlSellerProperty=`/sellerProp/${sellers_id}/${sellerFirstName}/${sellerLastName}`


    const [sellerList, setSellerList] = useState([])
    const [uniqueID, setUniqueID] = useState(0)
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`http://localhost:8080/seller/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw new Error(response.status);
                } else 
                    return response.json();
            })
            .then(sellers => {
                console.log(sellers);
                setSellerList(sellers)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const showProperties = (seller) => {
        const urlSellerProperty = `/sellerProp/${seller.sellers_id}/${seller.firstName}/${seller.lastName}`
        navigate(urlSellerProperty)
    }




    function removeR(recno) {

        let tempR = sellerList.filter(recs => recs.seller_id != recno)
        let choice = window.confirm("Are you sure you want to delete this record")
        if (choice) {
            setSellerList(tempR)


            fetch(`http://localhost:8080/seller/delete/${recno}` ,{
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


    return (
        <main>


            <div className="topSeller">
                <Link to="/form" id="showButton" className="btn btn-secondary "> Register as a seller </Link>

            </div>




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
                        <th scope="col">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        sellerList.map(rec => <tr key={rec.sellers_id}>
                            <td> {rec.sellers_id}  </td>
                            <td> {rec.firstName}  </td>
                            <td> {rec.lastName}  </td>
                            <td> {rec.email}  </td>
                            <td> {rec.address}  </td>
                            <td> {rec.postcode}  </td>
                            <td> {rec.phone}  </td>
                            {/* { <td><Link to={urlSellerProperty}>manage properties</Link></td> } */}
                            <td>                        <button className="btn-outline-dark" onClick={() => showProperties(rec)}>manage properties</button>
                            </td>
                            {/* <td><input type="button" onClick={() => removeR(rec.id)}/><FontAwesomeIcon icon={faTrash} id="trashCan"/></td> */}
                            <td>    <button className="my-button">
                                <FontAwesomeIcon icon={faTrash} onClick={() => removeR(rec.sellers_id)} />

                            </button></td>
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

}