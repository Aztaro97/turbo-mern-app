import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  MdMail,
  GiPadlock,
  ImPhone,
  GoPlus,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  AiFillDelete,
} from "react-icons/all";
import { FiUploadCloud } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Upload, Radio, DatePicker, Select } from "antd";
import ImgCrop from "antd-img-crop";
import {
  register,
  registerCompanyInfo,
  registerBankInfo,
  getCompanyDetails,
} from "../../../flux/actions/userAction";
import { SyncOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import MainContainer from "../../MainContainer";
import InputRadio from "../../InputRadioComponent";
import ButtonC from "../../ButtonComponeent";
import InputC from "../../InputComponents";
import SelectC from "../../SelectComponents";
import Ratio from "../../antRatio";
import moment from "moment";
import { IoIosCloudDone } from "react-icons/io";
import { successMessage } from "../../message";
import LoaderComponent from "../../loader";
import { scopeData } from "../../../utils/ecommerceData";
import ErrorServerPage from "../ErrorServerPage";

const { RangePicker } = DatePicker;
const { Option } = Select;

function RegisterPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      company: {
        name: "",
        type: "company",
        scopeBusiness: [],
        licenceNumber: "",
        expireDate: "",
        phoneNumber: "",
        location: "",
        email: "",
        workHours: [],
        holidays: "",
        about: "",
        services: "",
        videoLink: "",
        mediaLink: {
          facebook: "",
          insta: "",
          twitter: "",
          whatsapp: "",
        },
      },
    },
    onSubmit: (values) => {
      const body = JSON.stringify(values, null, 2);
      setTimeout(() => {
        dispatch(registerCompanyInfo(body));
        console.log(body);
      }, 500);
    },
  });

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, user, error } = useSelector((state) => state.userDetails);

  const company = user?.company;

  useEffect(() => {
    if (!userInfo) {
      history.push("/auth");
    }
    if (company === undefined) {
      dispatch(getCompanyDetails());
    } else {
      formik.setFieldValue("company.type", company.type);
      formik.setFieldValue("company.name", company.name);
      formik.setFieldValue("company.scopeBusiness", company.scopeBusiness);
      formik.setFieldValue("company.licenceNumber", company.licenceNumber);
      formik.setFieldValue("company.expireDate", company.expireDate);
      formik.setFieldValue("company.phoneNumber", company.phoneNumber);
      formik.setFieldValue("company.location", company.location);
      formik.setFieldValue("company.email", company.email);
      formik.setFieldValue("company.workHours", company.workHours);
      formik.setFieldValue("company.holidays", company.holidays);
      formik.setFieldValue("company.about", company.about);
      formik.setFieldValue("company.services", company.services);
      formik.setFieldValue("company.videoLink", company.videoLink);
      formik.setFieldValue(
        "company.mediaLink.facebook",
        company.mediaLink.facebook
      );
      formik.setFieldValue("company.mediaLink.insta", company.mediaLink.insta);
      formik.setFieldValue(
        "company.mediaLink.twitter",
        company.mediaLink.twitter
      );
      formik.setFieldValue(
        "company.mediaLink.whatsapp",
        company.mediaLink.whatsapp
      );
    }
  }, [userInfo, company, history, dispatch]);

  return (
    <MainContainer>
      {loading ? (
        <LoaderComponent />
      ) : error === "Request failed with status code 500" ? (
        <ErrorServerPage />
      ) : (
        <Container>
          <CompanyInfo {...formik} />
          {/* <BankInfo /> */}
          <GalleryPhotos
            urlImg={company?.urlImg.length > 0 ? company.urlImg : []}
          />
        </Container>
      )}
    </MainContainer>
  );
}

