import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogForm = () => {
    const [html, setHtml] = useState('');

    function handleEditorChange(value) {
        setHtml(value);
    }

    return (
        <Card className="mt-4">
            <Card.Body className='border-0 shadow'>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="title-addon">Title</InputGroup.Text>
                    <Form.Control
                        aria-label="Title"
                        aria-describedby="title-addon"
                        placeholder="Enter blog title"
                    />
                </InputGroup>

                <ReactQuill value={html} onChange={handleEditorChange} className='mb-3'
                />

                <InputGroup className='mb-3'>
                    <Form.Control type="file" aria-label="Choose file" />
                </InputGroup>

                <InputGroup className="mb-4">
                    <InputGroup.Text id="author-addon">Author</InputGroup.Text>
                    <Form.Control
                        aria-label="Author"
                        aria-describedby="author-addon"
                        placeholder="Enter author name"
                    />
                </InputGroup>

                <a href="/" className='btn btn-dark border w-100'>Submit</a>

            </Card.Body>
        </Card>
    );
}

export default BlogForm;
