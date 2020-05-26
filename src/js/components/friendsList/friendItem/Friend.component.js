import React from 'react';
import './Friend.component.scss';
import PropTypes from 'prop-types';

export default function FriendComponent(props) {
    return (
        <div className="friend">
            <img className="friend-portrait" src={props.imgPath} alt={props.userName}/>
            <h2 className="friend-title">{props.userName}</h2>
            <p className="friend-description">{props.userDescription}</p>
            <ul className="achievement-selected">
                {props.achievements.map((achiv, index)=>
                    <li className="small-achievement" key={index}>
                        <img src={achiv.imagePath} alt={achiv.title}/>
                    </li>
                )}
            </ul>
        </div>
    );
}

FriendComponent.propTypes = {
   imgPath: PropTypes.string.isRequired,
   userName:  PropTypes.string.isRequired,
   userDescription: PropTypes.string.isRequired,
   achievements: PropTypes.array.isRequired
};
