import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ addReviewer }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const location = useLocation();

  const addNewReviewer = () => {
    axios.post('http://localhost:3001/add', { name, description })
      .then((response) => {
        // After successful addition, call addReviewer from props
        addReviewer( response.data ); // Assuming your API returns the new ID
        setName(''); // Clear input fields
        setDescription('');
        document.getElementById('my_modal_1').close(); // Close modal after submission
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {location.pathname === '/' && (
        <div className="navbar flex items-center bg-secondary shadow-lg p-3">
          <div className="flex-1">
            <button className='text-xl inter'>Mike Reviewer</button>
          </div>
          <div className="flex-none">
            <button onClick={() => document.getElementById('my_modal_1').showModal()} className="hover:bg-primary p-2 transition-all duration-300 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className='fill-current'>
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <dialog id="my_modal_1" className="w-[500px] min-h-[250px] p-4 rounded-xl bg-accent inter">
        <div className="modal-box">
          <label htmlFor="name" className='text-2xl text-primary font-bold'>Reviewer</label>
          <input id='name' type="text" placeholder='Reviewer Name' onChange={(e) => setName(e.target.value)} value={name} className='p-2 rounded-md w-full my-2'/>

          <label htmlFor="description" className='text-2xl text-primary font-bold'>Description</label>
          <input id='description' type="text" placeholder='Description' onChange={(e) => setDescription(e.target.value)} value={description} className='p-2 rounded-md w-full my-2'/>

          <div className="my-2">
            <form method="dialog" className='flex justify-end gap-2'>
              <button type="button" className="p-2 bg-primary rounded-md" onClick={() => document.getElementById('my_modal_1').close()}>Cancel</button>
              <button type="button" className="p-2 bg-secondary rounded-md font-bold" onClick={addNewReviewer}>Submit</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <label htmlFor="name">Reviewer</label>
          <input id='name' type="text" placeholder='Reviewer Name' onChange={(e) => setName(e.target.value)} value={name} className='input input-bordered w-full my-2' />

          <label htmlFor="description">Description</label>
          <input id='description' type="text" placeholder='Description' onChange={(e) => setDescription(e.target.value)} value={description} className='input input-bordered w-full my-2' />

          <div className="modal-action">
            <form method="dialog">
              <button type="button" className="btn btn-primary" onClick={addNewReviewer}>Submit</button>
            </form>
          </div>
        </div>
      </dialog>

    </>
  );
};

export default Navbar;
