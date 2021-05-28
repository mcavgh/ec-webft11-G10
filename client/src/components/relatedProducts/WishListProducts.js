import React,{useEffect} from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import { useSelector } from "react-redux";
import { Typography } from '@material-ui/core/';


const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 5 },
];
export const WishListProducts = () => {
    useEffect(() => {
        
    }, [])
    const wishlist = useSelector(state => state.cart?.wishlist)
    return (
        <>
      <Typography component="p" variant="h4">
                Productos de su Wishlist
</Typography>
            <Carousel
                itemPadding={[50, 10]}
                enableMouseSwipe={true}
                itemsToScroll={2} breakPoints={breakPoints}
                
                >
                {
                    wishlist.map(p => {
                        return <Item product={p} />

                    })
                }

            </Carousel>
        </>
    )
}
