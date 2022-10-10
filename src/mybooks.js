import React from "react";
import { useState, useEffect } from "react";
import "./styles/layout.css"

function MyBooks(){
    const [record, setRecord] = useState({
        title: "",
        author: "",
        user: ""
    });
    const [books, setBooks] = useState([]);

    async function getBooks(){
        const response = await fetch("http://localhost:3001/record");
        if(!response.ok){
            window.alert(`Error: ${response.statusText}`);
        }
        else{
            const records = await response.json();
            setBooks(records);
        }
    }

    async function onSubmit(e){
        const newBook = {...record};
        await fetch("http://localhost:3001/add",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        }).catch(err=>{
            window.alert(`Error: ${err}`);
        });
        setRecord({
            title: "",
            author: "",
            user: ""
        });
        getBooks();
    }

    useEffect(()=>{
        getBooks();
        return;
    }, [books.length, record]);

    return(
    <div>
        <div className="wrapper row0">
            <div id="topbar" className="hoc clear">
                <div className="fl_left">
                    <ul className="nospace">
                        <li><i className="fas fa-laptop rgtspace-5"></i>OOSE homework1</li>
                        <li><i className="fas fa-user rgtspace-5"></i>Yongrui Qi 675DF4</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* <div className="bgded"> */}
            <div className="wrapper row2">
                <div id="comments">
                    <form onSubmit={onSubmit}>
                        <div className="one_third first">
                            <label htmlFor="title">Book <span>*</span></label>
                            <input type="text" color="black" name="name" id="name" value={record.title} size="22" required onChange={(e)=>setRecord({...record, title:e.target.value})}/>
                        </div>
                        <div className="one_third">
                            <label htmlFor="author">Author <span>*</span></label>
                            <input type="text" color="black" name="author" id="author" value={record.author} size="22" required onChange={(e)=>setRecord({...record, author:e.target.value})}/>
                        </div>
                        <div className="one_third">
                            <label htmlFor="user">Your username <span>(optional)</span></label>
                            <input type="text" color="black" name="user" id="user" value={record.user} size="22" onChange={(e)=>setRecord({...record, user:e.target.value})}/>
                        </div>
                        <div>
                        <input type="submit" color="black" name="sub" value="Add"></input>
                        </div>
                    </form>
                </div>
            </div>
        {/* </div> */}

        <div className="wrapper row3">
            <div id="comments">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Added User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book)=>(
                            <tr>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.user}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    
    </div>
  
   );
}

export default MyBooks;