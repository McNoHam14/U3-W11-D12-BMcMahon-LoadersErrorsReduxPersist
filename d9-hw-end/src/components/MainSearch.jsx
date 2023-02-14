import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/actions/action_creators";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const jobs = useSelector((state) => {
    return state.jobReducer.jobs;
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loadingSpinner = useSelector((state) => state.jobReducer.isLoading);
  const errorAlert = useSelector((state) => state.jobReducer.isError);

  const baseEndpoint =
    "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(fetchJobs(baseEndpoint, query));
  };

  return (
    <div>
      <Container>
        <Row>
          <Col xs={10} className="mx-auto my-3">
            <h1>Remote Jobs Search</h1>
            <Button onClick={() => navigate("/favourites")}>Favourites</Button>
          </Col>
          <Col xs={10} className="mx-auto">
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                value={query}
                onChange={handleChange}
                placeholder="type and press Enter"
              />
            </Form>
          </Col>
          <Col xs={10} className="mx-auto mb-5">
            {loadingSpinner && <Spinner animation="grow" variant="primary" />}
            {errorAlert && (
              <Alert variant="danger">
                This is an error alert—check it out!
              </Alert>
            )}
            {jobs.map((jobData) => (
              <Job key={jobData._id} data={jobData} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainSearch;
