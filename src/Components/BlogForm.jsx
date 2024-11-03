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
    const notifySuccess = (message) => toast.success(message
        , {
            autoClose: 3000,
        }
    );

    function handleEditorChange(value) {
        setHtml(value);
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const stripHtmlTags = (html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || "";
    };

    const formSubmit = async (data) => {
        const formData = { ...data, description: stripHtmlTags(html) };
        const res = await fetch("http://127.0.0.1:8000/api/blog", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        notifySuccess("Successfully saved! 👍");

        navigate('/');
    }

    return (
        <Card className="mt-4">
            <Card.Body className='border-0 shadow'>

                <form onSubmit={handleSubmit(formSubmit)}>
                    <InputGroup>
                        <InputGroup.Text>Title</InputGroup.Text>
                        <Form.Control
                            {...register('title', { required: true })}
                            placeholder="Enter title"
                            className={`${errors.title ? 'is-invalid' : ''}`}
                        />
                    </InputGroup>
                    {errors.title && <p className="text-danger fst-italic">This field is required</p>}

                    <InputGroup className="my-3">
                        <InputGroup.Text>Short Description</InputGroup.Text>
                        <Form.Control
                            placeholder='Enter short description'
                            {...register('shortDec')}
                        />
                    </InputGroup>

                    <ReactQuill value={html} onChange={handleEditorChange} className='mb-3' />

                    <InputGroup className='my-3'>
                        <Form.Control type="file" aria-label="Choose file" {...register('file')} />
                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Text>Author</InputGroup.Text>
                        <Form.Control
                            {...register('author', { required: true })}
                            placeholder="Enter author name"
                            className={`${errors.author ? 'is-invalid' : ''}`}
                        />
                    </InputGroup>
                    {errors.author && <p className="text-danger fst-italic">This field is required</p>}

                    <button type="submit" className='btn btn-dark border w-100 mt-2'>Submit</button>
                </form>

            </Card.Body>
        </Card>
    );
}

export default BlogForm;
