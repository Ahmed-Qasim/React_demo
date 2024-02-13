import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Display() {
    const [posts, setPosts] = useState([]);

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/posts/${id}`, {
            method: "DELETE",
        }).then(() => {
            console.log("Post deleted successfully");
            fetch("http://localhost:8000/posts")
                .then((res) => res.json())
                .then((data) => {
                    setPosts(data);
                });
        });
    };

    useEffect(() => {
        fetch("http://localhost:8000/posts")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
            });
    }, []);

    return (
        <div>
            {posts.map((post) => (
                <div key={Math.random()}>
                    <h3>{post.title}</h3>
                    <p> Authored by {post.author}</p>
                    <hr />
                    <button
                        onClick={() => {
                            handleDelete(post.id);
                        }}
                    >
                        {" "}
                        Delete{" "}
                    </button>
                </div>
            ))}
            <button>
                <Link to="/form">Add</Link>
            </button>
        </div>
    );
}

export default Display;
