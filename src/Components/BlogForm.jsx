import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BlogForm = () => {
    const [html, setHtml] = useState('');
    const navigate = useNavigate();

    function handleEditorChange(value) {
        setHtml(value);
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const formSubmit = async (data) => {
        const formData = { ...data, description: html };
        const res = await fetch("http://127.0.0.1:8000/api/blog",{
            method: "POST",
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(formData)
        });
        toast("Blog added successfully");

        navigate('/');
    }

    return (
        <Card className="mt-4">
            <Card.Body className='border-0 shadow'>

                <form onSubmit={handleSubmit(formSubmit)}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Title</InputGroup.Text>
                        <Form.Control 
                            {...register('title', { required: true })}
                            placeholder="Enter title"
                            className={`${errors.title ? 'is-invalid' : ''}`}
                        />
                        {errors.title && <p className="text-danger">This field is required</p>}
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Short Description</InputGroup.Text>
                        <Form.Control
                            placeholder='Enter short description'
                            {...register('shortDec')}
                        />
                    </InputGroup>

                    <ReactQuill value={html} onChange={handleEditorChange} className='mb-3' />

                    <InputGroup className='mb-3'>
                        <Form.Control type="file" aria-label="Choose file" {...register('file')} />
                    </InputGroup>

                    <InputGroup className="mb-4">
                        <InputGroup.Text>Author</InputGroup.Text>
                        <Form.Control
                            {...register('author', { required: true })}
                            placeholder="Enter author name"
                            className={`${errors.author ? 'is-invalid' : ''}`}
                        />
                        {errors.author && <p className="text-danger">This field is required</p>}
                    </InputGroup>

                    <button type="submit" className='btn btn-dark border w-100'>Submit</button>
                </form>

            </Card.Body>
        </Card>
    );
}

export default BlogForm;
