import React, { useState } from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import ButtonGroup from "../elements/ButtonGroup";
import { Link } from "react-router-dom";
import ai from "../../assets/images/ai.gif";
import { Box, Button, TextField } from "@mui/material";
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
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

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
        name: "Age Detection",
        url: "age/",
        method: "POST",
        desc: "The Age Prediction API provided by DeepFace uses a Multi-Task Convolutional Neural Network (MTCNN) model to detect faces in input images and a Deep Expectation of Real and Apparent Age (DEX) model to predict the age of the person in the image. The DEX model has an accuracy of 80.37% on the Adience benchmark dataset. The response time for this API is typically around 1-2 seconds.The Age Prediction API can predict the age of a given face. This feature can be used in various applications such as marketing, advertising, or e-commerce, where demographic data can be used for targeted campaigns or personalized recommendations.This is a description of the Object Detection method.",
      });
    } else if (e.target.value === "2") {
      setData({
        name: "Gender Detection",
        url: "gender/",
        method: "POST",
        desc: " The Gender Prediction API can predict the gender of a given face. This feature can be used in various applications such as market research, advertising, or social media analysis where demographic data can provide insights into consumer behavior.",
      });
    } else if (e.target.value === "3") {
      setData({
        name: "Emotion Detection",
        url: "emotion/",
        method: "POST",
        desc: "The Emotion Detection API provided by DeepFace uses the same MTCNN face detection model and a Deep Emotion Recognition model to predict the emotion of the person in the image. The model can recognize seven emotions: happy, sad, angry, fearful, surprised, disgusted, and neutral. The model has an accuracy of 62.74% on the FER2013 dataset. The response time for this API is typically around 2-3 seconds.",
      });
    } else if (e.target.value === "4") {
      setData({
        name: "Race Detection",
        url: "race/",
        method: "POST",
        desc: "The Race Prediction API can predict the race of a given face. This feature can be used in various applications such as demographic research, diversity and inclusion initiatives, or market analysis to better understand consumer behavior.",
      });
    } else if (e.target.value === "5") {
      setData({
        name: "Predict Image",
        url: "predict/",
        method: "POST",
        desc: "This is a description of the The Face Prediction API provided by DeepFace uses a Convolutional Neural Network (CNN) model to analyze facial features and determine whether a given face is a real human or a cartoon. The model has an accuracy of 98.43% on the Real vs. Cartoon Faces dataset. The response time for this API is typically around 2-3 seconds.Predict Image method.",
      });
    } else if (e.target.value === "6") {
      setData({
        name: "All",
        url: "all/",
        method: "POST",
        desc: "The All-in-one API provided by DeepFace combines all the functionalities of the above APIs and provides a comprehensive report. The response time for this API varies depending on the number of tasks performed, but typically ranges from 2-5 seconds.",
      });
    }
  };

  const handleImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  const handleImageFile = (e) => {
    setImage(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  };
  console.log(image);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (image) {
        console.log(image);
        const formData = new FormData();
        formData.append("image", image);
        const result = await axios.post(
          "http://127.0.0.1:8000/" + data.url,
          formData
        );
        console.log(result);
      } else if (imageUrl) {
        console.log(imageUrl);
        const result = await axios.post(
          "http://127.0.0.1:8000/v1/" + data.url,
          {
            image_url: imageUrl,
          }
        );
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let apiName = [
    "Face verification",
    "Age Detection",
    "Gender Detection",
    "Emotion Detection",
    "Race Detetction",
    "Predict Image",
    "All",
  ];

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              background: "rgba(0,0,0,0.5),",
              backgroundImage: `url(${ai})`,
              zIndex: "1",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
        ) : (
          <>
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
                      <p
                        className="text-color-primary"
                        style={{ marginBottom: 0 }}
                      >
                        URL : {data.url ? data.url : "No URL Available"}
                      </p>
                      <p
                        className="text-color-primary"
                        style={{ marginBottom: 0 }}
                      >
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
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Button
                                fullWidth
                                component="label"
                                style={{
                                  height: "37px",
                                  marginTop: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                }}
                                value={image}
                                onChange={(e) => handleImageFile(e)}
                              >
                                <CloudUpload
                                  style={{
                                    fontSize: "100px",
                                    color: "#4048d2",
                                  }}
                                />
                                Upload Image
                                <input hidden accept="image/*" type="file" />
                              </Button>
                            </div>
                          )}
                        </Box>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <h3 className="mt-16 mb-16 reveal-from-bottom">
                            <span className="text-color-primary">OR</span>
                          </h3>
                        </div>
                        <input
                          variant="outlined"
                          fullWidth
                          component="label"
                          style={{ height: "37px", width: "100%" }}
                          type="text"
                          name="imageUrl"
                          placeholder="Enter Image URL"
                          onChange={(e) => handleImageUrl(e)}
                        />
                      </Box>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        style={{
                          height: "37px",
                          marginTop: "10px",
                          backgroundColor: "#4048d2",
                        }}
                      >
                        Submit
                      </Button>
                    </form>
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
                {apiName.map((item, index) => {
                  return (
                    <Radio
                      value={index}
                      onChange={handleMethod}
                      checked={method == index}
                      label={item}
                      name={item}
                    />
                  );
                })}
              </div>
            </div>
            <div className="hero-figure reveal-from-bottom illustration-element-01">
              <TextField
                id="outlined-multiline-static"
                label="Result"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                style={{ marginTop: "10px", backgroundColor: "white" }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

HeroUpload.propTypes = propTypes;
HeroUpload.defaultProps = defaultProps;

export default HeroUpload;
