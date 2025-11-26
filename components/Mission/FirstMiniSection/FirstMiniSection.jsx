import styles from './FirstMiniSection.module.css';

export default function FirstMiniSection() {
  return (
    <section className={styles.section}>
  <div className={styles.wrap}>
  <svg
  className={styles.tape}
  viewBox="0 0 1440 560"
  aria-labelledby="mission-title"
  role="img"
>
  <title id="mission-title">Our Mission</title>

  {/* Tape Image */}
  <image
    href="/images/mission/Tape.png"
    x="0"
    y="0"
    width="1440"
    height="560"
    preserveAspectRatio="xMidYMid slice"
  />

  {/* Centered Text */}
  <text
    x="50%"
    y="50%"
    dominantBaseline="middle"
    textAnchor="middle"
    className={`${styles.tapeText} gloria`}
    transform="rotate(-6 720 280)"   
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
              To educate and empower women and nonbinary folks comfortable in
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
