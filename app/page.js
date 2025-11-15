import styles from "./page.module.css";
import HeroLanding from "@/components/Home/Hero_Landing/Hero_Landing";
import CourseOfferings from "@/components/Home/Course_Offerings/CourseOfferings";
import Description from "@/components/Home/Description/Description";
import NewsLetter from "@/components/Home/NewsLetter/NewsLetter";
import SocialIcons from "@/components/Home/Socials/Socials";
import Faq from "@/components/Home/FAQ/Faq";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import ContactForm from "@/components/Home/ContactForm/ContactForm";
export default function Home() {
  return (
    
    <div className={styles.page}>
      <HeroLanding/>
      <CourseOfferings/>
      <Description />
      <NewsLetter />
      <SocialIcons />
      <Faq />
      <Testimonials />
      <ContactForm />
    </div>
  );
}
