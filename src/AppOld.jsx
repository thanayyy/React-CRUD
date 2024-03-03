import PropsType from "prop-types";
import { useState } from "react";

function PopupForm({ isOpen, onClose, onSubmit, initialData }) {
  const [author, setAuthor] = useState(initialData?.author || "");
  const [title, setTitle] = useState(initialData?.title || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ author, title, id: initialData?.id }); // Include the id if present
    onClose(); // Close the pop-up after submitting
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "gray",
        padding: "20px",
        zIndex: 100,
      }}
    >
      <form onSubmit={handleSubmit}>
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const [editingData, setEditingData] = useState(null); // Holds the data being edited

  const handleOpenPopup = (data = null) => {
    setIsPopupOpen(true);
    setEditingData(data); // Set the data to be edited, if any
  };
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleFormSubmit = (data) => {
    if (data.id) {
      // Update existing data
      setFormData(formData.map(item => item.id === data.id ? data : item));
    } else {
      // Add new data with a unique id
      setFormData([...formData, { ...data, id: Date.now() }]);
    }
    console.log(formData); // You can replace this with any action
    handleClosePopup();
  };

  return (
    <div>
      <button onClick={() => handleOpenPopup()}>Add Author and Title</button>
      {formData.map((data, index) => (
        <div key={data.id} onClick={() => handleOpenPopup(data)}>
          {data.author} - {data.title} (Click to edit)
        </div>
      ))}
      <PopupForm
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleFormSubmit}
        initialData={editingData}
      />
    </div>
  );
}

export default App;

PopupForm.propTypes = {
  isOpen: PropsType.bool.isRequired,
  onClose: PropsType.func.isRequired,
  onSubmit: PropsType.func.isRequired,
  initialData: PropsType.object,
};