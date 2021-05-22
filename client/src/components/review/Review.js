import React, { useState, useEffect } from "react";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useStyles } from "./styles";
import ReviewForm from "../reviewForm/ReviewForm";

const Review = ({
  productId,
  loggedUser,
  productReviews,
  dispatchUpdater,
  currentUser,
}) => {
  const [reviewList, setReviewList] = useState(productReviews.reviews);
  const [form, setForm] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    if (productReviews.reviews !== undefined) {
      productReviews.reviews.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      const found = productReviews.reviews.find(
        (element) => element.user.id === loggedUser.id
      );
      found ? setForm(false) : setForm(true);
    }
    setReviewList(productReviews.reviews);
  }, [productReviews.reviews, loggedUser]);

  const updateReviewList = () => {
    setReviewList(productReviews.reviews);
  };

  return (
    <div style={{ padding: 15 }} className={classes.reviews}>
      {form && currentUser ? (
        <ReviewForm
          productId={productId}
          loggedUserId={loggedUser.id}
          updateReviewList={updateReviewList}
          dispatchUpdater={dispatchUpdater}
        />
      ) : null}
      <h1>Opiniones</h1>
      <Paper style={{ padding: "40px 20px" }}>
        {reviewList
          ? reviewList.map((review, index) => {
              return (
                <>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar alt="Remy Sharp" src={review.user.photoURL} />
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
                  {index === reviewList.length - 1 ? null : (
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
