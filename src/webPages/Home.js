import React from 'react'
import '../css/Home.css'


function Home() {
  return (
    <div className='home-page__wrapper'>
        <div className='cool-hero__wrapper'>
          <p className='cool-hero__quote'>Helping one person<br></br>
            Might not change the world<br></br>
            But it could<br></br>
            Change the world for the person</p>
        </div>
        <section className='about-us__section'>
          <div className='about-us__wrapper'>
            <div className='about-us__header'>
              <h3>About Us</h3>
              <img src='https://fontmeme.com/permalink/220324/c167349daae29d6cb386240a08c33422.png'></img>
            </div>
            <div className='about-us__body'>
              <p>We are a team of web developers inspired
                  by the friendly neighbourhood Spider-Man.
                  We hope to help more people in need by delivering a website to be the medium
                  that connects non-profit organisations
                  with the people in need</p>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Home