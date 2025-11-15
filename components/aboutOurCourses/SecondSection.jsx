import styles from './SecondSection.module.css'
export default function SecondSection() {


    return (
        <>
            <div className={`${styles.secondSection}`}>
                <div>
                    <img className={`${styles.circleImage}`} src='./aboutOurCourses/Circle.png' />
                </div>
                <div className={`${styles.buttonContainer}`}>
                    <a href='https://bookings.owlsskills.com/en/category/one-day-courses' className={`background_color_light_green font_color_white ${styles.scaleUpHalf} ${styles.callToActionButton}`}>
                        One Day Survival Courses
                    </a>
                    <a href='https://bookings.owlsskills.com/en/category/weekend-courses' className={`background_color_light_green font_color_white ${styles.scaleUpHalf} ${styles.callToActionButton}`}>
                        Weekend Survival Courses
                    </a>
                    <a href='https://bookings.owlsskills.com/en/category/limited-edition-retreats' className={`background_color_light_green font_color_white ${styles.scaleUpHalf}  ${styles.callToActionButton}`}>
                        Limited Edition Retreats
                    </a>

                </div>
                <div className={`${styles.arrowContainer}`}>
                    <img src='./aboutOurCourses/Arrow_2.png' className={`${styles.arrow2}`} />

                </div>
            </div>
            <div className={styles.paragraphContainer}>
                <p className={`${styles.paragraph} intervariable`}>
                    Most outdoor schools are run by, and cater to, men.
                    Many also waste time teaching people how to live in the wilderness, versus how to get home safely if things take a bad turn.
                    This often leaves folks with the sense that learning survival skills is very hard and only for those that
                    are physically in their prime and preferably male (neither of which is true!).
                </p>
                <br />
                <p className={`${styles.paragraph} intervariable`}>
                    Beautiful and challenging wild places have value for everyone, and creating a supportive, welcoming environment is our goal.
                    So our classes cater to women and other marginalized demographics such as BIPOC and the LGBTQ+ communities.
                    For other demographics please visit JessieKrebs.com to look into our custom courses.
                </p>
            </div>
            <div className={styles.journalWrap}>
                <img
                    src="/aboutOurCourses/papers_background.png"
                    alt="Notebook spread"
                    className={styles.journalImg}
                />

                {/* LEFT column – questions only */}
                <div className={styles.questionsCol}>
                    <p className='gloria'>Wilderness make you nervous?</p>
                    <p className='gloria'>Wondered what to do in a remote emergency? </p>
                    <p className='gloria'>Felt intimidated or insulted by "mansplaining"?</p>
                    <p className='gloria'>Want to become less gear-dependent and learn skills to lighten your pack/gear?</p>
                    <p className='gloria'>Think you’re paying too much for outdoor gear?</p>
                </div>

                {/* RIGHT column – answers only */}
                <div className={styles.answersCol}>
                    <p className='gloria'>Current world events got you worried?</p>
                    <p className='gloria'>Looking for connection with like-minded women? </p>
                    <p className='gloria'>Want to feel more confident? </p>
                    <p className='gloria'>Inspired to get into outdoor activities, but not sure where to start? </p>
                    <p className='gloria'>Want to learn about survival skills AND have a fun and meaningful experience?</p>
                </div>
            </div>



        </>
    )
}

