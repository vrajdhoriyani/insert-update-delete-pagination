import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddNewItem = () => {
    const [icon, setIcon] = useState([])
    const navigate = useNavigate();
    const token = sessionStorage.getItem("Token");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // console.log(icon);
    const onSubmit = (d) => {
        console.log(d);
        // console.log(`${token}`)
        // console.log(d.name);
        let headers = {
            'accept': 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': `multipart/form-data`
        }

        let formData = new FormData();
        formData.append('name', d.name)
        formData.append('icon', icon)
        formData.append('status', true)

        axios(`https://staging-api.wellnessmahotsav.in/api/v1/admins/amenities/store`, {
            method: 'POST',
            data: formData,
            headers: headers,
        })
            .then(function (res) {
                console.log(res);
                if(res.status === 200){
                    navigate('/Dashboadr')
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    }
    return (
        <>
            <div className='container mt-5'>
                <h3>Add Item:</h3>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className='enter-aliment my-2'>
                        <label htmlFor="">Aliment Name:</label><br />
                        <input type="text" id='name' className='add-title mt-2' autoComplete='off'
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
                            {...register("image", {
                                required: "*image is required",
                            })}
                            placeholder='Enter Title'
                            onChange={(e) => { setIcon(e.target.files[0]) }} />
                        {errors.image?.message && (
                            <small className='alerts'>{errors.image.message}</small>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary mt-2 fw-medium"><FaCheck className='submit-icon' />Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddNewItem;