import React from 'react';
//import config from "../config";
import '../all.css';

let About = (props) =>{
    
    return(
        <div className="About">
        <h1>About Us</h1>
        <div id="image"></div>

        <h2 id="vision-statement">Vision Statement</h2>
        <p>Our team is aims to make ordering food as afforable as possible by gathering prices from different meal delivery apps (data might be dummy data), displays different meal delivery options,redirecting the user to their preferred option.</p>
        <h3 id="team-members">Team Members</h3>
        <ul>
        <li>Andy Huang <a href="https://github.com/huang-a">https://github.com/huang-a</a></li>
        <li>Ermias Berhane Merine <a href="https://github.com/ErmiasMerine">https://github.com/ErmiasMerine</a></li>
        <li>Ryeem Zia <a href="https://github.com/RyeemZia">https://github.com/RyeemZia</a></li>
        <li>Phillip Chae <a href="https://github.com/phillip-chae">https://github.com/phillip-chae</a></li>
        <li>Minsu Seo <a href="https://github.com/seocahtoa">https://github.com/seocahtoa</a></li>
        </ul>
        <h3 id="history">History</h3>
        <ul>
        <li>We are all college students who use meal delivery apps and wanted a way to find the best prices</li>
        <li>For collaboration <a href="https://github.com/software-students-fall2021/project-setup-xinhua-coherent-compfood/blob/master/CONTRIBUTING.md">https://github.com/software-students-fall2021/project-setup-xinhua-coherent-compfood/blob/master/CONTRIBUTING.md</a></li>
        </ul>

        
    </div>
    );
}

export default About
