import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const DetailPage = () => {
    const [blog, setBlog] = useState('');
    const parms = useParams();

    const fetchBlog = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/blog/" + parms.id);
            const result = await res.json();
            setBlog(result.data);
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    };


    useEffect(() => {
        fetchBlog();
    }, [])

    return (
        <div>
            <div className="container">
                <div className="row mt-5">
                    <div className='d-flex justify-content-between'>
                        <h2><h2>{blog.title}</h2></h2>
                        <Link as={Link} to='/'><button className='btn btn-dark'>Back to blogs</button></Link>
                    </div>
                    <div>
                        <p>by <span className='fw-bold'>{blog.author}</span> on <span className='fw-bold'>{blog.date}</span></p>

                        {blog.image ? (
                            <img src={`http://127.0.0.1:8000/uploads/blogs/${blog.image}`} alt="" className='img-fluid' />
                        ) : (
                            <img src='https://placehold.co/800x250' alt="" className='w-100' />
                        )}

                    </div>
                    <div dangerouslySetInnerHTML={{ __html: blog.description}}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPage
