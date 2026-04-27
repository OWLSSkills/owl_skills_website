'use client';

import Image from "next/image";

const opportunities = [
    {
        name: "Rebecca Wildbear",
        description: "Author, yoga and spirit guide",
        imageSrc: "/images/other_opportunities/Rebecca.png",
        imageAlt: "Rebecca Wildbear",
        link: "https://www.rebeccawildbear.com/"
    },
    {
        name: "HeatherAsh Amara",
        description: "Author, spirit guide, fire walker",
        imageSrc: "/images/other_opportunities/HeatherAsh.png",
        imageAlt: "HeatherAsh Amara",
        link: "https://heatherashamara.com/"
    },
    {
        name: "Natural Curiosity",
        description: "Educational programs, hunting trips, birding, etc...",
        location: "Hermosa, NM",
        imageSrc: "/images/other_opportunities/Natural_curiosity.png",
        imageAlt: "Natural Curiosity logo",
        link: "https://www.natural-curiosity.org/"
    },
    {
        name: "Camp Pollok",
        description: "Conservation and education center",
        location: "Sacramento, CA",
        imageSrc: "/images/other_opportunities/sacramento_valley.png",
        imageAlt: "Camp Pollok logo",
        link: "https://sacramentovalleyconservancy.org/camp-pollock/"
    },
    {
        name: "Uncharted Outdoorswoman",
        description: "Women's hunting, fishing, and other outdoor skills",
        location: "Denver, CO",
        imageSrc: "/images/other_opportunities/uncharted.png",
        imageAlt: "Uncharted Outdoorswoman logo",
        link: "https://unchartedoutdoorswomen.com/"
    },
    {
        name: "Women's Wilderness",
        description: "Nonprofit outdoor skills and activities for girls and women",
        location: "Boulder, CO",
        imageSrc: "/images/other_opportunities/women_wilderness.png",
        imageAlt: "Women's Wilderness logo",
        link: "https://womenswilderness.org/"
    },
    {
        name: "Mud City Adventures",
        description: "Kid's camp and custom outdoor programs",
        location: "Stowe, VT",
        imageSrc: "/images/other_opportunities/mud-city-adventures-logo.png",
        imageAlt: "Mud City Adventures logo",
        link: "https://mudcityadventures.com/"
    },
];

export default function OtherLearningOpportunities() {
    return (
        <section className="wrapper" aria-labelledby="other-learning-opportunities-heading">
            <div className="contentCard">
                <div className="tapeWrapper">
                    <div className="tapeTitle">
                        <div className="tape">
                            <Image
                                src="/images/mission/tape_4.png"
                                alt=""
                                fill
                                priority
                                aria-hidden="true"
                                className="tapeImage"
                                sizes="(max-width: 700px) 92vw, 700px"
                            />
                        </div>

                        <h2 id="other-learning-opportunities-heading" className="tapeText">
                            Other Learning Opportunities
                        </h2>
                    </div>
                </div>

                <div className="list" role="list">
                    {opportunities.map((item) => (
                        <article key={item.name} className="row" role="listitem">
                            <div className="imageWrap">
                                <Image
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    fill
                                    sizes="(max-width: 700px) 62px, (max-width: 1200px) 14vw, 120px"
                                    className="logo"
                                    onClick={() => window.open(item.link)}
                                    style={{ cursor: "pointer" }}

                                />
                            </div>

                            <div className="textBlock">
                                <h3
                                    onClick={() => window.open(item.link)}
                                    style={{ cursor: "pointer" }}
                                >{item.name}
                                </h3>
                                <p>{item.description}</p>
                                {item.location ? <p>{item.location}</p> : null}
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 40px 20px 56px;
          background: #efefef;
        }

        .contentCard {
          width: min(100%, 660px);
          position: relative;
        }

        .tapeWrapper {
          margin-left: 10px;
          margin-bottom: 14px;
        }

        .tapeTitle {
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: fit-content;
          max-width: 100%;
          margin: 0 auto;
          padding: clamp(0.5rem, 1vw, 0.85rem) clamp(2rem, 5vw, 4.5rem);
        }

.tape {
  position: absolute;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%) rotate(-1.5deg);
  z-index: 0;
  width: calc(100% + clamp(20px, 5vw, 70px));
  aspect-ratio: 700 / 300;
  pointer-events: none;
}

        .tapeImage {
          object-fit: fill;
        }

        .tapeText {
          position: relative;
          z-index: 1;
          margin: 0;
          display: block;
          font-size: clamp(1.75rem, 5vw, 3.6rem);
          line-height: 1.08;
          font-weight: 500;
          color: #1e1e1e;
          letter-spacing: 0.01em;
          font-family: "Comic Sans MS", "Marker Felt", "Chalkboard SE", cursive;
          text-align: center;
        }

        .list {
          background: #f7f7f7;
          border: 1px solid #d8d8d8;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02);
          padding: 20px 30px 20px 26px;
        }

        .row {
          display: grid;
          grid-template-columns: 112px 1fr;
          gap: 20px;
          align-items: center;
        }

        .row + .row {
          margin-top: 22px;
        }

        .imageWrap {
          position: relative;
          width: clamp(72px, 14vw, 120px);
          aspect-ratio: 1 / 1;
          height: auto;
          flex-shrink: 0;
          justify-self: start;
        }

        .logo {
          object-fit: contain;
        }

        .textBlock {
          color: #111;
          line-height: 1.2;
        }

        .textBlock h3 {
          margin: 0 0 3px;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .textBlock p {
          margin: 0;
          font-size: 1.22rem;
          font-weight: 500;
        }

        .textBlock p + p {
          margin-top: 2px;
        }

        @media (max-width: 700px) {
          .wrapper {
            padding: 28px 14px 40px;
          }

          .tapeWrapper {
            margin-left: 0;
          }

          .tapeTitle {
            padding: 0.35rem clamp(1rem, 4vw, 1.5rem);
          }

          .tape {
            width: calc(100% + clamp(26px, 8vw, 56px));
          }

          .tapeText {
            font-size: clamp(1.5rem, 8vw, 2.4rem);
          }

          .list {
            padding: 18px 18px 18px 16px;
          }

          .row {
            grid-template-columns: clamp(62px, 16vw, 72px) 1fr;
            gap: 14px;
            align-items: start;
          }

          .row + .row {
            margin-top: 18px;
          }

          .textBlock h3 {
            font-size: 1rem;
          }

          .textBlock p {
            font-size: 0.92rem;
          }
        }
      `}</style>
        </section>
    );
}