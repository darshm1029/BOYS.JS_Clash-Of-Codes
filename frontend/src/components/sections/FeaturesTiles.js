import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";
import { Card } from "../elements/Card";

const cardData = [
  {
    id: 1,
    delay: 0,
    img: require("./../../assets/images/FD.png"),
    alt: "Image 1",
    name: "Face Verification",
    desc: "Face verification compares two faces to determine if they match",
  },
  {
    id: 2,
    delay: 200,
    img: require("./../../assets/images/attribute.jpg"),
    alt: "Image 2",
    name: "Face Recognition",
    desc: "To perform face recognition, the task is to find a face in a database and verify it multiple times  ",
  },
  {
    id: 3,
    delay: 400,
    img: require("./../../assets/images/recog.png"),
    alt: "Image 3",
    name: "Facial and Real-Time Attribute Analysis ",
    desc: "Facial attribute analysis describes visual properties of face images",
  },
];

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};
const FeaturesTiles = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {
  const outerClasses = classNames(
    "features-tiles section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-tiles-inner section-inner pt-0",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const tilesClasses = classNames(
    "tiles-wrap center-content",
    pushLeft && "push-left"
  );

  const sectionHeader = {
    title: "OUR SOLUTIONS",
    paragraph:
      "Synergyze is the most lightweight and easy solution for your business.",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>
            {cardData.map((data) => (
              <>
                <Card
                  img={data.img}
                  delay={data.delay}
                  alt={data.alt}
                  name={data.name}
                  desc={data.desc}
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;
