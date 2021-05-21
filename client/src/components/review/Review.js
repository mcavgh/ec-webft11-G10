import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useStyles } from "./styles";
// import { getProductReviews } from "../../store/review/review.actions";
import ReviewForm from "../reviewForm/ReviewForm";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const Review = ({ productId, loggedUser, productReviews }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getProductReviews(productId));
  }, [dispatch]);
  // const productReviews = useSelector(
  //   (state) => state.reviewReducer.productReviews
  // );

  return (
    <div style={{ padding: 15 }} className={classes.reviews}>
      <ReviewForm productId={productId} loggedUserId={loggedUser.id} />
      <h1>Opiniones</h1>
      <Paper style={{ padding: "40px 20px" }}>
        {productReviews.reviews
          ? productReviews.reviews.map((review, index) => {
              return (
                <>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar alt="Remy Sharp" src={imgLink} />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h3 style={{ margin: 0, textAlign: "left" }}>
                        {`${review.user.name} ${review.user.surname}`}
                      </h3>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="space-between"
                      >
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                        />
                      </Grid>
                      <p style={{ textAlign: "left" }}>{review.reviewText}</p>
                      {/* <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                      </p> */}
                    </Grid>
                  </Grid>
                  {index === productReviews.reviews.length - 1 ? null : (
                    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                  )}
                </>
              );
            })
          : null}
      </Paper>
    </div>
  );
};

export default Review;
