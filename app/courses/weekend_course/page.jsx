'use client'

import Image from 'next/image'
import WeekendCourseDetails from '@/components/weekendCourseDetails/WeekendCourseDetails.jsx'
import styles from './WeekendCourse.module.css'

export default function WeekendCoursePage({
}) {
    return (
        <main >
            <section className={styles.ws}>
                {/* tape title: text is baked into the PNG */}
                <div className={styles.ws__title}>
                    <Image
                        src="/images/utility/Weekend_Survival_Tape.png"
                        alt="Weekend Survival Courses"
                        width={1100}             // natural-ish size; Next/Image will downscale
                        height={330}
                        priority
                    />
                </div>

                {/* content row */}
                <div className={styles.ws__row}>
                    <div className={styles.ws__copy}>
                        <p className='intervariable'>
                            Spend up to three days and two nights outside 
                            learning skills and sleeping
                            under the stars.
                            Following our challenge by choice philosophy, overnight camping is optional but strongly encouraged.
                             Perfect for those seeking more hands-on practice and
                            coaching, we accommodate you no matter your level, from beginner to
                            advanced. We’ll have lectures,
                            demonstrations, and student practices in a friendly, supportive
                            learning environment.
                        </p>
                    </div>

                    <figure className={styles.ws__photo}>
                        <Image
                            src="/images/weekend_course/weekend_picture1.png"
                            alt="Group at base camp"
                            fill
                            sizes="(max-width: 900px) 92vw, 520px"
                            style={{ objectFit: "cover" }}
                        />
                    </figure>
                </div>
            </section>
            <WeekendCourseDetails />
            <div style={{width: '100vw', justifyContent: 'center', justifyItems: 'center', display: 'grid', marginTop: '3rem'}}>

            <a
                            href="https://bookings.owlsskills.com/en/category/weekend-courses"
                            className={`background_color_light_green font_color_white call_to_action_button mt-2 justify_self_center scale-up-small `}
                        >
                            FIND YOUR COURSE
                        </a>
                        </div>

            <div className={styles.skillsBanner}>
                <h2 className="handText justify_self_center">What SKILLS Might You LEARN?</h2>
            </div>
            <div className={styles.skillsImageWrap}>
                <div className={styles.skillsImageWrap}>
                    <div className={styles.skillsImageInner} style={{ ['--scale']: 1.5, ['--yOffset']: '-6%' }}>
                        <Image
                            src="/images/weekend_course/weekend_image_nov7.png"
                            alt="Overview of skills learned at OWLS Weekend Course"
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

/** Leaf + duct tape stack (CSS-only fallback) */
function LeafDuctTape() {
    return (
        <div className={styles.leafWrap} aria-hidden="true">
            <div className={styles.leaf} />
            <div className={styles.duct} />
        </div>
    )
}