const CompanyInfo = ({ ...formik }) => {
  const { t } = useTranslation();
  // Finish State
  const [cellular, setCellular] = useState("");
  const [ListCellular, setListCellular] = useState([]);

  const [workHourFrom, setWorkHourFrom] = useState("");
  const [workHourTo, setWorkHourTo] = useState("");

  const [hour, setHour] = useState({
    from: "",
    to: "",
  });
  const [ListHour, setListHour] = useState([]);

  const history = useHistory();

  let typeUser = formik.values.company.type;

  const handleClickRadio = (e) => {
    formik.setFieldValue("company.type", e.target.value);
    console.log(e.target.value);
  };

  const children = [];
  scopeData.map((data) =>
    children.push(<Option key={data.title}>{data.title}</Option>)
  );

  const { saveSuccess } = useSelector((state) => state.userCompany);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Header>
        <a href="#/" onClick={() => history.goBack()}>
          {t("back")}
        </a>
        <div className="radio_container">
          <Radio.Group
            className="radio_group"
            onChange={handleClickRadio}
            defaultValue={formik.values.company.type}
          >
            <RadioCustom value="company"> {t("company")} </RadioCustom>
            <RadioCustom value="personnel">{t("personnel")}</RadioCustom>
          </Radio.Group>
        </div>
      </Header>
      <h1>{typeUser} information</h1>

      <div className="card">
        <div className="grid">
          <div className="col">
            <div className="row">
              <InputC
                required
                type="text"
                // placeholder={`${typeUser} NAME`}
                placeholder={
                  typeUser === "company"
                    ? "COMPANY NAME"
                    : "PERSONNEL COMPANY NAME"
                }
                name="company.name"
                value={formik.values.company.name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="row">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%", padding: 0 }}
                placeholder="SELECT SCOPE OF BUSINESS"
                defaultValue={formik.values.company.scopeBusiness}
                className="select_input"
                onChange={(value) =>
                  formik.setFieldValue("company.scopeBusiness", value)
                }
              >
                {children}
              </Select>
            </div>

            {typeUser === "company" && (
              <>
                <div className="row">
                  <InputC
                    required
                    type="currency"
                    placeholder={`LICENCE NUMBER`}
                    name="company.licenceNumber"
                    value={formik.values.company.licenceNumber}
                    onChange={formik.handleChange}
                  />
                </div>
                {/* <h2>ddd: {formik.values.company.expireDate}</h2> */}
                <div className="row">
                  <DatePickerStyling
                    style={{
                      width: "100%",
                      borderColor: "var(--orange-color",
                    }}
                    defaultValue={moment(
                      formik.values.company.expireDate,
                      "MM-DD-YYYY"
                    )}
                    onChange={(date, dateString) =>
                      formik.setFieldValue("company.expireDate", dateString)
                    }
                    picker="date"
                    format="MM-DD-YYYY"
                    placeholder={t("expiry_placeholder")}
                    showNow={false}
                  />
                </div>
              </>
            )}

            <div className="row">
              <h1>{t("nav_contact")}</h1>
              <div className="input-container">
                <ImPhone className="icon" />
                <input
                  className="input-field"
                  type="tel"
                  placeholder={t("phone_number_placeholder")}
                  name="company.phoneNumber"
                  value={formik.values.company.phoneNumber}
                  onChange={formik.handleChange}
                />
                {/* <ButtonC
                      style={{ padding: "1rem", margin: "0 5px" }}
                      type="button"
                      onClick={addCellular}
                    >
                      <GoPlus />
                    </ButtonC> */}
              </div>
              {/* <Ul>
                    {ListCellular.length > 0
                      ? ListCellular.map((item, index) => (
                          <li key={index}>
                            <p>{item}</p>
                            <AiFillDelete
                              className="delete_icon"
                              onClick={() => deleteCellular(index)}
                            />
                          </li>
                        ))
                      : null}
                  </Ul> */}
            </div>
            <div className="row">
              <div className="input-container">
                <FaMapMarkerAlt className="icon" />
                <input
                  className="input-field"
                  type="url"
                  placeholder={t("location_placeholder")}
                  value={formik.values.company.location}
                  onChange={formik.handleChange}
                  name="company.location"
                />
                <ButtonC
                  style={{ padding: "1rem", margin: "0 5px" }}
                  type="button"
                >
                  <FaMapMarkerAlt />
                </ButtonC>
              </div>
            </div>
            <div className="row">
              <div className="input-container">
                <MdMail className="icon" />
                <input
                  required
                  type="mail"
                  className="input-field"
                  placeholder={t("email_placeholder")}
                  name="company.email"
                  value={formik.values.company.email}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <h1>{t("work_hours")}</h1>

              <div className="time_container">
                <RangePickerStyling
                  defaultPickerValue={moment(formik.values.workHours)}
                  onChange={(date, dateString) => {
                    formik.setFieldValue("company.workHours", dateString);
                  }}
                  picker="time"
                  // mode="time"
                  format="HH:mm"
                  placeholder={[t("from_placeholder"), t("to_placeholder")]}
                  showNow={false}
                />
              </div>
              {/* <Ul>
                {ListHour.length > 0
                  ? ListHour.map((item, index) => (
                      <li key={index}>
                        <p>
                          <span>From{item.from}</span> to {item.to}
                        </p>
                        <AiFillDelete
                          className="delete_icon"
                          onClick={() => deleteHour(index)}
                        />
                      </li>
                    ))
                  : null}
              </Ul> */}
            </div>
            <div className="row">
              <h1>{t("add_holidays")}</h1>
              <InputC
                required
                type="text"
                name="company.holidays"
                placeholder={t("type_day_placeholder")}
                value={formik.values.company.holidays}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="col">
            <div className="row">
              <h1>{t("about_company")}</h1>
              <TextArea
                required
                type="text"
                style={{ height: 100 }}
                name="company.about"
                value={formik.values.company.about}
                onChange={formik.handleChange}
              />
            </div>
            <div className="row">
              <h1>{t("our_services")}</h1>
              <TextArea
                required
                type="text"
                style={{ height: 100 }}
                name="company.services"
                value={formik.values.company.services}
                onChange={formik.handleChange}
              />
            </div>
            <div className="row">
              <h1>{t("add_video_link")}</h1>
              <InputC
                type="url"
                name="company.videoLink"
                placeholder={t("type_video_link_placeholder")}
                value={formik.values.company.videoLink}
                onChange={formik.handleChange}
              />
            </div>
            <div className="row" style={{ display: "block" }}>
              <h1>{t("add_your_page")}</h1>
              <div className="social-media">
                <FaFacebookF className="facebook" />
                <FaInstagram className="insta" />
                <FaTwitter className="twitter" />
                <ImPhone className="whatsapp" />
              </div>
              <InputC
                type="url"
                style={{ marginTop: 15 }}
                value={formik.values.company.mediaLink.facebook}
                name="company.mediaLink.facebook"
                placeholder={t("type_facebook_placeholder")}
                onChange={formik.handleChange}
              />
              <InputC
                type="url"
                style={{ marginTop: 15 }}
                name="company.mediaLink.insta"
                value={formik.values.company.mediaLink.insta}
                placeholder={t("type_insta_placeholder")}
                onChange={formik.handleChange}
              />
              <InputC
                type="url"
                style={{ marginTop: 15 }}
                value={formik.values.company.mediaLink.twitter}
                name="company.mediaLink.twitter"
                placeholder={t("type_twitter_placeholder")}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        <ButtonC style={{ margin: "10px auto 10px 0" }} type="submit">
          {t("save")}
        </ButtonC>
      </div>
    </Form>
  );
};

