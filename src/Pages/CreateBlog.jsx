import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BlogForm from '../Components/BlogForm'

const CreateBlog = () => {
    return (
        <div>
            <Container>
                <Row className='mt-5'>
                    <div className='col-12'>
                        <div className='d-flex justify-content-between pb-4'>
                            <h3>Create Blog</h3>
                            <Link as={Link} to='/'><button className='btn btn-dark'>Back</button></Link>
                        </div>
                    </div>
                    <div className='col-12'>
                        <BlogForm />
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default CreateBlog
