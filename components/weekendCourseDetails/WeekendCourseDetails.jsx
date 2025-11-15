'use client'

import Image from 'next/image'
import styles from './WeekendCourseDetails.module.css'

export default function WeekendCourseDetails() {
  return (
    // spans both columns of the parent .wrap grid
    <section className={styles.section}>
      <div className={styles.row}>
        {/* Photos (left) */}
        <div className={styles.stack}>
          <figure className={`${styles.card} ${styles.top}`}>
            <Image
              src="/images/weekend_course/weekend_picture3.png"
              alt="Student relaxing at camp shelter"
              fill
              sizes="(max-width: 900px) 92vw, 520px"
              style={{ objectFit: 'cover' }}
            />
          </figure>

          <figure className={`${styles.card} ${styles.bottom}`}>
            <Image
              src="/images/weekend_course/weekend_picture4.png"
              alt="Group photo by the water during autumn"
              fill
              sizes="(max-width: 900px) 92vw, 520px"
              style={{ objectFit: 'cover' }}
            />
          </figure>
        </div>

        {/* Copy (right) */}
        <div className={styles.copy}>
          <p className='intervariable'>
            Evenings on our overnight courses are spent cooking and eating dinner around the fire, followed by more
            discussion and lessons. S’mores and dinners are included!
          </p>
          <p className='intervariable'>
            At O.W.L.S. Skills we endeavor to create a safe and supportive learning space
            specifically for women and non-binary folks comfortable in women-only spaces.
            Occasionally we offer all-inclusive general-admission classes where all genders
            are welcome. Our classes are intended to help people feel more confident and
            empowered while connecting tangibly with the land through skills and knowledge.
          </p>
          <p className='intervariable'>
            The wilderness welcomes all, and we endeavor to meet each student where they are
            in their journey. We can adapt many classes for folks with a variety of physical
            challenges. Please feel free to reach out with any questions or concerns.
          </p>
        </div>
      </div>
    </section>
  )
}
