import React, { useEffect, useState } from "react";
import axios from "axios";
function Gyms() {
  const [gyms, setGyms] = useState([]);
  const [updated,setUpsated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/gym/getAllGyms")
      .then((response) => setGyms(response.data))
      .catch((error) => console.log(error));
  }, [updated]);

  const handleVerfiyClick = async (id)=>{
    try {
      const response = await axios.put(`http://localhost:3000/api/gym/verifyGym/${id}`);
      setUpsated(!updated)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleUnverfiyClick = async (id)=>{
    try {
      const response = await axios.put(`http://localhost:3000/api/gym/unverifyGym/${id}`);
      setUpsated(!updated)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="products-container">
      <table id="customers">
        <tr>
          <th>Gym</th>
          <th>Email</th>
          <th>Type</th>
          <th>Bio</th>
          <th>Location</th>
          <th>Region</th>
          <th>Action</th>
        </tr>

        {gyms.map((gym) => {
          return (
            <tr>
              <td>
                <div className="product-info-container">
                  <img src={gym.pfImage} />
                  {gym.fullname}
                </div>
              </td>
              <td>{gym.Email}</td>
              <td>{gym.type}</td>
              <td>{gym.bio}</td>
              <td>{gym.region}</td>
              <td>{gym.location}</td>
              <td>
                {
                  gym.verified? 
                  <button 
                  className="bann-btn"
                  onClick={()=>{
                    handleUnverfiyClick(gym.id)
                    alert(`Are You Sure To Unverify ${gym.fullname}`)
                  }}
                  >unverify</button>:
                  <button 
                  className="verification-btn"
                  onClick={()=>{
                    alert(`Are You Sure To Verify ${gym.fullname}`)
                    handleVerfiyClick(gym.id) 
                  }}
                  >Verify</button>
                }
                
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Gyms;
