import React from 'react'
import AppBar from '../components/appBar/AppBar'
import Catalog from '../components/Product/catalog/Catalog';
import CategoryCatalog from '../components/category/CatalogCategory'
import Banner from '../components/banner/BannerImage';


export const Home = (props) => {
    return (
        <div>
            <AppBar />
            <Banner/>
            <div>
                <CategoryCatalog />
                <Catalog />
            </div>
        </div>
    )
}