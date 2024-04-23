import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTk0OWYwMTVjZTRkNWYzZTI5OGY1MiIsImlhdCI6MTcxMzc2ODI3MSwiZXhwIjoxNzIxNTQ0MjcxfQ.wUuVaW5dRx89658PbX39bKQROXRMY5-wnrI0TV8p8-4';
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (d) => {
        // console.log(d);
    }

    const userName = sessionStorage.getItem("Username");

    const navigateSignUp = () => {
        navigate('/Signup')
    }

    const logout = () => {
        sessionStorage.clear();
    }

    // console.log(email);
    // console.log(password);
    const postData = () => {
        axios.post(`https://staging-api.wellnessmahotsav.in/api/v1/admins/login`, {
            Headers: token,
            username: email,
            password: password
        })
            .then(function (response) {
                console.log(response);
                // console.log(response.data.token);
                // console.log(response.status);
                if (response.status === 200) {
                    sessionStorage.setItem("isLogged", true)
                    sessionStorage.setItem("Token", response.data.token)
                    navigate('/Dashboadr')
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    return (
        <>
            <section>
                <div className="cream-color d-flex justify-content-center align-items-center">
                    <div className="extra-img">
                        <img src={require('../src/images/Saly-3.png')} height={'250px'} width={'250px'} alt="" />
                    </div>
                    <div>
                        <div className='row sign-in-Form '>
                            <div className='logout-btn d-flex justify-content-end'>
                                <button onClick={() => { logout() }}>Logout</button>
                            </div>
                            <div className='col-xxl-12 d-flex justify-content-between'>
                                <div className='welcome-text col-xxl-6'>
                                    <p>Welcome To {userName}</p>
                                    <h3>Sign in</h3>
                                </div>
                                <div className='welcome-text-2 text-end col-xxl-6'>
                                    <p>No Acoount?</p>
                                    <p onClick={() => { navigateSignUp() }}>Sign up</p>
                                </div>
                            </div>
                            <form className='enter-value' autoComplete='on' onSubmit={handleSubmit(onSubmit)}>
                                <label htmlFor="input-email">Enter Your Username or email address</label>
                                <br />
                                <input type="text" className="input-email" id="email" {...register('email')}
                                    {...register("email", {
                                        required: "**Email is required",
                                        validate: {
                                            maxLength: (v) =>
                                                v.length <= 50 || "The email should have at most 50 characters",
                                            matchPattern: (v) =>
                                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                                "Email address must be a valid address",
                                        },
                                    })}
                                    placeholder='Username or email address' onChange={(e) => { setEmail(e.target.value) }} />

                                {errors.email?.message && (
                                    <small className='alerts'>{errors.email.message}</small>
                                )}
                                <br />
                                <label htmlFor="input-pass">Enter Your Password</label>
                                <br />
                                <input type="password" name="" className="input-pass" id="password"
                                    {...register("password", { required: "**Password is required", minLength: { value: 4, message: "**Password must be more than 4 characters" }, maxLength: { value: 12, message: "**Password cannot exceed more than 12 characters" } })}
                                    placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
                                <p className='alerts'>{errors.password?.message}</p>
                                <p className='text-end'>Forgot Password?</p>
                                <button type="submit" onClick={() => { postData() }}>Submit</button>
                            </form>
                            <p className='text-center'>OR</p>
                            <div className='d-flex justify-content-between my-3'>
                                <div>
                                    <img src={require('../src/images/google.png')} alt="" /><span className='sign-google'>Sign in with Google</span>
                                </div>
                                <div className='d-flex social-group'>
                                    <img src={require('../src/images/f.png')} alt="" />
                                    <img src={require('../src/images/apple.png')} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="extra-img">
                        <img src={require('../src/images/Saly-2.png')} height={'250px'} width={'250px'} alt="" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signin;