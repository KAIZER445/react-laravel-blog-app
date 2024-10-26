import React from 'react'
import { Container, Row } from 'react-bootstrap'
import BlogCard from '../Components/BlogCard'
import { Link } from 'react-router-dom'

const Display = () => {
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
                    <div className='col-3 pb-5'>
                        <BlogCard />
                    </div>
                    <div className='col-3 pb-5'>
                        <BlogCard />
                    </div>
                    <div className='col-3 pb-5'>
                        <BlogCard />
                    </div>
                    <div className='col-3 pb-5'>
                        <BlogCard />
                    </div>
                    <div className='col-3 pb-5'>
                        <BlogCard />
                    </div>
                    <div className='col-3 pb-5'>
                        <BlogCard />
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Display
