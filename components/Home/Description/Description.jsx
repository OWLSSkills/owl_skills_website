import styles from './Description.module.css';
import Link from 'next/link';

export default function Description() {

    return (
            <div className={styles.first_sub_section}>
                <img src='/images/IMG_1720.jpg' alt='Description Banner' className={styles.description_and_faq_image}/>
                <div className={styles.description_text}>
                    <h2 className={styles.subTitle}>OUTDOOR SKILLS<br/> FOR WOMEN <br/> BY WOMEN</h2>
                    <p className={`${styles.paragraph} intervariable`}>To educate and empower women and other under represented demographics in the skills of surviving emergency situations in all envrionments.</p>

                    <div className={styles.button_container}>
                        <Link href={'./mission'} className={`background_color_light_green font_color_white call_to_action_button btnLink`}>
                            LEARN MORE
                        </Link>
                        <Link className='btnLink' href='./about_courses'>
                            <button className={`background_color_light_green font_color_white call_to_action_button`}>
                                COURSES
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
            


            

    )
}





