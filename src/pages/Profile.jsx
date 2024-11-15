import React from 'react'

function ProfilePage() {
    return (
      <div className="profile-page">
        
        <div className="header-image"></div>
  
        
        <div className="profile-section">
         
          <div className="profile-picture"></div>
  
          
          <div className="profile-details">
            <h2 className="profile-name">Example Account</h2>
            <p className="profile-username">@ExampleUser</p>
            <p className="profile-bio">This is a sample profile :))</p>
            <p className="profile-joined">Joined November 2024</p>
  
           
            <div className="follow-info">
              <span>0 Following</span>
              <span>0 Followers</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProfilePage;