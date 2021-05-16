import React, { useState, useEffect } from "react";
import InputBase from '@material-ui/core/InputBase';
import { useStyles } from '../styles'
import { useDispatch } from 'react-redux'
import { searchProducts, getProducts } from '../../../store/product/product.actions';

export const SearchBar = () => {    
    
    const classes = useStyles();
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")

    const handleChange = (event) => {
        event.preventDefault();
        setTitle(event.target.value);
        if(title){
            dispatch(searchProducts(title))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchProducts(title))
    }

    useEffect(() => {dispatch(getProducts())},[dispatch]);

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput, }} inputProps={{ 'aria-label': 'search' }} type="text" id="title" value={title} onChange={(e) => handleChange(e)}
                />
            </form>
        </>
    );

}
