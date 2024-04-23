import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom';


const Updateitem = () => {
    const { id } = useParams();
    // console.log(id);
    const token = sessionStorage.getItem("Token");
    const [name, setName] = useState('')
    const [icon, setIcon] = useState([])
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // console.log(id);
    useEffect(() => {
        axios.get(`https://staging-api.wellnessmahotsav.in/api/v1/admins/amenities/get-one/${id}`, {
            headers: {
                'accept': 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': `multipart/form-data`
            }
        })
            .then(function (res) {
                // console.log(res);
                setName(res.data.data.name)
                setIcon(res.data.data.icon)
            })
            .catch(function (err) {
                console.log(err);
            })
    }, [])

    // const onSubmit = (d) => {
    //     console.log(d);
    //         axios.patch(`https://api.wellnessmahotsav.in/api/v1/admins/amenities/update/${id}`, {
    //             headers: {
    //                 'accept': 'application/json',
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': `multipart/form-data`
    //             },
    //             name: name,
    //             icon: icon,
    //             status: status
    //         })
    //             .then(function (response) {
    //                 // handle success
    //                 console.log(response);
    //             })
    //             .catch(function (error) {
    //                 // handle error
    //                 console.log(error);
    //             })
    // }
    const onSubmit = (d) => {
        console.log(d);
        let headers = {
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': `multipart/form-data`
        }

        let formData = new FormData();
        formData.append('name', d.name)
        formData.append('icon', icon)
        formData.append('status', true)

        axios(`https://staging-api.wellnessmahotsav.in/api/v1/admins/amenities/update/${id}`, {
            method: 'PATCH',
            data: formData,
            headers: headers
        })
            .then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    navigate('/Dashboadr')
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    // const updateImage = (e) => {
    //     e.preventDefault();
    //     if (id) {
    //         axios.post(`https://api.wellnessmahotsav.in/api/v1/admins/amenities/update/${id}`, {
    //             headers: {
    //                 'accept': 'application/json',
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': `multipart/form-data`
    //             },
    //             icon: e.target.files
    //         })
    //             .then(function (response) {
    //                 console.log(response);
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             })
    //     }
    // }
    return (
        <>
            <div className='container mt-5'>
                <h3>Update Item:</h3>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className='enter-aliment my-2'>
                        <label htmlFor="">Aliment Name:</label><br />
                        <input type="text" id='name' className='add-title mt-2' autoComplete='off'
                            defaultValue={name}
                            {...register("name", {
                                required: "*Name is required",
                            })}
                            placeholder='Enter Aliment Name' />
                        {errors.name?.message && (
                            <small className='alerts'>{errors.name.message}</small>
                        )}
                    </div>
                    <div className='enter-title mt-4'>
                        <label htmlFor="">Image:</label><br />
                        <input type="file" className='add-img mt-1' id='image'
                            // {...register("image", {
                            //     required: "*image is required",
                            // })}
                            defaultChecked={icon}
                            placeholder='Enter Title'
                            onChange={(e) => { setIcon(e.target.files[0]) }}
                        />
                        {/* {errors.image?.message && (
                            <small className='alerts'>{errors.image.message}</small>
                        )} */}
                    </div>
                    <button type="submit" className="btn btn-primary mt-2 fw-medium"><FaCheck className='submit-icon' />Submit</button>
                </form>
            </div>
        </>
    )
}

export default Updateitem