const BankInfo = () => {
  const { t } = useTranslation();
  const options = [
    {
      title: t("currrency_placeholder"),
      value: "",
    },
    {
      title: "Dirham Emirates ( dh )",
      value: "dirham",
    },
    {
      title: "Dollar US ( $ )",
      value: "dollar",
    },
    {
      title: "Euro ( ss)",
      value: "euro",
    },
  ];

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      bank: {
        name: "",
        branch: "",
        accountNumber: "",
        iban: "",
        swiftCode: "",
        device: "",
      },
    },
    onSubmit: (values) => {
      const body = JSON.stringify(values, null, 2);
      dispatch(registerBankInfo(body));
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1>{t("bank_info")}</h1>
      <div className="card">
        <div className="row">
          <InputC
            name="bank.name"
            type="text"
            placeholder={t("bank_name_placeholder")}
            value={formik.values.bank.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="row">
          <InputC
            name="bank.branch"
            type="text"
            placeholder={t("bank_branch_placeholder")}
            value={formik.values.bank.branch}
            onChange={formik.handleChange}
          />
        </div>
        <div className="row">
          <InputC
            name="bank.accountNumber"
            type="text"
            placeholder={t("acc_number_placeholder")}
            value={formik.values.bank.account}
            onChange={formik.handleChange}
          />
        </div>
        <div className="row">
          <InputC
            name="bank.iban"
            type="text"
            placeholder={t("iban_placeholder")}
            value={formik.values.bank.iban}
            onChange={formik.handleChange}
          />
        </div>
        <div className="row">
          <InputC
            name="bank.swiftCode"
            type="text"
            placeholder={t("swift_placeholder")}
            value={formik.values.bank.swiftCode}
            onChange={formik.handleChange}
          />
        </div>
        <div className="row">
          <SelectC
            options={options}
            name="bank.device"
            type="text"
            placeholder={t("currrency_placeholder")}
            value={formik.values.bank.device}
            onChange={(e) =>
              formik.setFieldValue("bank.device", e.target.value)
            }
          />
        </div>
        <div className="row">
          <ButtonC style={{ marginLeft: "auto" }} type="submit">
            {t("save")}
          </ButtonC>
        </div>
      </div>
    </Form>
  );
};

