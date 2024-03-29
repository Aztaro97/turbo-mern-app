import React from "react";
import styled from "styled-components";
import MainContainer from "../../MainContainer";
import { Card, Col, Image, Row, Space, Typography } from "antd";
import Button from "../../ButtonComponeent";
import Slider from "react-slick";
import { Fade } from "react-reveal";
import "./production.css";
import { Link, useHistory } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

function ProductionScreen() {
  return (
    <MainContainer>
      <Container>
        <Banner>
          <div className="content">
            <Title level={2} className="title">
              Delivering Top Quality <br /> Disposable Food Packaging in Dubai
            </Title>
            <Link to="/contact-us" className="link">
              contact us
            </Link>
          </div>
        </Banner>
        <ProductSelling />
        {/* <section className="portfolio">
          <Fade bottom>
            <Button className="button">Portfolio</Button>
            <h4>Your one-step printing solution</h4>
          </Fade>
        </section> */}
        <CardProductList />
        <section className="contact_section">
          <Fade bottom>
            <h4>Get in touch with us</h4>
            <Link to="/contact-us" className="link">
              <Button className="button">contact us</Button>
            </Link>
          </Fade>
        </section>
      </Container>
    </MainContainer>
  );
}

const ProductSelling = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    autoplay: true,
    slidesToShow: 4,
    // rtl: lang === "ar" ? true : false,
    slidesToScroll: 1,
    dotsClass: "dots__bar",
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <ProductStyling>
      <Fade bottom>
        <Title level={2} className="title">
          best selling products
        </Title>
        <Slider {...settings} className="slider">
          <div>
            <img src="https://via.placeholder.com/500" alt="" />
          </div>
          <div>
            <img src="https://via.placeholder.com/300" alt="" />
          </div>
          <div>
            <img src="https://via.placeholder.com/300" alt="" />
          </div>
          <div>
            <img src="https://via.placeholder.com/500" alt="" />
          </div>
          <div>
            <img src="https://via.placeholder.com/300" alt="" />
          </div>
          <div>
            <img src="https://via.placeholder.com/300" alt="" />
          </div>
        </Slider>
      </Fade>
    </ProductStyling>
  );
};

const CardProductList = () => {
  const data = [
    {
      name: "PAPER PRODUCTS",
      description: "lorem upsum description ",
      imgUrl:
        "https://images.unsplash.com/photo-1513521773210-0cc22dfee8db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: "TISSUE PRODUCTS",
      description: "lorem upsum description ",
      imgUrl:
        "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
      name: "PLASTIC PRODUCTS",
      description: "lorem upsum description ",
      imgUrl:
        "https://images.unsplash.com/photo-1513521773210-0cc22dfee8db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: "ALUMINIUM PRODUCTS",
      description: "lorem upsum description ",
      imgUrl:
        "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
      name: "FOAM PRODUCTS",
      description: "lorem upsum description ",
      imgUrl:
        "https://images.unsplash.com/photo-1513521773210-0cc22dfee8db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: "HYGIENE & PROTECTION",
      description: "lorem upsum description ",
      imgUrl:
        "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
  ];

  const history = useHistory();
  return (
    <ProductListStyling>
      <Fade bottom>
        <Title level={2} className="title">
          Categories of products
        </Title>
        <Row gutter={[20, 40]} justify="center">
          {data.map((item, index) => (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
              key={item + index}
            >
              <Card
                onClick={() => history.push(`/production/${item.name}`)}
                hoverable
                className="product_card"
                cover={<img alt="example" src={item.imgUrl} height="200px" />}
              >
                <Meta title={item.name} />
              </Card>
            </Col>
          ))}
        </Row>
      </Fade>
    </ProductListStyling>
  );
};

const Container = styled.div`
  & section {
    padding: 4rem 2rem;
    @media only screen and (max-width: 548px) {
      padding: 2rem 1rem;
    }
  }
  & .portfolio {
    margin: 20px 0;
    background: linear-gradient(to bottom, #11111176 0%, #00000099 100%),
      url("https://images.unsplash.com/photo-1633114128814-11fac33f707b?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80");
    padding: 20px;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    height: 200px;
    & > * {
      color: #fff;
    }
    & .button {
      border-radius: 50px;
      color: var(--orange-color);
      padding: 20px auto !important;
      background: #fff;
    }
    & h4 {
      font-weight: 700;
      font-size: 1.6rem;
      margin-bottom: 0;
      padding: 10px;
      text-transform: capitalize;
      letter-spacing: 1px;
    }
    @media only screen and (max-width: 600px) {
      & .button {
        font-size: 0.8rem;
      }
      & h4 {
        font-size: 1.2rem;
      }
    }
  }
  & .contact_section {
    margin: 20px 0;
    background: linear-gradient(to bottom, #11111176 0%, #00000099 100%),
      url("https://images.unsplash.com/photo-1633114128814-11fac33f707b?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80");
    padding: 20px;
    display: flex;
    align-items: center;
    height: 200px;
    & > * {
      color: #fff;
    }
    & .link {
      text-decoration: none;
    }
    & .button {
      border-radius: 10px;
      color: var(--orange-color);
      padding: 20px auto !important;
      background: #fff;
    }
    & h4 {
      font-weight: 700;
      font-size: 1.6rem;
      margin-bottom: 0;
      padding: 10px;
    }
    @media only screen and (max-width: 600px) {
      & .button {
        font-size: 0.8rem;
      }
      & h4 {
        font-size: 1.2rem;
      }
    }
  }
`;

const ProductListStyling = styled.section`
  & .title {
    color: var(--white-color);
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  & .product_card {
    width: 100%;
    margin: 0 auto;
  }
  & img {
    height: 200px;
    width: 100%;
    object-fit: cover;
  }
`;

const ProductStyling = styled.section`
  padding: 4rem 2rem;
  & .title {
    text-transform: uppercase;
    text-align: center;
    color: var(--white-color);
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
  & .slider {
    width: 100%;
    & div {
      & img {
        width: 200px;
        height: 200px;
        margin: auto;
        object-fit: contain;
        @media only screen and (max-width: 425px) {
          width: 140px;
          height: 140px;
        }
      }
    }
  }
`;

const Banner = styled.section`
  background: linear-gradient(
      180deg,
      rgba(33, 33, 33, 0.8113620448179272) 100%,
      rgba(0, 0, 0, 0.6699054621848739) 100%
    ),
    url("/img/production/banner_image.jpg");
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
    align-items: start;
    padding: 2rem;

    margin: 0 auto;
    & .title {
      color: var(--silver-color);
      letter-spacing: 1px;
    }
    & .para {
      max-width: 400px;
      text-align: center;
    }
    & .link {
      text-decoration: none;
      border: 1px solid var(--silver-color);
      color: var(--silver-color);
      padding: 5px 2rem;
      background: transparent;
      margin-top: 10px;
      &:hover {
        opacity: 0.9;
      }
    }
  }
  @media screen and (max-width: 678px) {
    height: 400px;
    & .content {
      justify-content: end;
      align-items: start;
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

export default ProductionScreen;
