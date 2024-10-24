import React from 'react'
import { Container, Row } from 'react-bootstrap'
import BlogCard from '../Components/BlogCard'

const Display = () => {
    return (
        <div>
            <Container>
                <Row className='mt-5'>
                    <div className='d-flex justify-content-between pb-4'>
                        <h3>Blogs</h3>
                        <a href="/"><button className='btn btn-dark'>Create</button></a>
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
