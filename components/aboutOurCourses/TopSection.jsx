
import styles from './TopSection.module.css'

export default function TopSection() {
    return (
        <>
                    <div className={`${styles.topSection}`}>
                <div className={styles.headerAndPhotos}>

                    <div className={styles.header}>
                        <div className={styles.tape}>
                            <h2 className={`${styles.title} gloria`}>About Our Courses</h2>
                        </div>
                    </div>        
                    <div className={`${styles.container}`}>

                        <img src='/aboutOurCourses/Our_course_top_pictures.png' className={`${styles.introPhotos}`} />
                    </div>


                </div>

                <div className={`${styles.arrowAndButton}`}>

                    <img className={`${styles.arrow1}`} src={'/aboutOurCourses/Arrow_1.png'} />
                    <div className={styles.buttonContainer}>

                        <a href='https://bookings.owlsskills.com' className={`background_color_light_green font_color_white call_to_action_button ${styles.scaleUpHalf} ${styles.callToActionButton}`}>
                            Choose Your Next Adventure
                        </a>
                    </div>

                </div>


            </div>
        </>
    )
}