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
    const params = useParams();

    const notifySuccess = (message) => toast.success(message, { autoClose: 3000 });
    const notifyError = (message) => toast.error(message, { autoClose: 3000 });

    const {
        register,
        handleSubmit,
        setValue, // Used to set default values dynamically
        formState: { errors },
    } = useForm();

    // Load existing blog data
    const fetchBlog = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/blog/${params.id}`);
            const result = await res.json();

            if (res.ok) {
                setBlog(result.data);
                setHtml(result.data.description || ''); // Set rich text editor value
                setImageID(result.data.image_id || '');

                // Populate form fields dynamically
                setValue('title', result.data.title || '');
                setValue('shortDec', result.data.shortDec || '');
                setValue('author', result.data.author || '');
            } else {
                notifyError('Failed to fetch blog details.');
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
            notifyError('Error fetching blog data.');
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    // Handle image upload
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

            if (res.ok) {
                setImageID(result.image.id);
            } else {
                alert(result.errors.image);
                e.target.value = null;
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    // Handle form submission
    const formSubmit = async (data) => {
        const formData = {
            ...data,
            description: html, // Add description from the rich text editor
            image_id: imageID,
        };

        try {
            const res = await fetch(`http://127.0.0.1:8000/api/blog/${params.id}`, {
                method: "PUT", // Use PUT or PATCH for updates
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                notifySuccess("Successfully updated! 👍");
                navigate('/');
            } else {
                const result = await res.json();
                notifyError(result.message || 'Failed to update!');
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            notifyError('Error updating blog.');
        }
    };

    // Handle rich text editor change
    const handleEditorChange = (value) => {
        setHtml(value);
    };

    return (
        <Card>
            <Card.Body className="border-0 shadow">
                <form onSubmit={handleSubmit(formSubmit)}>
                    {/* Title */}
                    <InputGroup>
                        <InputGroup.Text>Title</InputGroup.Text>
                        <Form.Control
                            {...register('title', { required: true })}
                            placeholder="Enter title"
                            className={`${errors.title ? 'is-invalid' : ''}`}
                        />
                    </InputGroup>
                    {errors.title && <p className="text-danger fst-italic">This field is required</p>}

                    {/* Short Description */}
                    <InputGroup className="my-3">
                        <InputGroup.Text>Short Description</InputGroup.Text>
                        <Form.Control
                            {...register('shortDec')}
                            placeholder="Enter short description"
                        />
                    </InputGroup>

                    {/* Description */}
                    <ReactQuill value={html} onChange={handleEditorChange} className="mb-3" />

                    {/* Image Upload */}
                    <InputGroup className="my-3">
                        <Form.Control type="file" onChange={handleFileChange} aria-label="Choose file" />
                    </InputGroup>

                    {/* Author */}
                    <InputGroup>
                        <InputGroup.Text>Author</InputGroup.Text>
                        <Form.Control
                            {...register('author', { required: true })}
                            placeholder="Enter author name"
                            className={`${errors.author ? 'is-invalid' : ''}`}
                        />
                    </InputGroup>
                    {errors.author && <p className="text-danger fst-italic mb-0">This field is required</p>}

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-dark border w-100 mt-3">Update</button>
                </form>
            </Card.Body>
        </Card>
    );
};

export default EditCard;
