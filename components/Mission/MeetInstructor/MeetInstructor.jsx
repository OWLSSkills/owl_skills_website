import styles from "./MeetInstructor.module.css"

export default function MeetInstructor(){
    return(<div className={styles.section}>
        <img src="/images/mission/MeetJessie.png" alt="Jessie, the founder of OWLS Skills, smiling in a forested area."   className={styles.meetJessie}        />
    
        <div className={styles.content}>
            <div>
                <p className={`${styles.paragraph} intervariable`}>
                I (Jessie) joined the US Air Force as a way to pay for college and to escape my small midwest town. During active duty I went from a shy and hesitant girl to one of the few female S.E.R.E. (survival, evasion, resistance, and escape) specialists, teaching military members how to stay alive and return home if shot down behind enemy lines.  In that career I also gained a sense of competence and a deeper connection to the outdoors. I got through childhood trauma by the support of the natural world: the wilderness was a familiar and safe place that held me when people felt untrustworthy, so SERE training felt natural. <br/>After my honorable discharge, I directed team building courses and then found a home for over a decade working in wilderness therapy. There I learned to listen to my heart again and reconnect to the magic moving through all things. In the last decade I’ve been honored to participate in some pretty epic journeys and programming on television and online education like ALONE S-9, Mygrations, and MasterClass.com as well as various articles and podcasts.  I teach from the heart and adapt to each client, moving between nurturing and supportive to pushy cheerleader as needed!
                </p>

            </div>
            <div className={styles.image_container}>
                <img src="/images/mission/mission_pictures2.png" alt="mission images" className={styles.mission_image}/>
            </div>
        </div>
    
    
    </div>)
}


