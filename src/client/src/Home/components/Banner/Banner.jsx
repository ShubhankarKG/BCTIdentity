import React from "react";
import "./Banner.scss";
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="homeBanner">
      <div className="parallax"></div>
      <div className="banner-center">
        BCT Identity
        <br />
        <Link to="/login">
          <Button
            variant="contained"
            color="secondary"
            size="large"
          >
            Student
          </Button>
        </Link>


        <Link to="/institute-login" style={{ paddingLeft: "30px" }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
          >
            Institute
          </Button>
        </Link>

      </div>
      <div className="banner-text">
        &nbsp; AUTHENTICATION &nbsp; | &nbsp; REIMAGINED &nbsp;
      </div>
    </section>
  );
};

export default Banner;
