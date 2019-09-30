import React from 'react';
import style from './Friend.component.scss';
import PropTypes from 'prop-types';

export default function FriendComponent(props) {
    return (
        <div className="friend">
            <img className="friend-portrait" src={props.imgPath} alt={props.imgDescription}/>
            <h2 className="friend-title">{props.userName}</h2>
            <p className="friend-description">{props.userMotto}</p>
            <ul className="achievement-selected">
                <li className="small-achievement icon-ac-1"></li>
                <li className="small-achievement icon-ac-2"></li>
                <li className="small-achievement icon-ac-3"></li>
            </ul>
        </div>
    );
}

FriendComponent.propTypes = {
   imgPath: PropTypes.string.isRequired,
   imgDescription: PropTypes.string.isRequired,
   userName:  PropTypes.string.isRequired,
   userMotto: PropTypes.string.isRequired,
};
