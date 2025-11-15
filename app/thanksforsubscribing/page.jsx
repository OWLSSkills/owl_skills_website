export const metadata = {
    title: 'Thanks for Subscribing | OWLSSkills',
    description: 'You’re on the list! We’ll send course updates, discounts, and tips.',
    openGraph: {
      title: 'Thanks for Subscribing | OWLSSkills',
      description: 'You’re on the list! We’ll send course updates, discounts, and tips.',
      url: 'https://www.owlsskills.com/thanksforsubscribing',
    },
  };
  
  export default function ThanksForSubscribingPage() {
    return (
      <main
        style={{
          minHeight: '70vh',
          display: 'grid',
          placeItems: 'center',
          padding: '6svh 5vw',
          background: 'var(--green-50)',
        }}
      >
        <section style={{ maxWidth: 960, textAlign: 'center' }}>
          <h1 className="alfarn" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#122932' }}>
            Thanks for subscribing!
          </h1>
  

  
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/" className="call_to_action_button background_color_light_green font_color_white">
              Back to Home
            </a>
            <a href="/#courses" className="call_to_action_button background_color_light_purple white_text">
              Book Your Course
            </a>
          </div>
  
          <p className="gloria" style={{ marginTop: '2rem', fontSize: 'clamp(.95rem, 1.7vw, 1.1rem)', color: '#122932' }}>
            — OWLSSkills LLC
          </p>
        </section>
      </main>
    );
  }
  