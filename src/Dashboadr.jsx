import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react'
import { FaPencil } from 'react-icons/fa6';
import { MdDeleteForever } from 'react-icons/md';
import Moment from 'react-moment';
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { ImCheckmark2 } from 'react-icons/im';


const Dashboadr = () => {
    const { id } = useParams();
    const fetchdata = (currentpage) => {
        axios.get(`https://staging-api.wellnessmahotsav.in/api/v1/admins/amenities?page=${currentpage}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (res) {
                // console.log(res.data.data); 
                setData(res.data.data)
            })
    }

    const handlePageClick = (data) => {
        // console.log(data.selected);

        let currentpage = data.selected + 1;
        // console.log(currentpage);
        const imagefromserver = fetchdata(currentpage)

        setData(imagefromserver)
    }

    const [data, setData] = useState([])
    const [deleteid, setdeleteId] = useState('')
    const [totalRecord, setTotalRecord] = useState('')
    const [pageCount, setPageCount] = useState(10)
    const [del, setDel] = useState('')
    const [modalShow, setModalShow] = useState(false);
    let limit = 2;

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTk0OWYwMTVjZTRkNWYzZTI5OGY1MiIsImlhdCI6MTcxMzc2ODI3MSwiZXhwIjoxNzIxNTQ0MjcxfQ.wUuVaW5dRx89658PbX39bKQROXRMY5-wnrI0TV8p8-4';
    // console.log(token);
    useEffect(() => {
        // Does not access without login
        // const search = () => {
        // const Logged = sessionStorage.getItem("isLogged");
        // if (!Logged) {
        //     navigate('/')
        // }
        axios.get(`https://staging-api.wellnessmahotsav.in/api/v1/admins/amenities?page=1&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                // console.log(response);
                // console.log(response.data.data[0]._id);
                setData(response.data.data);
                setTotalRecord(response.data.total_record)
                // setId(response.data.data._id)
                // setPageCount(Math.ceil(`${totalRecord}/${limit}`))
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [modalShow,del])

    // const handleDelete = () => {
    //     console.log(deleteid);
    //     if (deleteid) {
    //         axios.delete(`https://staging-api.wellnessmahotsav.in/api/v1/admins/amenities/delete/${deleteid}`, {
    //             headers: {
    //                 'accept': 'application/json',
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': `multipart/form-data`
    //             }
    //         })
    //             .then(function (response) {
    //                 console.log(response);
    //                 setDel(response)
    //                 setModalShow(false)
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //     }
    // }

    // function MyVerticallyCenteredModal(props) {
    //     return (
    //         <Modal
    //             {...props}
    //             size="lg"
    //             aria-labelledby="contained-modal-title-vcenter"
    //             centered
    //         >
    //             <Modal.Header closeButton>
    //                 <Modal.Title id="contained-modal-title-vcenter">
    //                     Confirmation Alert!
    //                 </Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 <p>
    //                     Are You sure to remove this amenities?
    //                 </p>
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <Button onChange={props.onHide}><RxCross2 className='margin-left' />No</Button>
    //                 <Button onChange={props.onHide} onClick={() => handleDelete()}><ImCheckmark2 className='margin-left' />Yes</Button>
    //             </Modal.Footer>
    //         </Modal>
    //     );
    // }


    return (
        <>
            <div className='d-flex justify-content-center'>
                <h1>Dashboard</h1>
            </div>
            <br />
            <div className="container">
                <div className="d-flex justify-content-between">
                    <h4>Information Table: </h4>
                    <Link to="/AddNewItem">
                        <button className='add-new-item'>+ Add New</button>
                    </Link>
                </div>
                <br />
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>name</th>
                            <th>Id</th>
                            <th>createdAt</th>
                            <th>updatedAt</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        {
                            data && data.map((item) => {
                                const path = `https://staging-api.wellnessmahotsav.in/${item.icon}`;
                                return (
                                    <>
                                        <tr>
                                            <td><img src={path} alt="" height={"50px"} width={"50px"} /></td>
                                            <td>{item.name}</td>
                                            <td>{item._id}</td>
                                            <td><Moment format="YYYY/MM/DD, h:mm:ss a">{item.createdAt}</Moment></td>
                                            <td><Moment format="YYYY/MM/DD, h:mm:ss a">{item.updatedAt}</Moment></td>
                                            <td><Link to={`/Updateitem/${item._id}`}><FaPencil className='update-icon' /></Link></td>
                                            {/* <td><MdDeleteForever className='delete-icon' onClick={() => {
                                                setModalShow(true);
                                                setdeleteId(item._id)
                                            }} /></td> */}
                                            <td><Link to={`/DeleteItem/${item._id}`}><MdDeleteForever className='delete-icon' /></Link></td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </thead>
                    {/* <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    /> */}
                </table>
                <ReactPaginate
                    previousLabel="<"
                    nextLabel=">"
                    breakLabel="..."
                    pageCount={pageCount}
                    pageRangeDisplayed={10}
                    onPageChange={handlePageClick}
                    containerClassName='pagination d-flex justify-content-center'
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    breakClassName='page-item'
                    breakLinkClassName='page-item'
                    activeClassName='active'
                />
            </div>
        </>
    )
}
export default Dashboadr;