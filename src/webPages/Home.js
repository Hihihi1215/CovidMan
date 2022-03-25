import React, { useEffect, useRef } from 'react'
import '../css/Home.css'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import spiderman from '../img/spiderman.jpg'
gsap.registerPlugin(ScrollTrigger)


function Home() {

  let aboutUsHeader = useRef(null);
  let aboutUsBody = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      start : "top 70%",
      end : 99999,
      trigger : aboutUsHeader,
      toggleClass : "about-us-header-fade-in"
    })
    ScrollTrigger.create({
      start : "top 70%",
      end : 99999,
      trigger : aboutUsBody,
      toggleClass : 'about-us-body-fade-in'
    })
    ScrollTrigger.create({
      start : "top 70%",
      end : 99999,
      trigger : ".spiderman-hero",
      toggleClass : 'spiderman-hero-zoom-in'
    })
    ScrollTrigger.create({
      start : "top 70%",
      end : 99999,
      trigger : '.the-team__title',
      toggleClass : 'the-team__title--fadein'
    })
    ScrollTrigger.create({
      start : "top 70%",
      end : 99999,
      trigger : '.team-member__card',
      toggleClass : {
        targets : '.team-member__card',
        className : 'team-member__card--fadein'
      }
    })
  }, [])

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
            <div className='about-us__header' ref={el => {aboutUsHeader = el}}>
              <h3>About Us</h3>
              <img src='https://fontmeme.com/permalink/220324/c167349daae29d6cb386240a08c33422.png'></img>
            </div>
            <div className='about-us__body' ref={el => {aboutUsBody = el}}>
              <p>We are a team of web developers inspired
                  by the friendly neighbourhood Spider-Man.
                  We hope to help more people in need by delivering a website to be the medium
                  that connects non-profit organisations
                  with the people in need</p>
            </div>
          </div>
        </section>
        <div className='spiderman-hero__wrapper'>
          <img src={spiderman} className='spiderman-hero'></img>
          <p className='spiderman-hero__quote'>Covid-Man, Covid-Man<br></br>
          Helping others with what he can</p>
        </div>
        <section className='team-section'>
          <div className='the-team__wrapper'>
            <p className='the-team__title'>The Team :</p>
            <div className='the-team-body'>
              <div className='team-member__card'>
                <div className='team-member__pic team-member__pic--koroSensei'></div>
                <p className='team-member__name'>Hihihi1215</p>
              </div>
              <div className='team-member__card'>
                <div className='team-member__pic team-member__pic--koroSensei2'></div>
                <p className='team-member__name'>ZhiShen25</p>
              </div>
            </div>
          </div>
        </section>
        <footer className='covid-man-footer'>
          <div className='covid-man-footer__wrapper'>
            <div className='covid-man-footer__header'>
              Contact Us
            </div>
            <div className='covid-man-footer__body'>
              <p>jiawenchinkevin@gmail.com</p>
              <p>zhishen19c@gmail.com</p>
            </div>
          </div>
        </footer>
    </div>
  )
}

export default Home