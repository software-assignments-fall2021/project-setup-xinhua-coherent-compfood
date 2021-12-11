import React from 'react';
//import config from "../config";
import '../all.css';

let About = (props) =>{
    
    return(
        <div className="About">
        <h1>About Us</h1>
        <div id="image"></div>

        <h2>The Team</h2>
            <ul>
                <li>Ryeem Zia <a href="https://github.com/RyeemZia">https://github.com/RyeemZia</a></li>
                <li>Andy Huang <a href="https://github.com/huang-a">https://github.com/huang-a</a></li>
                <li>Minsu Seo<a href="https://github.com/seocahtoa">https://github.com/seocahtoa</a></li>
                <li>Ermias Berhane Merine <a href="https://github.com/ErmiasMerine">https://github.com/ErmiasMerine</a></li>
                <li>Philip Chae<a href="https://github.com/phillip-chae">https://github.com/phillip-chae</a></li>
            </ul>
        
    </div>
    );
}

export default About
