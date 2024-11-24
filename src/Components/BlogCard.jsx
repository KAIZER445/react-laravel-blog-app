import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogCard = ({ blog, blogs, setBlogs }) => {


    const showImage = (img) => {
        return (img) ? `http://127.0.0.1:8000/uploads/blogs/${img}` : "https://placehold.co/600x400";
    }

    const deleteBlog = async(id) => {
        if ( confirm("Are you sure you want to delete this blog ?")){
            const res = await fetch('http://127.0.0.1:8000/api/blog/' + id,{
                method: 'DELETE'
            });

            const newBlogs = blogs.filter((blog) => blog.id != id);
            setBlogs(newBlogs);
            toast("Blog deleted successfully")
        }
    }

    return (
        <div>
            <Card className='w-100 overflow-hidden'>
                <div className='w-100 overflow-hidden d-flex align-items-center' style={{ height: '200px' }}>
                    <Card.Img variant="top" src={showImage(blog.image)} className='rounded-0' />
                </div>
                <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>
                        {blog.shortDec}
                    </Card.Text>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Link as={Link} to={`/blog/${blog.id}`}><Button variant="dark" className='btn-sm'>Details</Button></Link>
                        <div className='d-flex gap-3'>
                            <Link as={Link} to={`/blog/edit/${blog.id}`} className='text-info'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                    </svg>
                                </div>
                            </Link>

                            <div onClick={() => deleteBlog(blog.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash text-danger" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                            </div>

                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default BlogCard
