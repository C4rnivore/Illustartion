import MainBGC from '../../assets/main_bg_cropped.jpg'
import HeroGR from '../../assets/hero-gr.png'
import './Hero.css'
import { NavLink } from "react-router-dom";

function Hero() {
    return (
            <section className="hero mw-1920">
                <h1>
                    <span>Look. </span> 
                    <span>Share. </span> 
                    <span>Get Inspired.</span>
                </h1>

                <h2>
                    <span className="green normal">Share</span> with the world. 
                    <span className="green normal"> Find</span> your inspiration. 
                    <span className="green normal"> Unleash</span> your talent.
                </h2>

                <div className="hero-btn-container">
                    <NavLink to='/explore'><button className="hero-btn">Let's explore!</button></NavLink>
                </div>
                <img className="hero-gr" src={HeroGR} alt="" draggable='false'/>
                <img className="hero-bg" src={MainBGC} alt="" draggable='false'/>
            </section> 
        );
}

export default Hero;