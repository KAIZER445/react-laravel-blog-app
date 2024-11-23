import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditCard = () => {
    const [html, setHtml] = useState('');
    const [imageID, setImageID] = useState('');
    const [blog, setBlog] = useState({});
    const navigate = useNavigate();
    const parms = useParams();

    const notifySuccess = (message) => toast.success(message, { autoClose: 3000 });
    const notifyError = (message) => toast.error(message, { autoClose: 3000 });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleEditorChange = (value) => setHtml(value);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("http://127.0.0.1:8000/api/save-temp-image", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            if (result.status === false) {
                notifyError(result.errors.image || "File upload failed");
                e.target.value = null;
            } else {
                notifySuccess("Image uploaded successfully");
                setImageID(result.image.id);
            }
        } catch (error) {
            notifyError("An error occurred during file upload");
            console.error(error);
        }
    };

    const formSubmit = async (data) => {
        const formData = {
            ...data,
            description: html,
            image_id: imageID,
        };

        const method = parms.id ? "PUT" : "POST";
        const url = parms.id
            ? `http://127.0.0.1:8000/api/blog/${parms.id}`
            : "http://127.0.0.1:8000/api/blog";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                notifySuccess("Successfully saved! 👍");
                navigate('/');
            } else {
                notifyError("Failed to save!");
            }
        } catch (error) {
            notifyError("An error occurred while saving");
            console.error(error);
        }
    };

    const fetchBlog = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/blog/${parms.id}`);
            const result = await res.json();
            setBlog(result.data);
            setHtml(result.data.description);
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    };

    useEffect(() => {
        if (parms.id) fetchBlog();
    }, [parms.id]);
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
                                value={blog.title}
                            />
                        </InputGroup>
                        {errors.title && <p className="text-danger fst-italic">This field is required</p>}

                        <InputGroup className="my-3">
                            <InputGroup.Text>Short Description</InputGroup.Text>
                            <Form.Control
                                placeholder='Enter short description'
                                {...register('shortDec')}
                                value={blog.shortDec}
                            />
                        </InputGroup>

                        <ReactQuill value={html} onChange={handleEditorChange} className='mb-3' />

                        <InputGroup className='my-3'>
                            <Form.Control type="file" onChange={handleFileChange} aria-label="Choose file" />
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text>Author</InputGroup.Text>
                            <Form.Control
                                {...register('author', { required: true })}
                                placeholder="Enter author name"
                                className={`${errors.author ? 'is-invalid' : ''}`}
                                value={blog.author}
                            />
                        </InputGroup>
                        {errors.author && <p className="text-danger fst-italic mb-0">This field is required</p>}

                        <button type="submit" className='btn btn-dark border w-100 mt-3'>Submit</button>
                    </form>

                </Card.Body>
            </Card>
        </>
    )
}

export default EditCard
