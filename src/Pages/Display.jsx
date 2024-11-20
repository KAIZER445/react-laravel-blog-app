import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import BlogCard from '../Components/BlogCard'
import { Link } from 'react-router-dom'

const Display = () => {

    const [blogs, setBlogs] = useState('');

    const fetchBlogs = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/blog');
        const result = await res.json();
        setBlogs(result.data);
    }

    useEffect(() => {
        fetchBlogs();
    }, [])


    return (
        <div>
            <Container>
                <Row className='mt-5'>
                    <div className='col-12'>
                        <div className='d-flex justify-content-between pb-4'>
                            <h3>Blogs</h3>
                            <Link as={Link} to='/CreateBlog'><button className='btn btn-dark'>Create</button></Link>
                        </div>
                    </div>
                    {
                        (blogs) && blogs.map((blog) => {
                            return (<div className='col-3 pb-5'>
                                <BlogCard blog={blog} key={blog.id}/>
                            </div>)
                        })
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Display
