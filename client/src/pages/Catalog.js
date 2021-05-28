import React from 'react'
import AppBar from '../components/appBar/AppBar'
import Banner from '../components/banner/BannerImage';
import Footer from '../components/footer/Footer';
import Catalogo from '../components/Product/catalog/Catalog';

export const Catalog = (props) => {
    return (
        <div>
            <AppBar />
            <Banner />
            <Catalogo />
            <Footer />
        </div>
    )
}