import { Card, Col, Modal, Row } from "antd";
import React, { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  deleteAdService,
  getUserAdsService,
} from "../../../flux/actions/advertisingAction/advertisingAction";
import { destroyImages } from "../../../flux/actions/productAction";
import LoaderComponent from "../../loader";
import MainContainer from "../../MainContainer";
import ErrorServerPage from "../ErrorServerPage";

const { Meta } = Card;
const folderIcon = "/img/icons/folder_icon.svg";

function MyAdsScreen() {
  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, listAdService, error } = useSelector(
    (state) => state.advertising
  );

  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = useSelector((state) => state.adsDelete);

  const history = useHistory();
  const dispatch = useDispatch();

  const showModal = (id, imageUrl) =>
    Modal.confirm({
      title: "Are you sure you want to delete",
      //   icon: <ExclamationCircleOutlined />,
      content: "When you delete your ads we'll not be show in website",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: () => {
        dispatch(deleteAdService(id));
        dispatch(destroyImages(imageUrl));
      },
    });

  useEffect(() => {
    if (!userInfo) {
      history.push("/auth");
    } else {
      dispatch(getUserAdsService(userInfo._id));
    }
  }, [userInfo, history, dispatch, successDelete]);

  return (
    <MainContainer>
      {loadingDelete && <LoaderComponent />}
      {loading ? (
        <LoaderComponent />
      ) : error.status === 500 ? (
        <ErrorServerPage />
      ) : (
        <Container>
          <div className="header">
            <div>
              <h2 className="title">My Ads</h2>
              <hr />
            </div>
            <Link to="/advertising/register" className="add_link">
              create new ads
            </Link>
          </div>
          <Row gutter={[10, 10]}>
            {listAdService?.length > 0 ? (
              listAdService.map((ad) => (
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 6 }}
                  key={ad._id}
                >
                  <CardStyling bordered={true} hoverable>
                    <button
                      className="btn_delete"
                      onClick={() => showModal(ad._id, ad.serviceUrl)}
                    >
                      <MdDelete className="icon" />
                    </button>
                    <img
                      width="100%"
                      height="150"
                      src={
                        ad.serviceUrl.length > 0
                          ? ad.serviceUrl[0].url
                          : "/img/advertising/empty.jpg"
                      }
                      alt=""
                    />

                    <div className="card_footer">
                      <p className="description">
                        Categorie: <span>{ad.typeBusiness}</span>
                      </p>
                      <Link to={`/advertising/edit/${ad._id}`}>
                        <AiFillEdit className="edit_icon" />
                      </Link>
                    </div>
                  </CardStyling>
                </Col>
              ))
            ) : (
              <Col xs={{ span: 24 }}>
                <EmptyAdsContainer>
                  <img src={folderIcon} className="icon" alt="" />
                  <h1>You don't have any Ads</h1>
                </EmptyAdsContainer>
              </Col>
            )}
          </Row>
        </Container>
      )}
    </MainContainer>
  );
}

const Container = styled.div`
  padding: 4rem 2rem;
  & .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    & .title {
      color: var(--orange-color);
      margin: 0;
    }
    & hr {
      height: 4px;
      background: var(--orange-color);
      outline: none;
      width: 100%;
      margin: 0;
    }
    & .add_link {
      text-transform: capitalize;
      color: #fff;
      background: var(--orange-color);
      padding: 4px 10px;
      text-decoration: none;
      letter-spacing: 1px;
      &:hover {
        opacity: 0.9;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const CardStyling = styled(Card)`
  background-color: var(--dark-light-color);
  border: none;
  &:hover {
    box-shadow: 0px 0px 10px rgba(100, 100, 100, 0.5);
  }

  & .btn_delete {
    border: none;
    outline: none;
    position: absolute;
    background: none;
    right: 10px;
    top: 8px;
    background-color: var(--orange-color);
    border-radius: 50%;
    padding: 4px;
    & .icon {
      font-size: 1.8rem;
      color: var(--white-color);
      &:hover {
        opacity: 0.8;
      }
    }
  }
  & .card_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    & .description {
      padding-top: 10px;
      margin: 0;
      text-transform: capitalize;
      font-weight: 700;
      color: var(--orange-color);
      & span {
        color: var(--silver-color);
      }
    }
    & .edit_icon {
      color: var(--orange-color);
      font-size: 25px;
      &:hover {
        color: var(--orange-color);
        opacity: 0.9;
      }
    }
  }
`;

const EmptyAdsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px;
  & .icon {
    max-width: 150px;
    max-height: 400px;
    filter: brightness(0) saturate(100%) invert(74%) sepia(0%) saturate(790%)
      hue-rotate(265deg) brightness(88%) contrast(85%);
  }
  & h1 {
    font-size: 1.7rem;
    color: var(--silver-color);
  }
  @media screen and (max-width: 768px) {
    & img {
      max-width: 100px;
    }
  }
`;

export default MyAdsScreen;
