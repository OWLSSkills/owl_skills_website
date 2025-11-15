import styles from './FirstMiniSection.module.css';

export default function FirstMiniSection() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        {/* Tape / title */}
        <svg
          className={styles.tape}
          viewBox="0 0 1440 560"
          aria-labelledby="mission-title"
          role="img"
        >
          <title id="mission-title">Our Mission</title>
          <image
            href="/images/mission/Tape.png"
            x="-165"
            y="-40svh"
            width="3600"
            height="1200"
            preserveAspectRatio="xMinYMin meet"
          />
          <text
            x="103"
            y="230"
            fontSize="130"
            fontWeight="130"
            fill="RGB(90,122,94)"
            transform="rotate(-8 220 330)"
            textLength="830"
            lengthAdjust="spacing"
            className="gloria"
          >
            OUR MISSION
          </text>
        </svg>
      </div>

      {/* Two-column content */}
      <div className={`${styles.wrap} ${styles.content}`}>
        {/* Left: image stack */}
        <div className={styles.stack}>
          <img
            src="/images/mission/mission_pictures1.png"
            alt=""
            className={styles.shot}
          />
        </div>

        {/* Right: lead + paragraph */}
        <div className={styles.copy}>
          <p className={`${styles.leadInline} ${styles.paragraph} intervariable`}>
            <strong>
              To educate and empower women and non-binary folks comfortable in
              women’s spaces, in the skills needed to survive emergencies in any
              environment.
            </strong>
          </p>

          <p className={`${styles.paragraph} intervariable`}>
            <strong>
              At O.W.L.S. Skills we believe in women working together to support
              each other in a safe yet challenging environment. Traditionally,
              wilderness skills have been passed down through men over
              generations; women had different roles. Here, women learn tangible
              skills like fire-making, shelter-building, navigation, etc. and
              participants also cultivate internal qualities such as empowerment
              and confidence. We are stronger together! O.W.L.S. Skills welcomes
              women of all demographics, and can accommodate those with many
              physical challenges as well. Come let your wild self out!
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}
