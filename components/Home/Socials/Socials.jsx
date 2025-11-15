"use client"
import styles from "./Socials.module.css";


export default function SocialIcons(){
    return(
        <div className={styles.section}>
            <a href="https://www.facebook.com/owls.skills/" >
                <img src="/images/socials/facebook_icon-01.png" alt="facebook" className={`${styles.social_icon} ${styles.size_correction_for_facebook}`}/>
            </a>
            <a href="https://www.instagram.com/owls.skills/">
            <img src="/images/socials/IG.png" alt="Instagram" className={styles.social_icon}/>
            </a>
            <a href="https://www.youtube.com/channel/UCVF10fU-1uK81GIvE9xSdKg">
            <img src="/images/socials/youtube.png" alt="youtube" className={styles.social_icon}/>
            </a>
        </div>
    )
}

