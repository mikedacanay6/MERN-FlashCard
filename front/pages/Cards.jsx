import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Cards = () => {
  const { id } = useParams();
  const [cards, setCards] = useState([]);

  const [editCards, setEditCards] = useState({
    question: '',
    answer: '',
    isCorrect: false,
  });

  const fetchCards = () => {
    axios.get(`http://localhost:3001/reviewers/${id}`)
      .then((response) => {
        setCards(response.data.cards);
        console.log(response.data.cards);
      })
      .catch((error) => console.log(error));
  }

  const submitCards = () => {
    axios.patch(`http://localhost:3001/reviewers/${id}`, { cards: [...cards, editCards] })
      .then((response) => {
        console.log(response.data);
        fetchCards();
        document.getElementById('my_modal_2').close();
      })
      .catch((error) => console.log(error));
  }
  
  useEffect(() => fetchCards(), []);

  return (
    <div>
      <div className="navbar bg-base-300 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Mike's Reviewers</a>
        </div>
        <div className="flex-none">
          <button onClick={() => document.getElementById('my_modal_2').showModal()} className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className='fill-current'>
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 p-4">
        {cards.map((card) => (
          <div className="bg-primary-content text-primary-content w-[250px] h-[250px] rounded-lg">
            <div className="card-body">
              <p>{card.question}</p>
            </div>
          </div>
        ))}
      </div>


      <dialog id={'my_modal_2'} className="modal">
          <div className="modal-box">
            <label htmlFor="name">Question</label>
            <input
              id="name"
              type="text"
              placeholder="Reviewer Name"
              onChange={(e) => setEditCards({ ...editCards, question: e.target.value })}
              value={editCards.question}
              className="input input-bordered w-full my-2"
            />

            <label htmlFor="description">Answer</label>
            <input
              id="description"
              type="text"
              placeholder="Description"
              onChange={(e) => setEditCards({ ...editCards, answer: e.target.value })}
              value={editCards.answer}
              className="input input-bordered w-full my-2"
            />

            <div className="modal-action">
              <button onClick={() => document.getElementById('my_modal_2').close()} type="button" className="btn btn-error">Cancel</button>
              <button onClick={submitCards} type="button" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </dialog>
    </div>
  )
}

export default Cards