import styles from './CourseOfferings.module.css'

export default function CourseOfferings(){
    return(
        <div id="courses" className={styles.section}>
            <div className={styles.first_sub_section}>
                
                <figure className={styles.boardWrap} style={{
                    // tweak these three numbers to line it up perfectly
                    // (percentages are relative to the image's width/height)
                    '--btn-left': '10%',   // x from the left edge
                    '--btn-top':  '55.0%',  // y from the top edge
                    '--btn-width':'28%',    // width of the button area
                    }}>
                    <img
                        src="/images/oneDay_nov7.png"   // use the duplicate WITHOUT the printed button
                        alt="One day survival course"
                        className={styles.course_offerings_image}
                    />

                    <a href="/courses/one-day"
                        className={`background_color_light_green font_color_white call_to_action_button ${styles.overlayBtn}`}
                        aria-label="Book your one-day survival course">
                        BOOK YOUR COURSE
                    </a>
                </figure>                
                <figure className={styles.boardWrap} style={{
                    // tweak these three numbers to line it up perfectly
                    // (percentages are relative to the image's width/height)
                    '--btn-left': '36%',   // x from the left edge
                    '--btn-top':  '52.0%',  // y from the top edge
                    '--btn-width':'28%',    // width of the button area
                    }}>
                <img src='/images/weekend_nov7.png' alt='Weekend Survival Course' className={`${styles.course_offerings_image}`}/>
                <a href="/courses/weekend_course"
                        className={`background_color_light_green font_color_white call_to_action_button ${styles.overlayBtn}`}
                        aria-label="Book your one-day survival course">
                        FIND YOUR COURSE
                    </a>
                </figure>  
                <figure className={styles.boardWrap} style={{
                    // tweak these three numbers to line it up perfectly
                    // (percentages are relative to the image's width/height)
                    '--btn-left': '34%',   // x from the left edge
                    '--btn-top':  '42.0%',  // y from the top edge
                    '--btn-width':'28%',    // width of the button area
                    }}>
                <img src='/images/Limted_nov7.png' alt='Course Offerings Banner' className={styles.course_offerings_image}/>
                <a href="/courses/limited-edition"
                        className={`background_color_light_green font_color_white call_to_action_button shift-left-15 ${styles.overlayBtn}`}
                        aria-label="Book your one-day survival course">
                        CHOOSE YOUR ADVENTURE
                    </a>
                </figure>  
            </div>
            <div className={styles.second_sub_section}>
                <img src='/images/Cutom_private_courses.png' alt='Course Offerings Banner' className={`${styles.course_offerings_image_bottom}  `}/>
            </div>
        </div>
    )
}



