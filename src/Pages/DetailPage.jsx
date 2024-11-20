import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const DetailPage = () => {

    const parms = useParams();

    const fetchBlog = async () => {
        const res = fetch("http://127.0.0.1:8000/api/blog/"+parms.id)
        const result = await res.json();
        setBlog(result.data);
    }

    useEffect(() => {
        fetchBlog();
    }, [])

    return (
        <div>
            <div className="container">
                <div className="row mt-5">
                    <div className='d-flex justify-content-between'>
                        <h2>Blog Title</h2>
                        <Link as={Link} to='/'><button className='btn btn-dark'>Back to blogs</button></Link>
                    </div>
                    <div>
                        <p>by <span className='fw-bold'>John Doe</span> on <span className='fw-bold'>01 Mar 2024</span></p>
                        <img src="https://placehold.co/800x250" alt="..." className='w-100' />
                    </div>
                    <p className='mt-3'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus eaque, eius perspiciatis sed neque dolores minima a inventore pariatur, tempora sint laboriosam optio? Quam distinctio beatae debitis, aut qui facilis deleniti corporis et dignissimos, facere officiis unde perspiciatis voluptatem iure iusto odit harum inventore error rem cum possimus dolorum maxime laborum fuga! Sit totam beatae blanditiis unde, aut deserunt suscipit voluptates, ducimus vitae odit asperiores illum eveniet accusantium labore ad ipsum? Quod excepturi quidem aspernatur. Quasi harum debitis possimus, eius non necessitatibus voluptates a molestiae nemo alias ab? Rerum ducimus vel quae nam doloremque, esse tenetur aspernatur eligendi a temporibus.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DetailPage
