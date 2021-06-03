import "./catalog.css";
import React, { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getCategory, searchProducts } from '../../store/category/category.actions';
import { Button ,Typography} from '@material-ui/core/';

const FilterGeneres = () => {
    const [active, setActive] = useState("")

    const dispatch = useDispatch()
    let categories = useSelector(state => state.categoryReducer.category)

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch])

    const handleGenere = (e,category) => {
        setActive( category.name )
        dispatch(searchProducts(category.name))
     };

    return (
        <div>
            {categories&&categories[0]&&categories.map((category, index) => {
                if (category.name !== "") {
                    return (
                        <Typography variant="h6" key={index} name={category.name}
                            onClick={(e) => { handleGenere(e,category) }}
                            className={active === category.name ? "button-filter-active":"button-filter"}
                        >
                            {category.name}
                        </Typography>
                    )
                }
                return "";
            })}

        </div>
    );
};


export default FilterGeneres;
