import React from 'react'
import { uselocalStore } from '../store/store';
import DahsNavbar from './dashNavbar';
import Navbar from './navbar';

const ConditionalNavbar = () => {
    const { loginStatus} = uselocalStore();
    if(loginStatus)return <DahsNavbar/>
    return <Navbar/>
}

export default ConditionalNavbar
