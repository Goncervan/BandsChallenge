import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBands, getAlbums, filterByGenre, filterByOrigin } from "../actions";
import { useNavigate } from 'react-router-dom';
import style from './Styles/Home.module.css'
export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allBands = useSelector((state) => state.allBands)
    const bands = useSelector((state) => state.bands)
    const albums = useSelector((state) => state.albums)
    // const user = useSelector((state) => state.users)
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState([]);
    const [detail, setDetail] = useState([]);
    const [bandAlbum, setBandAlbum] = useState([]);
    let user = sessionStorage.getItem("Usuario")


    useEffect(() => {
        dispatch(getBands())
        dispatch(getAlbums());
    }, [])
    const handleModal = (e, id) => {
        e.preventDefault();
        setOpen(true);
        setCurrent(id);
        let banda = bands.filter(el => el.id === id);
        setDetail(banda)
    }
    const handleClose = (e) => {
        e.preventDefault();
        setOpen(false)
        setBandAlbum([])
    }

    const handleAlbum = (e) => {
        e.preventDefault();
        setBandAlbum(albums.filter((el) => el.bandId === current))
    }

    const handleGenre = (e) => {
        e.preventDefault();
        dispatch(filterByGenre(e.target.value));
    }
    const handleOrigin = (e) => {
        e.preventDefault();
        dispatch(filterByOrigin(e.target.value));
    }
    const handleClear = (e) => {
        e.preventDefault();
        dispatch(getBands());
    }
    const handleLogout = (e) => {
        e.preventDefault();
        navigate('/');
    }
    return (
        <div className={style.container}>
            <div className={style.bar}>
                <div className={style.cont}>
                    <span className={style.span}>Genre :</span>
                    <select className={style.select} onChange={e => handleGenre(e)} >
                        <option value="all">All</option>
                        <option value="rock">Rock</option>
                        <option value="rock-roll">Rock &#38; Roll</option>
                        <option value="hard-rock">Hard Rock</option>
                        <option value="grunge">Grunge</option>
                        <option value="heavy-metal">heavy Metal</option>
                        <option value="power-metal">Power Metal</option>
                        <option value="black-metal">Black Metal</option>
                        <option value="progressive-metal">Progressive Metal</option>
                    </select>
                </div>
                <div className={style.cont}>
                    <button className={style.btnFilter} onClick={e => handleClear(e)} >
                        Clear filters
                    </button>
                </div>
                <div className={style.cont}>
                    <span className={style.span}>Origin :</span>
                    <select className={style.select} onChange={e => handleOrigin(e)}>
                        <option value="all">All</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Italy">Italy</option>
                    </select>
                </div>
            </div>
            <div className={style.userInfo}>
                <span className={style.personalInfo}>
                    Loged as {user}
                </span>
                <button className={style.btnLogout} onClick={e => { handleLogout(e) }}>
                    Logout
                </button>
            </div>
            <ul className={style.cards}>
                {allBands ? allBands.map(el => {
                    return (
                        <li className={style.card}>
                            <p className={style.name}>
                                {el.name}
                            </p>
                            <p>
                                {el.genreCode}
                            </p>
                            <button
                                onClick={e => { handleModal(e, el.id) }}
                                className={style.more}>
                                See more
                            </button>
                        </li>
                    )
                })
                    : <></>
                }
            </ul>
            {
                open ? (
                    <div className={style.modal}>
                        <div className={style.modalContainer}>
                            <h3 className={style.bandName}>{detail[0]?.name}</h3>
                            <ul className={style.bandDetail}>
                                <li className={style.bandInfo}> <p className={style.genre}>Genre : </p><p className={style.bandGenre}> {detail[0]?.genreCode}</p></li>
                                <li className={style.bandInfo}>Country of origin : {detail[0]?.country}</li>
                                <li className={style.bandInfo}>Year : {detail[0]?.year}</li>
                                <ul className={style.bandMembers}>
                                    <p className={style.membersTitle}>Members :</p>
                                    {detail[0]?.members.map(el => (
                                        <li className={style.members}>{el.name}</li>
                                    ))}
                                </ul>
                                <button className={style.btnAlbums} onClick={e => { handleAlbum(e) }}>
                                    See albums
                                </button>
                                <ul className={style.listAlbums}>
                                    {bandAlbum.length > 0 ? (
                                        <h4 className={style.albumsTitle}>Albums : </h4>
                                    ) : (
                                        // <h4 className={style.albumsTitle}>No albums found</h4>
                                        <></>
                                    )}
                                    {bandAlbum && bandAlbum.map((el) => {
                                        return (
                                            <li className={style.albumsName}>
                                                <p>{el.name} {el.year}</p>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </ul>
                            <button className={style.btnClose} onClick={e => { handleClose(e) }}>
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
            {/* <button onClick={e => {handleProbar(e)}}>
                probar
            </button> */}
        </div>
    )
}