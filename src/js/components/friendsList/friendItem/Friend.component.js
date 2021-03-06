import React from 'react';
import './Friend.component.scss';
import PropTypes from 'prop-types';


export default function FriendComponent(props) {
    const remove = () => {
        if (props.removeAction) {
            props.removeAction(props.id);
        }
    }

    const moveUp = () => {
        if (props.moveUpAction) {
            props.moveUpAction(props.id);
        }
    }

    const moveDown = () => {
        if (props.moveDownAction) {
            props.moveDownAction(props.id);
        }
    }

    const add = () => {
        if (props.addAction) {
            props.addAction(props.id);
        }
    }

    return (
        <div className="friend">
            <picture className="portrait-wrapper">
                <button className="button-remove" onClick={remove}/>
                <button className="button-add" onClick={add}/>
                <button className="button-up" onClick={moveUp}/>
                <button className="button-down" onClick={moveDown}/>
                <img className="friend-portrait" src={props.imgPath} alt={props.userName}/>
            </picture>
            <div className="title-description-wrapper">
                <h2 className="friend-title">{props.userName}</h2>
                <p className="friend-description">{props.userDescription}</p>
            </div>
        </div>
    );
}

FriendComponent.propTypes = {
    id: PropTypes.number.isRequired,
    imgPath: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userDescription: PropTypes.string.isRequired,
    removeAction: PropTypes.func,
    addAction: PropTypes.func,
    moveUpAction: PropTypes.func,
    moveDownAction: PropTypes.func
};
