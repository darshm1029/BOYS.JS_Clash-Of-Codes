import React from "react";
import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import Image from "../elements/Image";
import Marquee from "react-fast-marquee";
import { AddReaction } from "@mui/icons-material";
import { Group } from "@mui/icons-material";
import { Verified } from "@mui/icons-material";
import { ManageAccounts } from "@mui/icons-material";
import { Wc } from "@mui/icons-material";
import { Groups } from "@mui/icons-material";

const data1 = [
  {
    id: 1,
    img: <AddReaction />,
    name: "Face Detection",
    desc: "Find human faces in photos and images",
  },
  {
    id: 2,
    img: <Group />,
    name: "Face Identification",
    desc: "Search for face matches. Answers: “Who is this?”.",
  },
  {
    id: 3,
    img: <Verified />,
    name: "Face Verification",
    desc: "Search for someone's face. Answers: “Is this Elizabeth?”.",
  },
];

const data2 = [
  {
    id: 1,
    img: <ManageAccounts />,
    name: "Age Detection",
    desc: "Detects age groups; child, young-adult, adult, or senior.",
  },
  {
    id: 2,
    img: <Wc />,
    name: "Gender Detection",
    desc:"Detects gender of each face found; female or male."
  },
  {
    id: 3,
    img: <Groups />,
    name: "Multi-face Detection",
    desc: "Detects individuals, crowds, audiences and groups.",
  },
];

const data3 = [
  {
    id: 1,
    img: <AddReaction />,
    name: "Facial Coordinates",
    desc: "Detects size; pitch, roll, yaw, and key landmarks.",
  },
  {
    id: 2,
    img: <Group />,
    name: "Anti-Spoof Detection",
    desc: "Ensure security by checking the liveness of faces.",
  },
  {
    id: 3,
    img: <Verified />,
    name: "Diversity Recognition",
    desc : "Understand more about the diversity of the human face.",
  },
];


const propTypes = {
  ...SectionSplitProps.types,
};

const defaultProps = {
  ...SectionSplitProps.defaults,
};

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {
  const outerClasses = classNames(
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const sectionHeader = {
    title: "Synergyze Platform Features",
    paragraph: "Your Problem Our Solution",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <Marquee gradientWidth={5} gradientColor={[0, 0, 0, 0.5]} speed={30}>
            {data2.map((item) => (
              <div>
                <div
                  className="tiles-item"
                  style={{
                    backgroundColor: "#25282c",
                    borderRadius: "10px",
                    margin: "10px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className="tiles-item-inner">
                    <div className="features-tiles-item-header">
                      <div className="mb-16">{item.img}</div>
                    </div>
                    <div className="features-tiles-item-content">
                      <h4 className="mt-0 mb-8">{item.name}</h4>
                      <p className="m-0 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
          <Marquee gradientWidth={5} gradientColor={[0, 0, 0, 0.5]} speed={25}>
            {data1.map((item) => (
              <div>
                <div
                  className="tiles-item"
                  style={{
                    backgroundColor: "#25282c",
                    borderRadius: "10px",
                    margin: "10px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className="tiles-item-inner">
                    <div className="features-tiles-item-header">
                      <div className="mb-16">{item.img}</div>
                    </div>
                    <div className="features-tiles-item-content">
                      <h4 className="mt-0 mb-8">{item.name}</h4>
                      <p className="m-0 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
          <Marquee gradientWidth={5} gradientColor={[0, 0, 0, 0.5]}>
            {data3.map((item) => (
              <div>
                <div
                  className="tiles-item"
                  style={{
                    backgroundColor: "#25282c",
                    borderRadius: "10px",
                    margin: "10px",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className="tiles-item-inner">
                    <div className="features-tiles-item-header">
                      <div className="mb-16">{item.img}</div>
                    </div>
                    <div className="features-tiles-item-content">
                      <h4 className="mt-0 mb-8">{item.name}</h4>
                      <p className="m-0 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;
