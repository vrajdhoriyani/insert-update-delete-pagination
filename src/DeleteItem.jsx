import axios from 'axios';
import React from 'react'
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RxCross2 } from 'react-icons/rx';
import { ImCheckmark2 } from 'react-icons/im';

function DeleteItem() {
    const { id } = useParams();
    const token = sessionStorage.getItem("Token");
    const navigate = useNavigate();
    const [modalShow, setModalShow] = React.useState(true);

    const handleDelete = () => {
        console.log(id);
        if (id) {
            axios.delete(`https://staging-api.wellnessmahotsav.in/api/v1/admins/amenities/delete/${id}`, {
                headers: {
                    'accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': `multipart/form-data`
                }
            })
                .then(function (response) {
                    console.log(response);
                    if(response.status === 200){
                        navigate('/Dashboadr')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Confirmation Alert!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Are You sure to remove this amenities?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onChange={props.onHide}><RxCross2 className='margin-left' />No</Button>
                    <Button onChange={props.onHide} onClick={() => handleDelete()}><ImCheckmark2 className='margin-left' />Yes</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const Cancelbtn = () => {
        navigate("/Dashboadr")
    }

    return (
        <>
            {/* <section className='h-100 container '>
                <h3>Delete Page: </h3>
                <div className='text-center delete-section h-100 '>
                    <MdDeleteForever className='delete-page-icon' />
                    <br />
                    <p className='delete-para'>You are about to delete a item</p>
                    <p className='delete-para'>This will delete your item from catalog Are you sure?</p>
                    <div>
                        <button className='cancel-button' onClick={Cancelbtn}>Cancel</button>
                        <button className='delete-button' onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </section> */}

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default DeleteItem