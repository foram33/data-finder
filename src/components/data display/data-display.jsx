import React, { useEffect, useState } from "react";
import axios from "axios";
import "./data-display.css";

const DataDisplay = () => {

    const [peopleData, setPeopleData] = useState([]);
    const [searchQuery, setSearchedItem] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('name');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            setPeopleData(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    const handleSearch = (event) => {
        setSearchedItem(event.target.value);
    }

    const filteredData = peopleData.filter((item) => {
        if(selectedRadio === 'name') {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
        } else if(selectedRadio === 'email') {
            return item.email.toLowerCase().includes(searchQuery.toLowerCase())
        } else if(selectedRadio === 'companyname') {
            return item.company.name.toLowerCase().includes(searchQuery.toLowerCase())
        }
        return false;
    });

    return(
        <>
        <div className="search-area">
            <label>
                <input name="name" type="radio" checked={selectedRadio === 'name'} onChange={() => setSelectedRadio('name')} />Name
            </label>
            <label>
                <input name="email" type="radio" checked={selectedRadio === 'email'} onChange={() => setSelectedRadio('email')} />Email
            </label>
            <label>
                <input name="companyname" type="radio" checked={selectedRadio === 'companyname'} onChange={() => setSelectedRadio('companyname')} />Company Name
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