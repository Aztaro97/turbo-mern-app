import React, { useRef, useState } from "react";
import MainContainer from "../../MainContainer";
import { Card, Col, Image, Row, Space, Typography } from "antd";
import styled from "styled-components";
import Button from "../../ButtonComponeent";
import Slider from "react-slick";
import emailjs from "emailjs-com";
import "./aboutStyling.css";
import { SyncOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

function AboutScreen() {
  return (
    <MainContainer>
      <Banner>
        <div className="content">
          <Title level={2}>About Us</Title>
          <Paragraph className="para">
            We are not the only ones, but we are distinguished, so we invite
            you, our dear customer, to get to know our services and products
            closely
          </Paragraph>
          <Link to="contact-us" className="link">
            contact us
          </Link>
        </div>
      </Banner>
      <FirstSectionComponent />
      <VisionStyling>
        <h1 className="title">our vision</h1>
        <Row gutter={[20, 20]} justify="center" className="card_container">
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <div className="card_item">
              <img className="card_img" src="/img/marketing_img3.jpg" alt="" />
              <h3 className="card_title">
                Flexible spending, easy settings and effective access to your
                ad.
              </h3>
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <div className="card_item">
              <img className="card_img" src="/img/ecommerce_img.jpg" alt="" />
              <h3 className="card_title">
                raise brand awareness and build your own audience
              </h3>
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <div className="card_item">
              <img className="card_img" src="/img/marketing_img.jpg" alt="" />
              <h3 className="card_title">
                we covers <br />
                all your needs whatever your goal
              </h3>
            </div>
          </Col>
        </Row>
      </VisionStyling>
      <TestimonialStyling>
        {/* <h1 className="title">lorem ipsum</h1> */}
        <Row gutter={[20, 10]} className="gutter_row">
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }}>
            <img className="picture" src="/img/au79code-img0.jpg" alt="" />
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 14 }}>
            <div className="content">
              <p>
                We meet the requests of any institution or company whether
                large, small, government or private, and our strength is
                reliable, distinctive and good service as we are designed as
                fast, dynamic and friendly search engines, if you are looking
                for a reliable agency to offer you all services You need
                permission to have reached the right place.
              </p>
            </div>
          </Col>
        </Row>
        <Row gutter={[20, 10]} className="gutter_row" style={{ marginTop: 10 }}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 14 }}>
            <div className="content">
              <p>
                We maintain a close relationship with all our customers we offer
                them help and advice if necessary, and our team with our wide
                experience, which has been carefully chosen by great attention
                to our dear customer's best service at appropriate prices, we
                are here to help you quickly and efficiently you can trust us We
                will make sure you have a unique way to push your business
                forward.
              </p>
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 10 }}>
            <img
              className="picture"
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
              alt=""
            />
          </Col>
        </Row>
      </TestimonialStyling>
      <FormContact />
    </MainContainer>
  );
}

const FirstSectionComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    centerPadding: "60px",
    // fade: true,
    speed: 400,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1,
    // rtl: lang === "ar" ? true : false,
    // rtl: true,
    slidesToScroll: 1,
    dotsClass: "dots__bar",
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <FirstSectionStyling>
      <h1 className="title">why choose us ?</h1>
      <Row gutter={[10, 50]}>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Slider {...settings} className="slider" arrows={false}>
            <div>
              <img
                src="/img/business-partners-handshake-international-business-concept.jpg"
                alt=""
              />
            </div>
            <div>
              <img src="/img/aerial-view-business-team.jpg" alt="" />
            </div>
            {/* <div>
              <img
                src="https://images.unsplash.com/photo-1611671208430-772bdb3ed5ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1611671208430-772bdb3ed5ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt=""
              />
            </div> */}
          </Slider>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <div className="content">
            <h2>AU 79 CODE</h2>
            <p>
              offers high quality services in web design, social networking
              management and electronic marketing services for government
              institutions, government and private companies that provide good
              quality services along with marketing, photography, printing and
              programming services as well as exhibitions and products.
            </p>
          </div>
        </Col>
      </Row>
    </FirstSectionStyling>
  );
};

const FormContact = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useRef();

  const serviceId = process.env.REACT_APP_EMAIL_JS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID;
  const userId = process.env.REACT_APP_EMAIL_USER_ID_;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await emailjs.sendForm(
        serviceId,
        templateId,
        form.current,
        userId
      );
      if (res.text) {
        setIsSend(true);
        setLoading(false);
        setName("");
        setLastName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormStyling isSend={isSend}>
      <h1 className="title">Quick contact</h1>
      <form onSubmit={handleSubmit} ref={form}>
        <input
          required
          value={name}
          type="text"
          name="user_name"
          onChange={(e) => setName(e.target.value)}
          placeholder="FIRST NAME"
        />
        <input
          required
          type="text"
          placeholder="LAST NAME"
          name="user_lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="EMAIL"
          name="user_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          required
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="MESSAGE"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button type="submit" className="btn_submit">
          {loading ? (
            <>
              <SyncOutlined spin />{" "}
              <span style={{ paddingLeft: 4 }}> Sending...</span>
            </>
          ) : (
            <span>{isSend ? "Message successfuly sent !!!" : "send"}</span>
          )}
        </button>
      </form>
    </FormStyling>
  );
};

