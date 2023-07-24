import React, { useEffect, useState } from "react";
import axios from "axios";
import "./data-display.css";

const DataDisplay = () => {

    const [peopleData, setpeopleData] = useState([]);
    const [searchQuery, setSearchedItem] = useState('');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            setpeopleData(response.data);
    })
        .catch(error => {
            console.error(error);
        });
    }, []);

    const handleSearch = (event) => {
        setSearchedItem(event.target.value);
    }

    const filteredData = peopleData.filter((item) =>
         item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return(
        <>
        <div className="search-area">
            <label>
                <input name="name" type="radio" />Name
            </label>
            <label>
                <input name="email" type="radio" />Email
            </label>
            <label>
                <input name="company-name" type="radio" />Company Name
            </label>
        </div>
        <input type="search" placeholder="Search here.." value={searchQuery} onChange={handleSearch} />
            <ul>
                {filteredData.map(data => (
                    <li key={data.id}>
                        <p>{data.name}</p>
                        <p>{data.email}</p>
                        <p>{data.company.name}</p>
                        <p>{data.username}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default DataDisplay;