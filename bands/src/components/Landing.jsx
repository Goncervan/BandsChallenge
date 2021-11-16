import React, { useState } from "react";
import style from "./Styles/Landing.module.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUsers } from "../actions";
import { useNavigate } from 'react-router-dom';





export default function Landing() {
    const allUsers = useSelector(state => state.users)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
        password2: "",
        login: false
    });
    const [errors, setError] = useState({ a: "" });

    const [open, setOpen] = useState(false);


    useEffect(() => {
        dispatch(getUsers());
    }, [])

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        setError(
            validate({
                ...user,
                [e.target.name]: e.target.value,
            })
        );
    }
    function handleOpen(e) {
        e.preventDefault()
        setOpen(true)
    }
    function handleClose(e) {
        e.preventDefault()
        setOpen(false)
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(createUser(user))
        setUser({
            email: "",
            password: "",
            password2: "",
        });
        setOpen(false)
        alert("User created succesfully")
        console.log(allUsers)
        console.log(userLogin)
    }
    function validate(user) {
        const errors = {};
        if (!user.email) {
            errors.email = "Required";
        }
        if (
            !/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
                user.email
            )
        ) {
            errors.email = "Not valid Email";
        }
        if (!user.password) {
            errors.password = "Required";
        } else if (`${user.password}`.length < 7) {
            errors.password = "The password must be at least 7 characters";
        }
        if (!user.password2) {
            errors.password2 = "Required";
        } else if (user.password !== user.password2) {
            errors.password2 = "Passwords do not match"
        }
        return errors;
    }

    const [userLogin, setUserLogin] = useState({
        email2: "",
        password: "",
    });
    const [errors2, setError2] = useState({ a: "" });
    function handleChangeLogin(e) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
        setError2(
            validateUser(userLogin)
        );
    }

    function handleSubmit2(e) {
        e.preventDefault()
        setUserLogin({
            email2: "",
            password: "",
        });
        userLogin && userLogin.email === allUsers?.email ? (
            navigate('/home')
        ) : (
            console.log("Mal", userLogin, allUsers)
        )
        sessionStorage.setItem("Usuario", userLogin.email)
    }


    function validateUser(userLogin) {
        const errors = {};
        console.log(allUsers)
        console.log(userLogin)
        userLogin && userLogin.mail === allUsers?.email ? (
            console.log("BIen")
        ) : (
            console.log("Mal")
        )
        // else if (userLogin && userLogin.email !== allUsers.email) {
        //     errors.mail = "The email does not match";
        // }
        // if (userLogin.password !== allUsers.password) {
        //     errors.mail = "The password does not match";
        // }
        // return errors;
    }






    return (
        <div className={style.container}>
            <div className={style.formContainer}>
                <h1 className={style.title}>Bands API</h1>
                <h4 className={style.subtitle}> Welcome to the Bands api Challenge Made by Gonzalo Cervan</h4>
                <h4 className={style.subtitle2}> You need to login before you can enter the api!</h4>
                <div className={style.containerLogin}>
                    <h3 className={style.titleLogin}>Login</h3>
                    <form className={style.formLogin} onSubmit={(e) => handleSubmit2(e)}>
                        <div className={style.containerInputs}>
                            <label className={style.label} >Email:</label>
                            <input
                                className={style.input}
                                type="email"
                                name="email"
                                onChange={(e) => handleChangeLogin(e)}
                            />
                            {errors2?.email &&
                                <p>Invalid Email</p>
                            }
                        </div>
                        <div className={style.containerInputs}>
                            <label className={style.label}>Password:</label>
                            <input
                                className={style.input}
                                type="password"
                                name="password"
                                onChange={(e) => handleChangeLogin(e)}
                            />
                            {errors2?.password &&
                                <p>Invalid password</p>
                            }
                        </div>
                        <button className={style.btnLogin} type="submit">Login</button>
                    </form>
                </div>
                <div>
                    <button className={style.btnOpen} onClick={(e) => handleOpen(e)}>
                        Create user
                    </button>
                </div>
                {open ? (
                    <div className={style.modalContainer}>
                        <div className={style.modal}>
                            <h3 className={style.modalTitle}>Create user</h3>
                            <form className={style.formModal} onSubmit={(e) => handleSubmit(e)}>
                                <div className={style.containerInfo}>
                                    <label className={style.labelModal}>Email</label>
                                    <div className={style.cotainerInputsModal}>
                                        <input
                                            className={style.input}
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={(e) => handleChange(e)}
                                        />
                                        {errors.email &&
                                            <p className={style.error}> {errors.email} </p>
                                        }
                                    </div>
                                </div>
                                <div className={style.containerInfo}>
                                    <label className={style.labelModal}>Password</label>
                                    <div className={style.cotainerInputsModal}>
                                        <input
                                            className={style.input}
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            onChange={(e) => handleChange(e)}
                                        />
                                        {errors.password &&
                                            <p className={style.error}> {errors.password} </p>
                                        }
                                    </div>
                                </div>
                                <div className={style.containerInfo}>
                                    <label className={style.labelModal}>Repeat Password</label>
                                    <div className={style.cotainerInputsModal}>
                                        <input
                                            className={style.input}
                                            type="password"
                                            name="password2"
                                            value={user.password2}
                                            onChange={(e) => handleChange(e)}
                                        />
                                        {errors.password2 &&
                                            <p className={style.error}> {errors.password2} </p>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <button className={style.btnModal} type="submit">Create</button>
                                    <button className={style.btnModal2} onClick={(e) => handleClose(e)}>Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}