import React from "react";

export default function NumberList(props) {
    const {numbers} = props;
    const listItems = numbers.map( number =>
        <li>{number}</li>
    );
    return (
        <ul>{listItems}</ul>
    );
}