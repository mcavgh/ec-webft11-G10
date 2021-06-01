import React from 'react'
import AppBar from '../components/appBar/AppBar'
import Banner from '../components/banner/BannerImage';
import Footer from '../components/footer/Footer';
import Catalog from './catalog/Catalog';
// import Catalog from '../components/Product/catalog/Catalog';

export const Home = (props) => {
    return (
        <div>
            <AppBar />
            <Banner />
            <ThemeProvider theme={pepe}>
                <Paper>
                    <Catalog />
                </Paper>
            </ThemeProvider>
            <Footer />
        </div>
    )
}