const GalleryPhotos = ({ urlImg }) => {
  const [loading, setLoading] = useState(false);
  const [submited, isSubmited] = useState(false);
  const [fileList, setFileList] = useState([]);

  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.userLogin);

  const history = useHistory();

  const handleChangeImage = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
      console.log(fileList);
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const handleSendImage = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      let formdata = new FormData();
      for (var i = 0; i < fileList.length; i++) {
        formdata.append("imgfiles", fileList[i].originFileObj);
      }

      const res = await axios.post(
        "/api/upload/company-images",
        formdata,
        config
      );

      if (res.data) {
        successMessage(res.data.msg);
        setLoading(true);
        return history.push("/myproducts");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    urlImg.length > 0 && setFileList(urlImg);
  }, [urlImg]);

  return (
    <Form onSubmit={(e) => handleSendImage(e)}>
      <div className="row_galery">
        <h1>{t("add_photo_for_your")}</h1>
        <div className="card">
          <ImgCrop>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              beforeUpload={() => true}
              onChange={handleChangeImage}
              onPreview={onPreview}
              fileList={fileList}
              name="imgfiles"
              accept="image/png, image/jpeg, image/jpg"
              multiple
            >
              {fileList.length < 4 && (
                <UploadIcon>
                  <GoPlus size={30} />
                </UploadIcon>
              )}
            </Upload>
          </ImgCrop>

          <p style={{ fontSize: ".8rem", color: "var(--dark-color)" }}>
            {" "}
            {t("cover_photo")}
          </p>
        </div>
      </div>
      <ButtonC
        style={{
          margin: "2rem auto 0",
          textTransform: "capitalize",
          fontWeight: 400,
        }}
        type="submit"
      >
        {!loading ? (
          <>
            {" "}
            {!submited ? (
              <>
                <FiUploadCloud style={{ margin: "0 5px" }} />
                <span>upload and save</span>
              </>
            ) : (
              <>
                <IoIosCloudDone style={{ margin: "0 5px" }} />
                <span>uploaded successfully</span>
              </>
            )}
          </>
        ) : (
          <>
            <SyncOutlined spin />{" "}
            <span style={{ paddingLeft: 4 }}> Loading...</span>
          </>
        )}
      </ButtonC>
    </Form>
  );
};

const UploadIcon = styled.div`
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--orange-color);
`;

const Header = styled.div`
  height: 5rem;
  width: 100%;

  & a {
    border: 1px solid var(--dark-color);
    text-decoration: none;
    color: var(--dark-color);
    font-weight: 700;
    position: relative;
    top: 20px;
    padding: 5px 10px;
  }

  & .radio_container {
    display: flex;
    justify-content: center;
    align-items: center;
    & .radio_group {
      color: var(--dark-color);
      & .ant-radio-wrapper {
        color: var(--dark-color);
        text-transform: uppercase;
      }
    }
  }
  @media only screen and (max-width: 500px) {
    height: 100%;
    padding: 1rem 0;
    & a {
      display: inline-block;
      position: initial;
      margin-bottom: 10px;
    }
    & .radio_container {
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
`;

