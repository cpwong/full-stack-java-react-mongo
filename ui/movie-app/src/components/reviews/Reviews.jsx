import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import ReviewForm from '../reviewForm/ReviewForm';

function Reviews({ getMovieData, movie, reviews, setReviews }) {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;
  console.log("Props:", reviews);

  const addReview = async (e) => {
    e.preventDefault();
    const rev = revText.current;
    try {
      const res = await api.post('/api/v1/reviews', {
        reviewBody: rev.value,
        imdbId: movieId,
      });
      const updatedReviews = [...reviews, { body: rev.value }];
      rev.value = '';
      setReviews(updatedReviews);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col>
          <img src={movie?.poster} alt='' />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    labelText='Write a Review?'
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((r) => {
            return (
              <>
                <Row>
                  <Col>{r.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
}

export default Reviews;
