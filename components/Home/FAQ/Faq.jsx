import styles from "./Faq.module.css";


export default function FaqBox() {
    const items = [
        {
            q: "What is the class size?",
            a: (
                <p>
                    Our OWLS core courses require a minimum of 5 and a maximum of 20 participants.
                    Specialty and weekend courses are capped at between 8 and 12 folks depending on the topic (knot craft, fire craft, navigation, etc...)
                    Custom courses can be any size desired.
                </p>
            ),
        },
        {
            q: "What are the dates and times?",
            a: (
                <>
                    <ul>
                        <li>Single-day classes: <strong>9:00 AM – 5:00 PM</strong> unless otherwise noted.</li>
                        <li>
                            Weekend classes: <strong>5:00 PM – 5:00 PM two days later</strong>
                            &nbsp;(typically Fri 5:00 PM → Sun 5:00 PM) unless otherwise noted (eg: in the winter we may start and end at 4 PM).
                        </li>
                        <li>
                            Limited-edition retreats: usually start/end in the early afternoon to allow
                            for travel.
                        </li>
                        <li>Custom courses: begin and end whenever you want.</li>
                    </ul>
                    <p>Click the “Book Now” button to see available dates for upcoming courses.</p>
                </>
            ),
        },
        {
            q: "What should I bring/wear?",
            a: (
                <>
                    <p>
                        Each course is unique based on location, length, and current environmental factors.
                        You’ll receive a detailed email with required and optional gear{" "}
                        <strong>1, 2, or 4 weeks before</strong> your class depending on its length
                        (one-day: 1 week out; weekend: 2 weeks; week-long: 4 weeks).
                    </p>
                    <p>
                        Each course page has a generic packing list to help you prepare. Here is a sample list
                        for a one-day course:
                    </p>
                    <h4>Required</h4>
                    <ul>
                        <li>
                            Closed-toed shoes (hiking/tennis shoes in warm weather; insulated,
                            waterproof boots in winter/cold areas)
                        </li>
                        <li>Long pants</li>
                        <li>Sun hat</li>
                        <li>Long-sleeve shirt</li>
                        <li>
                            Warm layers (including warm hat and gloves, depending on season)
                        </li>
                        <li>Rain gear</li>
                        <li>Large full water bottle + extra water</li>
                        <li>Lunch and snacks</li>
                    </ul>
                    <h4>Optional</h4>
                    <ul>
                        <li>Sunscreen</li>
                        <li>Sunglasses</li>
                        <li>Bug spray (seasonal)</li>
                        <li>Camp chair / Crazy Creek / sit pad</li>
                        <li>Note-taking materials</li>
                        <li>Leather gloves</li>
                        <li>
                            Knife to practice sharpening with (a kitchen knife is fine if you don’t
                            have a “survival” or pocket knife yet)
                        </li>
                        <li>
                            Any survival-related gear you have questions about or want advice on
                        </li>
                    </ul>
                </>
            ),
        },
        {
            q: "Where are the classes held?",
            a: (
                <p>
                    All one- and two-day courses are within a one-hour drive of the listed city.
                    Limited-edition retreats may be more remote. Specific directions and location
                    details are emailed after registration (1–4 weeks before your course date).
                </p>
            ),
        },
        {
            q: "What are the age requirements?",
            a: (
                <>
                    <ul>
                        <li>One- to three-day courses: recommended minimum age <strong>10</strong>.</li>
                        <li>Week-long courses: recommended minimum age <strong>15</strong>.</li>
                        <li>
                            All students <strong>17 or younger</strong> need parental/guardian
                            permission; students <strong>15 and under</strong> must be accompanied by a
                            parent/guardian.
                        </li>
                        <li>
                            Children under 10 may attend with an adult but may not be able to absorb all the skills and concept.  
                            If they are disruptive, they may be asked to step away with the adult.
                        </li>
                    </ul>
                    <p>
                        For a course specifically designed for kids, we recommend booking a private
                        course.
                    </p>
                </>
            ),
        },
        {
            q: "What is your cancellation policy?",
            a: (
                <>
                    <p>
                        Full refund (minus processing fees) if you cancel at least{" "}
                        <strong>28 days</strong> before your course date.
                    </p>
                    <p>For cancellations within 28 days, depending on the situation we may:</p>
                    <ul>
                        <li>Move your reservation to a similar upcoming course with openings,</li>
                        <li>Provide credit toward any future class,</li>
                        <li>Offer a partial or full refund (minus processing fees), or</li>
                        <li>No refund (generally for no-shows).</li>
                    </ul>
                </>
            ),
        },
        {
            q: "Can my male-identifying relative or friend come?",
            a: (
                <p>
                    Short answer: No.  Most of our courses are designed for women and nonbinary folks comfortable in
                    women-only spaces. Occasionally we offer “All-Inclusive” classes open to all
                    demographics—these are labeled <strong>All-Inclusive</strong> on the calendar
                    and booking screen.
                </p>
            ),
        },
        {
            q: "What is your COVID policy?",
            a: (
                <ul>
                    <li>We follow current state guidelines where we teach.</li>
                    <li>Most general-admission classes are outdoors; handwashing and sanitizer provided.</li>
                    <li>Masks are optional—please respect 6’ distancing for those who prefer it.</li>
                    <li>
                        We do not check vaccination status unless required by law; our staff are
                        vaccinated.
                    </li>
                    <li>Your comfort matters—reach out with any questions or concerns.</li>
                </ul>
            ),
        },
        {
            q: "I have a physical challenge (vision, hearing, movement, etc.). May I still attend?",
            a: (
                <>
                    <p>
                        Working with marginalized demographics is our specialty. Most one and
                        two-day courses are easily modified for a wide variety of special needs because 
                        we stay at a base camp and do not engage in strenuous activities.
                    </p>
                    <p>
                        Many skills are adaptable, please let us know your needs and share any additional instructions in advance so we can
                        better prepare.
                    </p>
                </>
            ),
        },
        {
            q: "What will I need to bring for overnight courses?",
            a: (
                <>
                    <p>
                        You provide personal gear; we provide teaching aids (knives, compasses,
                        maps, signal mirrors, fire-starting materials, etc.). Two to four weeks
                        before the course you’ll receive parking and driving directions, expected weather, a packing
                        list tailored to local conditions, a request for pertinent medical/dietary information, and so on.
                    </p>
                    <h4>What to pack and wear</h4>
                    <p>
                        We usually spend weekends or the first couple of days of a longer trip close to our vehicles, so bring what you need to be
                        comfortable. If you’re unsure about an item, bring it; if you lack an item,
                        ask, we may have loaners or alternatives.
                    </p>
                    <ul>
                        <li>A good pair of hiking boots</li>
                        <li>
                            Long pants (durable—cargo pants with lots of pockets are most useful)
                        </li>
                        <li>Long-sleeve shirt (an extra t-shirt is fine)</li>
                        <li>Sun hat</li>
                        <li>Rain/wind gear</li>
                        <li>
                            At least <strong>2 liters</strong> of water storage (bottles or bladders)
                        </li>
                        <li>Bowl/cup and spoon or fork</li>
                        <li>
                            All necessary personal meds and health aids (back/knee supports, inhalers,
                            EpiPen, etc.)—ideally enough for <strong>2×</strong> the course length
                        </li>
                        <li>
                            Warm layers such as:
                            <ul>
                                <li>Warm hat</li>
                                <li>Neck gaiter(s)</li>
                                <li>Gloves (fingerless and/or regular) and/or mittens</li>
                                <li>Fleece, wool, or other insulating layer (top and/or bottom)</li>
                            </ul>
                        </li>
                        <li>Two extra pairs of socks (one thick and loose pair just for sleeping)</li>
                        <li>One extra set of underclothes</li>
                        <li>
                            Durable food bag with your lunches, breakfasts, and snacks
                            (dinners provided)
                        </li>
                        <li>Headlamp/flashlight with spare batteries or recharging method</li>
                        <li>Sleeping bag/system (rated for anticipated temps)</li>
                        <li>Sleeping bag liner (a full-size or larger fitted bedsheet works well 
                            and has many uses, flannel in winter is amazing!)</li>
                        <li>
                            Insulation pad (non-inflatables preferred; we have plenty if you want to borrow one)
                        </li>
                        <li>
                            Weather cover (tarp or tent). If bringing a tarp, also bring ~50 ft of
                            strong line (military grade paracord). To save time cut and prep lines to the following lengths:
                            <ul>
                                <li>1 × 20–25 ft</li>
                                <li>1 × 10–12 ft</li>
                                <li>4 × 5–6 ft 
                                    For a total of six lines)</li>
                            </ul>
                            We’ll teach you how to pitch a solid shelter!
                        </li>
                        <li>
                            Toiletries as desired (toothpaste/brush, comb, hair ties, feminine
                            products, lip balm, sunscreen, lotion, etc.)
                        </li>
                    </ul>
                    <h4>Optional items</h4>
                    <ul>
                        <li>
                            Extra drinking water if you prefer not to treat wild water (3–4 gallons
                            per person is plenty for a weekend)
                        </li>
                        <li>
                            Knife and/or multitool (loaners available)
                        </li>
                        <li>
                            Knives for sharpening practice (kitchen knives are fine; wrap if no
                            sheath)
                        </li>
                        <li>
                            Survival gear you’d like to practice with (maps, compasses, fire starters,
                            shelter pieces, bought survival/medical kits, etc.)
                        </li>
                        <li>Face mask and hand sanitizer</li>
                        <li>Sunscreen</li>
                        <li>Watch</li>
                        <li>Sunglasses / safety glasses</li>
                        <li>Leather gloves</li>
                        <li>Stove and fuel bottles</li>
                        <li>Camp shoes</li>
                        <li>Trekking poles</li>
                        <li>Metal cup/bowl for heating water</li>
                        <li>Coffee/tea / water flavorings</li>
                        <li>Bug spray and/or mosquito netting</li>
                        <li>Camp chair / Crazy Creek / sit pad (sit pads also provided)</li>
                        <li>Note-taking materials</li>
                        <li>Bivy sack and/or ground tarp</li>
                        <li>Water disinfection systems/filters you want to try</li>
                        <li>Extra cordage/rope for various tasks</li>
                    </ul>
                    <p>Please reach out if you have any question on what to bring!</p>
                </>
            ),
        },
        {
            q: 'What is a "typical" course day like?',
            a: (
                <ul>
                    <li>8:00 AM — Breakfast</li>
                    <li>9:00 AM — Class time</li>
                    <li>1:00 PM — Lunch</li>
                    <li>1:30 PM — Class time</li>
                    <li>6:00 PM — Dinner</li>
                    <li>7:30 PM — Class time</li>
                    <li>10:00 PM — Free time & sleep</li>
                </ul>
            ),
        },
        {
            q: "Can I bring my dog?",
            a: (
                <>
                    <p>
                        Sometimes—this depends on the dog and the other participants. We ask the
                        whole group first; if even <strong>one</strong> student is uncomfortable,
                        dogs aren’t allowed on that course.
                    </p>
                    <h4>Dog requirements</h4>
                    <ul>
                        <li>No chasing wildlife</li>
                        <li>No getting into food</li>
                        <li>No nuisance barking</li>
                        <li>No nipping people or other dogs</li>
                    </ul>
                    <p>
                        You’re responsible for your pet’s behavior. If you miss parts of the course
                        or must leave to relocate the dog, that’s on you.
                    </p>
                    <p>
                        Historically, about 80-90% of dog-allowed courses have gone smoothly. If you think
                        your dog is a good fit, contact us and we’ll check in with the other participants 
                        enrolled in the course you're going on.
                    </p>
                </>
            ),
        },
        {
            q: "What do I need to do before the course?",
            a: (
                <ul>
                    <li>Pay your course balance.</li>
                    <li>Sign your online waiver in the Customer Portal.</li>
                    <li>
                        Tell us about medical concerns and dietary needs at least one week before the
                        course (paper waivers available at check-in if preferred).
                    </li>
                </ul>
            ),
        },
        {
            q: "How does the Customer Portal work?",
            a: (
                <p>
                    The Customer Portal is your hub for everything—from switching courses to
                    signing the online waiver. Use the link in your registration confirmation email
                    to access your portal.
                </p>
            ),
        },
    ];

    return (
        <section id="faq" className={`${styles.section} alfarn`} aria-labelledby="faq-heading">
            <h2 id="faq-heading" className={styles.title}>FAQ</h2>
    
            <div className={styles.faq}>
            {items.map(({ q, a }, i) => (
                <details key={i} className={styles.item}>
                <summary className={styles.summary}>{q}</summary>
                <div className={styles.panel}>
                    <div className={styles.panelInner}>{a}</div>
                </div>
                </details>
            ))}
            </div>
      </section>
    );
}
