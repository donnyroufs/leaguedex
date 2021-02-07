import React from "react";
import * as SC from "./Home.styles";
import { useSlides } from "../../hooks/useSlides";
import { slides } from "./slidesData";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";

const Home = ({ history }) => {
  const { user } = useAuth();
  const { setModal } = useModal();
  const { currentSlide, handleNext, handlePrev, start, stop } = useSlides(
    slides,
    {
      speed: 7.0,
    }
  );

  return (
    <SC.Wrapper>
      <SC.Container>
        <SC.Hero>
          <SC.Hero.Inner>
            <SwitchTransition>
              <CSSTransition
                key={currentSlide.title}
                timeout={200}
                classNames="fade"
              >
                <SC.HeroBody>
                  <SC.Title
                    active
                    onMouseOver={() => stop()}
                    onMouseOut={() => start()}
                  >
                    {currentSlide.title}
                  </SC.Title>
                  <SC.Paragraph
                    onMouseOver={() => stop()}
                    onMouseOut={() => start()}
                  >
                    {currentSlide.body}
                  </SC.Paragraph>
                  <SC.ButtonGroup>
                    {!user && (
                      <SC.Button
                        onClick={() => setModal("register")}
                        onMouseOver={() => stop()}
                        onMouseOut={() => start()}
                      >
                        Get Started
                      </SC.Button>
                    )}
                    {user && (
                      <SC.Button
                        onClick={() => history.push("/collection")}
                        onMouseOver={() => stop()}
                        onMouseOut={() => start()}
                      >
                        View Collection
                      </SC.Button>
                    )}
                    <a
                      href="https://discord.gg/ppM7jvXUDK"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SC.Discord />
                    </a>
                  </SC.ButtonGroup>
                </SC.HeroBody>
              </CSSTransition>
            </SwitchTransition>
            <SC.HeroImageWrapper>
              <SwitchTransition>
                <CSSTransition
                  key={currentSlide.src}
                  timeout={200}
                  classNames="fade"
                >
                  <SC.Image
                    alt="image of a feature"
                    src={currentSlide.src}
                    onMouseOver={() => stop()}
                    onMouseOut={() => start()}
                  />
                </CSSTransition>
              </SwitchTransition>
            </SC.HeroImageWrapper>
          </SC.Hero.Inner>
          <SC.Hero.Footer onMouseOver={() => stop()} onMouseOut={() => start()}>
            <SC.NavigateButton onClick={handlePrev}>
              <SC.LeftChevron />
            </SC.NavigateButton>
            <SC.NavigateButton onClick={handleNext}>
              <SC.RightChevron />
            </SC.NavigateButton>
          </SC.Hero.Footer>
        </SC.Hero>
      </SC.Container>
    </SC.Wrapper>
  );
};

export default Home;
