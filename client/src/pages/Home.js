import React from 'react'
import AppBar from '../components/appBar/AppBar'
import Catalog from '../components/Product/catalog/Catalog';
import CategoryCatalog from '../components/category/CatalogCategory'

export const Home = () => {
    return (
        <div>
            <AppBar />
            <div>
                <CategoryCatalog /> 
                <Catalog />
            </div>
        </div>
    )
}