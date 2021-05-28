import React from 'react'
import AppBar from '../components/appBar/AppBar'
import Banner from '../components/banner/BannerImage';
import Footer from '../components/footer/Footer';
import { WishListProducts } from '../components/relatedProducts/WishListProducts';

export const Catalog = (props) => {
    return (
        <div>
            <AppBar />
            <Banner />
            <WishListProducts/>
            <Footer />
        </div>
    )
}