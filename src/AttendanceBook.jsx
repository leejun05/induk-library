import React from "react";

const students = [
    {
        id:1,
        name: "Inje",
    },
    {
        id:2,
        name:"Steve",
    },
    {
        id:3,
        name:"Bill",
    },
    {
        id:4,
        name:"Jeff",
    },
];

export default function AttendanceBook(props) {
    return (
        <ul>
            {students.map((student, index) => {
                return <li key={index}>
                    {student.id}번 {student.name}
                </li>
            })}
        </ul>
    );
}