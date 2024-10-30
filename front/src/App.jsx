import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Reviewers from './Components/Reviewers';
import Cards from '../pages/Cards';
import axios from 'axios';

function App() {
  const [reviewers, setReviewers] = useState([]);

  const fetchReviewers = () => {
    axios.get('http://localhost:3001/reviewers')
      .then((response) => setReviewers(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => fetchReviewers(), []);

  const addReviewer = (newReviewer) => setReviewers((prev) => [...prev, newReviewer]);

  const removeReviewer = (id) => setReviewers((prev) => prev.filter((reviewer) => reviewer._id !== id));

  const updateReviewer = (id, updatedReviewer) => 
    setReviewers((prev) => prev.map((reviewer) => reviewer._id === id ? { ...reviewer, ...updatedReviewer } : reviewer));

  return (
    <Router>
      <Navbar addReviewer={addReviewer} />
      <Routes>
        {/* Home route that shows the list of reviewers */}
        <Route path="/" element={
          <div className="flex flex-wrap gap-4 p-4">
            {reviewers.map((reviewer) => (
              <Reviewers 
                key={reviewer._id} 
                reviewer={reviewer} 
                removeReviewer={removeReviewer} 
                updateReviewer={updateReviewer} 
              />
            ))}
          </div>
        } />

        {/* Cards route for individual reviewer cards */}
        <Route path="/cards/:id" element={<Cards />} />
      </Routes>
    </Router>
  );
}

export default App;
