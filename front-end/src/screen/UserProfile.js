import React from 'react';
import config from "../config";

let UserProfile = (props) =>{
    /*let [userinfo, set_ = useState([]);
        useEffect(
            () => {
                axios(`${config.backend_base_url}/user_profile?rows=`+ 1)
                    .then((resp) => {
                        let data = resp.data;
                        let temp = [];

                        console.log(it);
                        temp.push(<Restaurant name={it.name} description={it.description} hours={`${it.hour_start} - ${it.hour_end}`} location={it.location} />);
                        
                        set_restaurants(temp);
                    })
                    .catch((ex) => {
                        alert(`Something went wrong!: ${ex}`);
                    })
                ;
            },
            []
        );
    
        return (
            <div>
                <h2>Restaurants near you</h2>
                {restaurants}
            </div>
        );*/
/*
        {SidebarData.map((item, index) => {
            return (
                <li key={index} className={item.cName}>
                    <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                </li>
            );
        })}
*/
    return(
        <div className="divcenter boxify2">
            <img className="imgcenter" src={`${config.backend_base_url}/static/user_profile.jpg`} width="200" height="200" alt="Profile" />
            <h2>John Doe</h2>
            <h3>Username/Email:</h3><p>qwert1234</p>
            <h3>Phone Number: </h3>
            <p>+1 (272) 272 2772</p>
            <h3>Address: </h3>
            <p>214 Joshington Pl, New York, NY 10001</p>
        </div>
    );
}

export default UserProfile
