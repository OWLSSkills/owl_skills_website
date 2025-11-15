import styles from "./Opening.module.css";

export default function OneDayCourses() {
    return (
        <>
            <section className={styles.section}>
                <div className={styles.inner}>
                    <div className={styles.header}>
                        <div className={styles.tape}>
                            <h2 className={`${styles.title} gloria`}>One Day Courses</h2>
                        </div>
                    </div>

                    <div className={styles.photos}>
                        <figure className={`${styles.polaroid} ${styles.p1}`}>
                            <img
                                src="/courses/One Day Course.png"
                                alt="Students practicing skills outdoors"
                                className={styles.photo}
                            />
                        </figure>


                    </div>

                    {/* Right: body copy */}
                    <div className={`${styles.copy} intervariable`}>
                        <p>
                            Want to feel more confident in wilderness settings but not spend the night?
                            These one day courses will have you walking away with a clear understanding of how to prioritize your needs and drastically
                            improve your odds of getting out of a bad situation intact.  Our One-Day Core Skills is a
                            great introduction to general survival skills, while other one day courses focus on a particular skill in more depth.
                            Want to discover and practice more with navigation, fire, knots, shelter, etc?  Then these are the courses for you!
                        </p>
                        <a
                            href="https://bookings.owlsskills.com/en/category/one-day-courses"
                            className={`background_color_light_green font_color_white call_to_action_button mt-5  ${styles.scaleUpSmall}` }
                        >
                            BOOK YOUR COURSE
                        </a>
                    </div>

                </div>




            </section>
            <div className={styles.skillsBanner}>
                <h2 className="handText justify_self_center">What SKILLS Might You LEARN?</h2>
            </div>


            <section id="skills-poster" className={styles.skillsPoster}>
                <div className={styles.wrap}>
                    <img
                        src="/courses/Oneday_image_nov7.png"
                        alt="Course skills overview: knots, shelter, clothing, knife work, signaling, water, fire, navigation"
                        className={styles.poster}
                        loading="lazy"
                    />

                    {/* ✅ Centered CTA button */}
                    {/* <a
                        href="/courses/oneday"
                        className={`background_color_light_green font_color_white call_to_action_button ${styles.call_to_action_button}`}
                    >
                        BOOK THIS COURSE
                    </a> */}
                </div>
            </section>


        </>
    );
}
