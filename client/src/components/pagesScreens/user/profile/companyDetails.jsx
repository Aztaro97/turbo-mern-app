import React, { useEffect } from "react";
import styled from "styled-components";
import { Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { MdMail } from "react-icons/md";
import Loader from "../../../Loader";

import { getUserDetails } from "../../../../flux/actions/userAction";
import ButtonC from "../../../ButtonComponeent";
import BgImg from "../../../../img/Background.png";

const CompanyInfo = ({ loading, user, error }) => {
  const { company } = user;
  // const params = useParams();

  // const userId = params.id;

  // const { loading, error, user } = useSelector((state) => state.userDetails);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (user === null || user._id !== userId) {
  //     dispatch(getUserDetails(userId));
  //   }
  // }, [dispatch, userId, user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Errror : {error}</h1>
      ) : (
        <>
          <Grid>
            <Col>
              <img
                src={company.urlImg.length !== 0 ? company.urlImg : BgImg}
                alt=""
              />
              <Container>
                <Row>
                  <h1>{company.name}</h1>
                  <p>{company.scopeBusiness}</p>
                  <hr />
                </Row>
                <Row>
                  <h1>about us</h1>
                  <p>{company.about}</p>
                  <hr />
                </Row>
                <Row>
                  <h1>Our Services</h1>
                  <p>{company.services}</p>
                  <hr />
                </Row>
                <Row>
                  <h1>Contact us</h1>
                  <div className="info">
                    <FaPhoneAlt className="info-icon" />
                    <p>{company.phoneNumber.join(" / ")}</p>
                  </div>
                  <div className="info">
                    <FaMapMarkerAlt className="info-icon" />
                    <p>freedom Street</p>
                  </div>
                  <div className="info">
                    <MdMail className="info-icon" />
                    <p>{company.email}</p>
                  </div>
                  <hr />
                </Row>
                {company.mediaLink && (
                  <Row>
                    <h1>Find us on</h1>
                    <div className="social-media">
                      {company.mediaLink.facebook && (
                        <a
                          href={company.mediaLink.facebook}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaFacebookF className="facebook" />
                        </a>
                      )}
                      {company.mediaLink.insta && (
                        <a
                          href={company.mediaLink.insta}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaInstagram className="insta" />
                        </a>
                      )}
                      {company.mediaLink.twitter && (
                        <a
                          href={company.mediaLink.twitter}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaTwitter className="twitter" />
                        </a>
                      )}
                      {company.mediaLink.whatsapp && (
                        <a
                          href={company.mediaLink.twitter}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaTwitter className="twitter" />
                        </a>
                      )}
                    </div>
                    <hr />
                  </Row>
                )}
                <Row>
                  <h1>Work hours</h1>
                  <p>Form 7.00 am to 5.00 pm all week day</p>
                  <p>Holiday on {company.holidays}</p>
                  <hr />
                </Row>
                {company.videoLink && (
                  <Row>
                    <a
                      href={company.videoLink}
                      className="video_link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Check video
                    </a>
                  </Row>
                )}
              </Container>
            </Col>
            <Col>
              <div className="container">
                <img src={company.urlImg.length !== 0 ? company.urlImg[0].url : BgImg} alt="" className="bg-right" />
                <ImageGallerie>
                  {company.urlImg.map((item, index) => (
                    <ImageA key={index} src={item.url} />
                  ))}
                </ImageGallerie>
              </div>
            </Col>
          </Grid>
        </>
      )}
    </>
  );
};
const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem 1rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 1rem;

  @media only screen and (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;
const Col = styled.div`
  .container {
    /* border: 1px solid #e9e6e6; */
    border-radius: 20px;
    padding: 0 0.7rem;

    & img {
    }
  }

  & img {
    width: 100%;
    object-fit: cover;
    /* border-radius: 20px; */
  }

  & .bg-right {
    height: 800px;
    border-radius: 10px;
    object-fit: cover;
    @media only screen and (max-width: 1080px) {
      height: 500px;
    }
    @media only screen and (max-width: 768px) {
      height: 300px;
    }
  }
`;
const Row = styled.div`
  margin-bottom: 0.7rem;

  & h1 {
    font-weight: 700;
    font-size: 1rem;
    text-transform: uppercase;
    margin-bottom: 0.3rem;
  }

  & p {
    color: #92a4b3;
  }
  & hr {
    background: #e9e6e6;
    height: 1px;
    outline: none;
    border: none;
  }

  & .info {
    display: flex;
    align-items: center;
    margin-bottom: 0.6rem;

    & .info-icon {
      color: var(--orange-color) !important;
      margin-right: 0.8rem;
    }

    & p {
      margin: 0;
      color: #92a4b3;
    }
  }

  & .social-media {
    display: flex;
    align-items: center;
    color: #fff;

    & a {
      text-decoration: none;
      color: inherit;
      margin-left: 0.6rem;
      /* color: in; */
      & .facebook {
        border-radius: 50%;
        padding: 7px;
        font-size: 2.4rem;
        background: #3b5998;
      }
      & .insta {
        border-radius: 50%;
        padding: 7px;
        font-size: 2.4rem;
        background: #6a453b;
      }
      & .twitter {
        border-radius: 50%;
        padding: 7px;
        font-size: 2.4rem;
        background: #55acee;
      }
    }
  }
  & .video_link {
    color: #fff;
    text-decoration: none;
    background: var(--orange-color);
    padding: 0.5rem 3rem;
    &:hover {
      opacity: 0.9;
    }
  }
`;

const ImageGallerie = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 1rem;
  /* height:30%; */
  padding: 0.4rem 0;
  margin-top: 0.4rem;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ImageA = styled(Image)`
  height: 100%;

  @media only screen and (max-width: 768px) {
    border-radius: 10px;
  }
`;

export default CompanyInfo;