import React, { useState, useEffect } from "react";
import { Divider, Avatar, Grid, Paper, Button } from "@material-ui/core";
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
  const [reviewList, setReviewList] = useState([]);
  const [form, setForm] = useState(false);
  const [reviewsPerPage, setReviewsPerPage] = useState(1);
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
    if (productReviews.reviews !== undefined) {
      setReviewList(productReviews.reviews.slice(0, reviewsPerPage));
    }
  }, [productReviews.reviews, loggedUser, reviewsPerPage]);

  const updateReviewList = () => {
    setReviewList(productReviews.reviews.slice(0, reviewsPerPage));
  };

  const cancelForm = () => {
    setForm(false);
  };

  return (
    <div style={{ padding: 15 }} className={classes.reviews}>
      {form && currentUser ? (
        <ReviewForm
          productId={productId}
          loggedUserId={loggedUser.id}
          updateReviewList={updateReviewList}
          dispatchUpdater={dispatchUpdater}
          cancelForm={cancelForm}
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
      {productReviews.reviews &&
      reviewsPerPage >= productReviews.reviews.length ? null : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setReviewsPerPage(reviewsPerPage + 1)}
          style={{ marginTop: "20px", width: "100%" }}
        >
          Ver mas
        </Button>
      )}
    </div>
  );
};

export default Review;
