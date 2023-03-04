import React, { useState } from "react";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import ButtonGroup from "../elements/ButtonGroup";
import Button from "../elements/Button";
import { Link } from "react-router-dom";
import ai from "../../assets/images/ai.gif";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

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

  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div
          className={innerClasses}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: "10%",
          }}
        >
          <div className="hero-content"
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
                Recognize People The Way You Want
              </p>
              <p className="text-color-primary">
                Integrate Face Recognition via our cloud API, or host Kairos on
                your own servers for ultimate control of data, security, and
                privacy—start creating safer, more accessible customer
                experiences today.
              </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <p>Leading Edge AI · 99.9% Accuracy · Built for Global Scale</p>
                <ButtonGroup>
                  <Button tag="a" color="primary" wideMobile href="">
                    <Link to="/">Join Now</Link>
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01">
            <img src={ai} alt="Hero" />
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
