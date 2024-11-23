import React from 'react'
import EditCard from '../Components/EditCard'
import { Link } from 'react-router-dom';

const EditBlog = () => {
  return (
    <div>
        <div className="container">
            <div className="row mt-5">
                <div className="col-12">
                <div className='d-flex justify-content-between pb-4'>
                            <h3>Edit Blog</h3>
                            <Link as={Link} to='/'><button className='btn btn-dark'>Back</button></Link>
                        </div>
                </div>
                <div className="col-12">

                </div>
            </div>
            <EditCard/>
        </div>

    </div>
  )
}

export default EditBlog
