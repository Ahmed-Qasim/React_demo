import React from "react";
import { useNavigate } from "react-router-dom";

function Form() {
    const navigate = useNavigate();

    function handleClick() {
        // Navigate to a specific route
    }
    const addNewPost = (event) => {
        event.preventDefault();
        const title = event.target.postTitle.value;
        const author = event.target.postAuthor.value;
        const id = Math.floor(Math.random() * 11).toString();
        fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, title, author }),
        }).then(() => {
            console.log("Post submitted successfully");

            navigate("/test");
        });
    };
    return (
        <div >
            <form onSubmit={addNewPost}>
                <label htmlFor="post-title">Enter Post Title</label>
                <input id="post-title" name="postTitle" />
                <label htmlFor="post-author">Enter Your Name</label>
                <input id="post-author" name="postAuthor" />
                <button type="submit">Add New Post </button>
            </form>
        </div>
    );
}

export default Form;