const Container = styled.div`
  padding: 2rem;

  & .submittion_btn {
    margin: 2rem 0;
    text-align: center;
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

const Form = styled.form`
  margin-bottom: 2rem;
  & h1 {
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 700;
    color: var(--dark-color);
  }
  & .card {
    // border: 0.4px solid var(--silver-color);
    padding: 1rem 2rem;
    border-radius: 15px;
    background: var(--bg-color);

    & .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 3rem;
      @media only screen and (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    & .row {
      padding: 0.5rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & h1 {
        padding: 0;
      }
      .time_container {
        display: grid;
        grid-template-columns: 3fr 3fr 1fr;
        grid-gap: 0.8rem;
        padding: 0;
      }
      & .social-media {
        display: flex;
        width: 200px;
        justify-content: space-between;
        color: #fff;
        & .facebook {
          border-radius: 50%;
          padding: 7px;
          font-size: 2.4rem;
          background: #3b5998;
          /* margin-right: 0.7rem; */
        }
        & .insta {
          border-radius: 50%;
          padding: 7px;
          font-size: 2.4rem;
          background: #6a453b;
          /* margin-right: 0.7rem; */
        }
        & .twitter {
          border-radius: 50%;
          padding: 7px;
          font-size: 2.4rem;
          background: #55acee;
          /* margin-right: 0.7rem; */
        }
        & .whatsapp {
          border-radius: 50%;
          padding: 7px;
          font-size: 2.4rem;
          background: #4bae50;
        }
      }

      & .input-container {
        /* display: flexIE10 */
        display: flex;
        width: 100%;
        margin-bottom: 15px;
        border-radius: 20px;
        height: 2.5rem;
        padding: 0;

        & .icon {
          padding: 0.6rem;
          font-size: 2px;
          background: var(--orange-color);
          color: --dark-light-color;
          min-width: 3.12rem;
          text-align: center;
          height: 100%;
          border-radius: 0;
        }
        & .input-field {
          width: 100%;
          padding: 0 10px;
          outline: none;
          border: 2px solid var(--orange-color);
          background: transparent;
          color: var(--dark-color);
          /* border-radius: 0 5px 5px 0; */
          font-size: 0.7rem;
          height: 2.5rem;
          /* margin-right: ; */
        }
        & .input-field:focus {
          /* box-shadow: 0 0 0 2px var(--orange-color); */
          color: var(--dark-color);
        }
      }
    }
  }

  & .select_input {
    & .ant-select-selector {
      background: transparent !important;
      border: 1px solid var(--dark-color) !important;
      color: var(--dark-color) !important;
      &:focus {
        border: 1px solid var(--dark-color);
        box-shadow: none;
      }
    }

    & .ant-select-selection-item {
      background: transparent !important;
      color: var(--dark-color);
      border: 1px solid var(--dark-color) !important;
      border-radius: 5px;
      & svg {
        color: var(--dark-light-color);
      }
    }
  }
`;

const TextArea = styled.textarea`
  border-radius: 5px;
  border: 1px solid var(--dark-color);
  background: transparent;
  outline: none;
  height: 5rem;
  width: 100%;
  padding-left: 0.4rem;
  padding-top: 0.5rem;
  color: var(--dark-color);

  &:focus {
    color: var(--dark-color);
    /* box-shadow: 0 0 0 2px #c58787; */
    /* border-color: var(--dark-light-color); */
  }
`;

const Ul = styled.ul`
  list-style: none;
  /* padding-top: 1rem; */
  padding-left: 0.7rem;
  /* width: 1rem; */

  & li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    & p {
      text-transform: uppercase;
      color: var(--dark-color);
      font-weight: 700;
      margin-bottom: 0;
      margin-right: 2rem;
    }

    & .delete_icon {
      color: var(--dark-color);
      cursor: pointer;
      &:hover {
        color: #9c1717;
      }
    }
  }
`;

const RadioCustom = styled(Radio)`
  & .ant-radio-checked .ant-radio-inner {
    border-color: var(--orange-color) !important ;
  }
  & .ant-radio-checked .ant-radio-inner:after {
    background-color: var(--orange-color);
  }
  & .ant-radio:hover .ant-radio-inner {
    border-color: var(--orange-color);
  }
`;

const DatePickerStyling = styled(DatePicker)`
  &.ant-picker:hover {
    border-color: var(--orange-color) !important ;
  }
  &.ant-picker-focused {
    border-color: var(--orange-color) !important ;
    box-shadow: none;
  }
`;

const RangePickerStyling = styled(RangePicker)`
  min-width: 200px;
  background: transparent;
  color: var(--dark-color);
  &.ant-picker:hover {
    border-color: var(--orange-color) !important ;
    color: var(--dark-color);
  }
  &.ant-picker-focused {
    border-color: var(--dark-color) !important ;
    box-shadow: none;
    color: var(--dark-color);
  }
  & .ant-picker-input > input {
    color: var(--dark-color);
  }
`;

export default RegisterPage;
