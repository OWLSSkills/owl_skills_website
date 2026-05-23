import styles from './CourseOfferings.module.css'

export default function CourseOfferings() {
    return (
        <div id="courses" className={styles.section}>
            <div className={styles.first_sub_section}>

                <figure
                    className={styles.boardWrap}
                    style={{
                        "--btn-left": "10%",
                        "--btn-top": "55.0%",
                        "--btn-width": "28%",
                        "--text-left": "11%",
                        "--text-right": "16%",
                        "--text-top": "5.5%",
                    }}
                >
                    <img
                        src="/images/bubble_board/Bubble_1.png"
                        alt="One day survival course"
                        className={styles.course_offerings_image}
                    />

                    <div className={styles.boardText}>
                        <h3>One Day Survival Course</h3>

                        <p>
                            We offer a variety of courses in our one-day format, from a core class
                            &#40;a great introduction to basic survival principles and how they
                            interrelate&#41; to a variety of courses that focus on a particular skill
                            in more depth, i.e. sheltercraft, firecraft, navigation, knots, trapping,
                            etc.
                        </p>

                        <p>
                            No crawling in the mud or silent suffering; we aren’t a military boot camp!
                            Get the info without the attitude.
                        </p>
                    </div>

                    <a
                        href="/courses/one-day"
                        className={`background_color_light_green font_color_white call_to_action_button ${styles.overlayBtn}`}
                        aria-label="Book your one-day survival course"
                    >
                        BOOK YOUR COURSE
                    </a>
                </figure>
                <figure
                    className={styles.boardWrap}
                    style={{
                        "--btn-left": "36%",
                        "--btn-top": "52.0%",
                        "--btn-width": "28%",
                        "--text-left": "20%",
                        "--text-right": "9%",
                        "--text-top": "6.5%",
                    }}
                >
                    <img src='/images/bubble_board/Bubble_2.png' alt='Weekend Survival Course' className={`${styles.course_offerings_image}`} />
                    <div className={styles.boardText}>
                        <h3>Weekend Survival Course</h3>

                        <p>
                            This course is perfect for folks that have the time and the interest to get more hands-on training.
                            This weekend course is mentally intense with long days packed with information and skills practice
                            in a base-camp model. Activity level is usually mild depending on the course focus. Some weekend courses
                            include overnight camping and dinners around the fire, others are 9–5 only.
                        </p>

                    </div>
                    <a href="/courses/weekend_course"
                        className={`background_color_light_green font_color_white call_to_action_button ${styles.overlayBtn}`}
                        aria-label="Book your one-day survival course">
                        FIND YOUR COURSE
                    </a>
                </figure>
                <figure
                    className={styles.boardWrap}
                    style={{
                        "--btn-left": "34%",
                        "--btn-top": "42.0%",
                        "--btn-width": "28%",
                        "--text-left": "11%",
                        "--text-right": "16%",
                        "--text-top": "6.5%",
                    }}
                >
                    <img src='/images/bubble_board/Bubble_3.png' alt='Course Offerings Banner' className={styles.course_offerings_image} />

                    <div className={styles.boardText}>
                        <h3>Limited Edition Retreat</h3>

                        <p>
                            Come immerse yourself in a variety of multi-day courses. We have the time to really drop in, with each other,
                            our surroundings, and the skills and concepts. Each of these courses is unique and may be held anywhere around the country!
                        </p>

                    </div>
                    <a href="/courses/limited-edition"
                        className={`background_color_light_green font_color_white call_to_action_button shift-left-15 ${styles.overlayBtn}`}
                        aria-label="Book your one-day survival course">
                        CHOOSE YOUR ADVENTURE
                    </a>
                </figure>
            </div>

            <div className={styles.second_sub_section}>
                <figure
                    className={styles.boardWrapBottom}
                    style={{
                        "--btn-left": "10%",
                        "--btn-top": "40.0%",
                        "--btn-width": "28%",
                    }}
                >
                    <img
                        src="/images/Cutom_private_courses.png"
                        alt="Course Offerings Banner"
                        className={styles.course_offerings_image_bottom}
                    />

                    <a
                        href="https://jessiekrebs.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`background_color_light_green font_color_white call_to_action_button ${styles.overlayBtn}`}
                        style={{ "--btn-left": "25%", "--btn-top": "63.0%" }}
                        aria-label="Visit Jessie Krebs website"
                    >
                        Learn More
                    </a>
                </figure>
            </div>
        </div>
    )
}
// https://bookings.owlsskills.com/en/category/custom-courses



