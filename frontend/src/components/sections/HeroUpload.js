import React, { useState } from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import ButtonGroup from "../elements/ButtonGroup";
import { Link } from "react-router-dom";
import ai from "../../assets/images/ai.gif";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { CloudUpload } from "@mui/icons-material";
import Radio from "../elements/Radio";
import axios from "axios";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const HeroUpload = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const [image, setImage] = useState();
  const [url, setUrl] = useState();
  const [method, setMethod] = useState(null);
  const [data, setData] = useState(null);

  const handleMethod = (e) => {
    setMethod(e.target.value);
    if (e.target.value === "0") {
      setData({
        name: "Face Verification",
        url: "verify/",
        method: "POST",
        desc: " The Face Verification API provided by DeepFace uses a VGG-Face neural network model to extract facial features from input images. The extracted features are compared using cosine similarity to determine whether the two images contain the same person or not. The model has an accuracy of 99.38% on the Labeled Faces in the Wild (LFW) dataset. The response time for this API is typically around 1-2 seconds.This is a description of the Image Classification method.",
      });
    } else if (e.target.value === "1") {
      setData({
        name: "Object Detection",
        url: "age/",
        method: "POST",
        desc: "The Age Prediction API provided by DeepFace uses a Multi-Task Convolutional Neural Network (MTCNN) model to detect faces in input images and a Deep Expectation of Real and Apparent Age (DEX) model to predict the age of the person in the image. The DEX model has an accuracy of 80.37% on the Adience benchmark dataset. The response time for this API is typically around 1-2 seconds.The Age Prediction API can predict the age of a given face. This feature can be used in various applications such as marketing, advertising, or e-commerce, where demographic data can be used for targeted campaigns or personalized recommendations.This is a description of the Object Detection method.",
      });
    } else if (e.target.value === "2") {
      setData({
        name: "Image Segmentation",
        url: "gender/",
        method: "POST",
        desc: " The Gender Prediction API can predict the gender of a given face. This feature can be used in various applications such as market research, advertising, or social media analysis where demographic data can provide insights into consumer behavior.",
      });
    } else if (e.target.value === "3") {
      setData({
        name: "Image Captioning",
        url: "emotion/",
        method: "POST",
        desc: "This is a description of the Image Captioning method.",
      });
    }
    else if(e.target.value === '4'){
        setData({
            name: "Race Detection",
            url: "race/",
            method: "POST",
            desc: "The Race Prediction API can predict the race of a given face. This feature can be used in various applications such as demographic research, diversity and inclusion initiatives, or market analysis to better understand consumer behavior.",
        });
    }
  };

  const handleImageFile = (e) => {
    setImage(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  };
  console.log(image);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(image);
      const formData = new FormData();
      formData.append("image", image);
        const result = await axios.post(
          "http://127.0.0.1:8000/emotion/",
          formData
        );
        console.log(result);
      //   setPrediction(data.Prediction);
    } catch (err) {
      console.log(err);
    }
  };

  let apiName = ['Face verification','Age Detection','Gender Detection','Emotion Detection','Race Detetction']

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div
          className={innerClasses}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingLeft: "0%",
          }}
        >
          <div
            className="hero-content"
            style={{
              textAlign: "left",
            }}
          >
            <h1
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              <span className="text-color-primary">Synergyze</span>
            </h1>
            <div className="container-xs">
              <p
                className="m-0 mb-32 reveal-from-bottom"
                data-reveal-delay="400"
                style={{
                  fontSize: "1.5rem",
                }}
              >
                Try It Yourself
              </p>
              <p className="text-color-primary">
                Upload Your Image and Check for the things you want to check
              </p>
              {data && (
                <>
                <p className="text-color-primary" style={{ marginBottom: 0 }} >
                    URL : {data.url ? data.url : "No URL Available"}
                  </p>
                  <p className="text-color-primary" style={{ marginBottom: 0 }}>
                    Method : {data.method}
                  </p>
                  
                  <p>{data.desc}</p>
                </>
              )}
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <form onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      mt: 2,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        mr: { sm: 1 },
                        border: "1px solid lightgrey",
                        borderRadius: "5px",
                      }}
                    >
                      {url ? (
                        <img
                          width="100%"
                          src={url}
                          style={{ borderRadius: "5px" }}
                        />
                      ) : (
                        <div
                          style={{
                            height: "200px",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <CloudUpload
                            style={{ fontSize: "100px", color: "#4048d2" }}
                          />
                        </div>
                      )}
                    </Box>
                    <Button
                      variant="outlined"
                      fullWidth
                      component="label"
                      style={{ height: "37px", marginTop: "10px" }}
                      value={image}
                      onChange={(e) => handleImageFile(e)}
                    >
                      Upload Image
                      <input hidden accept="image/*" type="file" />
                    </Button>
                    <input variant="outlined"
                      fullWidth
                      component="label"
                      style={{ height: "37px", marginTop: "10px" }} type="text" />
                  </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ height: "37px", marginTop: "10px" }}
                    >
                        Submit
                    </Button>
                    
                  
                </form>
                {/* <Button
                  variant="outlined"
                  fullWidth
                  component="label"
                  style={{ height: "37px" }}
                  value={image}
                  onChange={(e) => handleImageFile(e)}
                >
                  Check Image
                </Button> */}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "45%",
            }}
          >
            <h3
              className="mt-0 mb-16 reveal-from-bottom"
              data-reveal-delay="200"
            >
              <span className="text-color-primary">Select Method</span>
            </h3>
            {apiName.map((item,index) => {
                return (
                    <Radio
                    value={index}
                    onChange={handleMethod}
                    checked={method == index}
                    label={item}
                    name={item}
                    />
                    );
                }
            )}
            {/* // <Radio
            //   value="1"
            //   onChange={handleMethod}
            //   checked={method === "1"}
            //   label="Face Verification"
            //   name={"Face Verification"}
            // />
            // <Radio
            //   value="2"
            //   onChange={handleMethod}
            //   checked={method === "2"}
            //   label="Age Detection"
            //   name={"Age Detection"}
            // />
            // <Radio
            //   value="3"
            //   onChange={handleMethod}
            //   checked={method === "3"}
            //   label="Gender Detection"
            //   name={"Gender Detection"}
            // />
            // <Radio
            //   value="4"
            //   onChange={handleMethod}
            //   checked={method === "4"}
            //   label="Emotion Detection"
            //   name={"Emotion Detection"}
            // />
            // <Radio
            //   value="5"
            //   onChange={handleMethod}
            //   checked={method === "5"}
            //   label="Race Detection"
            //   name={"Race Detection"}
            // /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

HeroUpload.propTypes = propTypes;
HeroUpload.defaultProps = defaultProps;

export default HeroUpload;





