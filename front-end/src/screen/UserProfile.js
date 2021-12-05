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
        <div className="divcenter">
            <img src="https://picsum.photos/200" alt="Placeholder profile"></img>
            <h2>John Doe</h2>
            <p>Username/Email: qwert1234</p>
            <p>Phone Number: +1 (272) 272 2772</p>
            <p>Address: 214 Joshington Pl, New York, NY 10001</p>
        </div>
    );
}

export default UserProfile