const FormStyling = styled.div`
  padding: 20px 20px 40px 20px;
  background: var(--dark-light-color);
  & .title {
    text-align: center;
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 30px;
    color: var(--silver-color);
  }
  & input,
  & textarea {
    display: block;
    width: 100%;
    border: none;
    outline: none;
    /* border-left: 5px solid #ececec;
    border-right: 5px solid #ececec;
    border-top: 1px solid #ececec;
    border-bottom: 1px solid #ececec; */
    background: var(--dark-color);
    margin: 10px 0;
    padding: 5px 20px;
    resize: none;
  }
  & .btn_submit {
    border: 1px solid var(--silver-color);
    outline: none;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ isSend }) =>
      isSend ? "var(--orange-color)" : "transparent"};
    color: ${({ isSend }) =>
      isSend ? "var(--white-color)" : "var(--silver-color)"};
    padding: 5px 20px;
    letter-spacing: 1px;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: #ececec;
      background: #333;
    }
  }
`;

const TestimonialStyling = styled.section`
  background: var(--dark-light-color);
  max-width: calc(var(--max-width) - 300px);
  padding: 20px 30px;
  margin-left: auto;
  position: relative;
  bottom: 80px;
  & .title {
    text-align: center;
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 30px;
    color: var(--silver-color);
  }
  & .gutter_row {
    margin-bottom: 30px;
  }
  & .picture {
    width: 100%;
    height: 150px;
  }
  & .content {
    /* padding: 0; */
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    & p {
      margin-bottom: 0;
      color: var(--silver-color);
    }
  }
`;

const VisionStyling = styled.section`
  padding-top: 4rem;
  padding-bottom: 150px;
  background: var(--dark-color);
  & .title {
    font-size: 1.8rem;
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
    color: var(--silver-color);
    letter-spacing: 1px;
  }
  & .card_container {
    padding: 20px 30px;

    & .card_item {
      max-width: 250px;
      padding: 10px;
      background: var(--dark-light-color);
      margin: auto;
      & .card_img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      & .card_title {
        text-align: center;
        margin-top: 10px;
        text-transform: capitalize;
        font-size: 1.2rem;
        color: var(--silver-color);
        font-weight: 700;
      }
    }
  }
`;

const FirstSectionStyling = styled.section`
  background: var(--dark-light-color);
  padding: 4rem 0;
  & .title {
    text-align: center;
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 40px;
    color: var(--silver-color);
  }
  & .slider {
    & div {
      margin-bottom: 2px;
      & img {
        max-width: 400px;
        height: 300px;
        object-fit: cover;
        margin: auto;
      }
    }
  }

  & .content {
    height: 100%;
    display: flex;
    /* align-items: center; */
    justify-content: center;
    flex-direction: column;
    position: relative;
    padding: 20px;
    bottom: 10px;
    & h2,
    p {
      color: var(--silver-color);
    }
  }
`;

const Banner = styled.section`
  background: linear-gradient(
      180deg,
      rgba(33, 33, 33, 0.8113620448179272) 100%,
      rgba(0, 0, 0, 0.6699054621848739) 100%
    ),
    url("https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80");
  position: relative;
  height: 400px;
  object-fit: cover;
  background-position: center center;
  background-size: cover;
  & .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    max-width: 500px;
    padding-left: 20px;

    margin: 0 auto;
    & > * {
      color: var(--silver-color);
    }
    & .para {
      max-width: 400px;
      /* text-align: center; */
    }
    & .link {
      margin-top: 10px;
      text-decoration: none;
      padding: 7px 10px;
      text-decoration: none;
      background: transparent;
      border: 1px solid var(--silver-color);
      color: var(--silver-color);
      text-align: center;
      max-width: 200px;
      text-transform: uppercase;
      &:hover {
        opacity: 0.9;
      }
    }
  }
  @media screen and (max-width: 678px) {
    height: 400px;
    & .content {
      justify-content: end;
      padding-bottom: 20px;
      & > * {
        margin: 0;
      }
      & .para {
        margin-bottom: 5px;
      }
    }
  }
`;

export default AboutScreen;
