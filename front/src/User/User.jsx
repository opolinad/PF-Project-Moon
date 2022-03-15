import React from 'react';
import { Link } from 'react-router-dom'

export default function User({
    backgroundPhoto, 
    profilePhoto, 
    username,
    fullName,
    birthday, 
    following, 
    followers,
    ilustrations,
}){

    {if(true){
        backgroundPhoto = "https://pbs.twimg.com/profile_banners/1321799557542531073/1608500632/600x200";
        profilePhoto = "https://pbs.twimg.com/profile_images/1340770555306373120/JjTyTFOF_400x400.jpg";
        username = "alejofschlegel";
        fullName = "alejo schlegel";
        birthday = "29-10-2001";
        following = [{username: "ivana"},{username: "lucas"}, {username: "dana"}];
        followers = [{username: "ivana"},{username: "lucas"}, {username: "dana"}];
        ilustrations = [{image: "https://pbs.twimg.com/media/FNthreYWYAU5Ghr?format=jpg&name=small", title: "homero"}, {image: "https://pbs.twimg.com/media/FNtT8itXMAIt48K?format=jpg&name=small", title:"burns"}]
    }}

    return(
        <div>
            <img src={backgroundPhoto} alt="backgroundPhoto not found" width="1100px" height="200"/>

            <div>
                <img src={profilePhoto} alt="profilePhoto not found" width="100" height="100"/>
                <h1>{fullName}</h1>
                <p>{username}</p>
                <p>{birthday}</p>

                <div>
                    <Link to={"/:user/following"}>following</Link>
                    <Link to={"/:user/followers"}>followers</Link>
                </div>

                <div>
                    <Link to={"/:user/posts"}>posts</Link>
                    <Link to={"/:user/favorites"}>favorites</Link>
                </div>
            </div>

            <div>
                {/* //render posts and collections depending on path */}
                {ilustrations.map((e) => {
                    return (
                        <div>
                            <p>{e.title}</p>
                            <img src={e.image}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}