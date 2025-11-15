'use client'

import Image from 'next/image'
import styles from './LimitedEdition.module.css'

export default function WeekendCoursePage({
}) {
    return (
        <main >
 <section className={styles.limited}>
  {/* tape title (PNG contains the text) */}
  <div className={styles.title}>
    <Image
      src="/images/limited-edition/tape.png"
      alt="Limited Edition Retreats"
      width={1100}
      height={330}
      priority
    />
  </div>

  {/* content row: photo (left) | copy (right) */}
  <div className={styles.row}>
    {/* Left: combined photo (no tilt) */}
    <figure className={styles.photo}>
      <Image
        src="/images/limited-edition/Limited_edition_picture.png"  /* <-- put your combined image here */
        alt="Limited Edition Retreats collage"
        fill
        sizes="(max-width: 900px) 92vw, 520px"
        style={{ objectFit: 'contain' }}  /* keep whole collage visible */
        priority
      />
    </figure>

    {/* Right: two paragraphs + CTA */}
    <div className={styles.copy}>
      <p className='intervariable'>
        Immerse yourself in a multi-day course and let the modern world drift away.
        Here you have time to really drop in—with each other, our surroundings,
        and the skills and concepts. Each of these courses is unique and may be held
        anywhere in the world. They may be lighthearted and breezy; focus on skills and
        concepts; test your physical mettle; help you reconnect with your sense of purpose;
        connect you with others and the earth in meaningful ways; etc. "Outside your comfort zone is the only place worth living" <span class="no-break">- Karina Bliss</span>.
      </p>

      <p className='intervariable'>
        All retreats will incorporate learning practical survival skills as part of the curriculum.
        We may backpack, stay grounded in projects at a base camp, or a combination of both.
        Some courses will be for all demographics, most will be for women only, and occasionally
        they will happen in collaboration with other amazing humans that excel in their work
        and teachings.
      </p>
        <div >

        <a
                            href="https://bookings.owlsskills.com/en/category/limited-edition-retreats"
                            className={`background_color_light_green font_color_white call_to_action_button mt-2 justify_self_center`}
                        >
                           Take a Look at Current Retreat
                        </a>
      </div>

    </div>
  </div>
</section>
<div className={styles.skillsBanner}>
                <h2 className="handText justify_self_center">What SKILLS Might You LEARN?</h2>
            </div>

            <div className={styles.skillsImageWrap}>
                <div className={styles.skillsImageWrap}>
                    <div className={styles.skillsImageInner} style={{ ['--scale']: 1.75, ['--yOffset']: '0%' }}>
                        <Image
                            src="/images/limited-edition/Limited_image_nov7.png"
                            alt="Overview of skills learned at OWLS Limited Edition Retreats"
                            fill
                            sizes="100vw"
                            className={styles.skillsImage}
                            priority
                        />
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>


        </main>
    )
}

/** Little tape sticker helper (optional image, CSS fallback) */
function Tape({ tapeSrc, pos = 'top-left' }) {
    return tapeSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={tapeSrc} alt="" className={`${styles.tape} ${styles[`tape--${pos}`]}`} aria-hidden="true" />
    ) : (
        <span className={`${styles.tape} ${styles[`tape--${pos}`]}`} aria-hidden="true" />
    )
}


