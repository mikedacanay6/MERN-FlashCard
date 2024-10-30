import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reviewers = ({ reviewer, removeReviewer, updateReviewer }) => {
  const [name, setName] = useState(reviewer.name);
  const [description, setDescription] = useState(reviewer.description);
  const navigate = useNavigate();

  // Function to delete the reviewer
  const deleteReviewer = () => {
    axios.delete(`http://localhost:3001/reviewers/${reviewer._id}`)
      .then((response) => {
        console.log(response.data);
        removeReviewer(reviewer._id); // Remove reviewer from parent state
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to edit the reviewer and close modal on success
  const editReviewer = () => {
    axios.patch(`http://localhost:3001/reviewers/${reviewer._id}`, { name, description })
      .then((response) => {
        console.log(response.data);
        updateReviewer(reviewer._id, { name, description });
        document.getElementById(`modal_${reviewer._id}`).close(); // Close the modal
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-accent w-96 h-56 shadow-xl inter text-primary rounded-lg relative">
      <div className="p-4">
        <div>
          <h2 className="card-title text-3xl font-bold">{name}</h2>
          <p>{description}</p>
        </div>

        <div className="flex absolute p-4 bottom-0 right-0">
          <button className="btn btn-ghost px-2" onClick={deleteReviewer}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-current"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </button>
          <button onClick={() => navigate(`/cards/${reviewer._id}`)} className="btn btn-primary">Review this!</button>
        </div>

        <button onClick={() => document.getElementById(`modal_${reviewer._id}`).showModal()} className="absolute top-0 right-0 p-4">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="fill-current"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
        </button>
      </div>
        {/* Edit Button */}

        {/* Modal for editing */}
        <dialog id={`modal_${reviewer._id}`} className="modal">
          <div className="modal-box">
            <label htmlFor="name">Reviewer</label>
            <input
              id="name"
              type="text"
              placeholder="Reviewer Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="input input-bordered w-full my-2"
            />

            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="input input-bordered w-full my-2"
            />

            <div className="modal-action">
              <button type="button" className="btn btn-primary" onClick={editReviewer}>Submit</button>
            </div>
          </div>
        </dialog>
    </div>
  );
};

export default Reviewers;
