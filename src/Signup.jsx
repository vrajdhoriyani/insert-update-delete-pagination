import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('')

  const navigateSignIn = () => {
    navigate('/')
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (d) => {
    console.log(d);
    sessionStorage.setName("Username", name)
    navigate('/')
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
              <div className='col-xxl-12 d-flex justify-content-between'>
                <div className='welcome-text col-xxl-6'>
                  <p>Welcome To Lorem</p>
                  <h3>Sign up</h3>
                </div>
                <div className='welcome-text-2 text-end col-xxl-6'>
                  <p>Have an Account?</p>
                  <p onClick={() => { navigateSignIn() }}>Sign In</p>
                </div>
              </div>
              <form action="" autoComplete='on' onSubmit={handleSubmit(onSubmit)}>
                <div className='enter-value'>
                  <label htmlFor="input-email">Enter Your Username or email address</label>
                  <br />
                  <input type="email" name=""
                    className="input-email" id="email" {...register("email", {
                      required: "Email is required",
                      validate: {
                        maxLength: (v) => v.length <= 50 || "The email should have at most 50 characters",
                        matchPattern: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Email address must be a valid address",
                      },
                    })} placeholder='Username or email address' />
                  {errors.email?.message && (
                    <small className='alerts'>{errors.email.message}</small>
                  )}
                  <br />
                  <div className='d-flex user-contact '>
                    <div className='enter-value'>
                      <label htmlFor="">User Name</label>
                      <input type="text" name="" className="input-pass" id="username" onChange={(e) => { setName(e.target.value) }} {...register("username", {
                        required: true,
                        validate: {
                          minLength: (v) => v.length >= 4,
                          matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v),
                        },
                      })} placeholder='User Name' />
                      {errors.username?.type === "required" && (
                        <small className='alerts'>**Username is required</small>
                      )}

                      {errors.username?.type === "minLength" && (
                        <small className='alerts'>**The username should have at least 5 characters</small>
                      )}

                      {errors.username?.type === "matchPattern" && (
                        <small className='alerts'>**Username must contain only letters, numbers and _</small>
                      )}
                    </div>
                    <br />
                    <div className='enter-value'>
                      <label htmlFor="">Contact Number</label>
                      <input type="text" name="" className="input-pass" id="contactno" {...register('contactno', {
                        required: true,
                        validate: {
                          maxLength: (v) => v.length >= 10,
                          matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v),
                        },
                      })} placeholder='Contact Number' />
                      {errors.contactno?.type === "required" && (
                        <small className='alerts'>**Contactno is required</small>
                      )}
                      {errors.contactno?.type === "maxLength" && (
                        <small className='alerts'>**The mobilenumber should have at most 10 digits</small>
                      )}
                    </div>
                  </div>
                  <label htmlFor="input-pass">Enter Your Password</label>
                  <br />
                  <input type="password" name="" className="input-pass" id="password" {...register('password', {
                    required: true,
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long!"
                    },
                  })} placeholder='Password' />
                  {errors.password?.type === "required" && (
                    <small className='alerts'>**Password is required</small>
                  )}
                  {errors.password?.type === "minLength" && (
                    <small className='alerts'>**The password should have at most 8 digits</small>
                  )}
                  <p className='text-end'>Forgot Password?</p>
                  <button type='submit'>Sign up</button>
                </div>
              </form>
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

export default Signup;