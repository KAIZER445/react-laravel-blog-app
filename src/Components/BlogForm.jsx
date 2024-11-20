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

    const [imageID, setimageID] = useState('');

    const navigate = useNavigate();
    const notifySuccess = (message) => toast.success(message
        , {
            autoClose: 3000,
        }
    );

    const notifyError = (message) => toast.error(message
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


    //for uploading image

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append("image",file);

        const res = await fetch("http://127.0.0.1:8000/api/save-temp-image",{
            method: "POST",
            body: formData}
        )

        const result = await res.json();
        
        if(result.status == false) {
            alert(result.errors.image);
            e.target.value = null;
        }

        setimageID(result.image.id);
    }

    //

    const formSubmit = async (data) => {
        const formData = {
            ...data, description:
                html,
                image_id : imageID
        };
        const res = await fetch("http://127.0.0.1:8000/api/blog", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            notifySuccess("Successfully saved! 👍");
            navigate('/');
        } else {
            notifyError('Failed to save!');
        }
    }

    return (
        <>
            <Card>
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
                            <Form.Control type="file" onChange={handleFileChange} aria-label="Choose file"/>
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text>Author</InputGroup.Text>
                            <Form.Control
                                {...register('author', { required: true })}
                                placeholder="Enter author name"
                                className={`${errors.author ? 'is-invalid' : ''}`}
                            />
                        </InputGroup>
                        {errors.author && <p className="text-danger fst-italic mb-0">This field is required</p>}

                        <button type="submit" className='btn btn-dark border w-100 mt-3'>Submit</button>
                    </form>
                    
                </Card.Body>
            </Card>
        </>
    );
}

export default BlogForm;
