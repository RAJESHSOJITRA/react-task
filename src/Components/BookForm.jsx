import React from 'react';

const BookForm = ({ onSubmit, formData, setFormData }) => {
  const handleInputChange = event => {
    const { name, value } = event.target;
    let truncatedValue = value;

    // Custom validation for character limits
    if (name === 'id' && !(/^\d*$/).test(value)) {
      return;
    } else if (name === 'bookName') {
      truncatedValue = value.slice(0, 20);
    } else if (name === 'Description') {
      truncatedValue = value.slice(0, 50);
    } else if (name === 'author') {
      truncatedValue = value.slice(0, 25);
    }

    setFormData({
      ...formData,
      [name]: truncatedValue
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="col-md-4">
      <h2>Add/Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input type="text" className="form-control" name="id" value={formData.id} onChange={handleInputChange} required/>
        </div>
        <div className="form-group">
          <label>Book Name:</label>
          <input type="text" className="form-control" name="bookName" value={formData.bookName} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input type="text" className="form-control" name="Description" value={formData.Description} onChange={handleInputChange} required/>
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input type="text" className="form-control" name="author" value={formData.author} onChange={handleInputChange} required/>
        </div>
        <div className="form-group">
          <label>Image Source:</label>
          <input type="text" className="form-control" name="imgsrc" value={formData.imgsrc} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-primary">{formData.id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default BookForm;






// import React, { useState } from 'react';

// const BookForm = ({ onSubmit, formData, setFormData }) => {
//   const handleInputChange = event => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = event => {
//     event.preventDefault();
//     onSubmit();
//   };

//   return (
//     <div className="col-md-4">
//       <h2>Add/Edit Book</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>ID:</label>
//           <input type="text" className="form-control" name="id" value={formData.id} onChange={handleInputChange} required/>
//         </div>
//         <div className="form-group">
//           <label>Book Name:</label>
//           <input type="text" className="form-control" name="bookName" value={formData.bookName} onChange={handleInputChange} required />
//         </div>
//         <div className="form-group">
//           <label>Description:</label>
//           <input type="text" className="form-control" name="Description" value={formData.Description} onChange={handleInputChange} required/>
//         </div>
//         <div className="form-group">
//           <label>Author:</label>
//           <input type="text" className="form-control" name="author" value={formData.author} onChange={handleInputChange} required/>
//         </div>
//         <div className="form-group">
//           <label>Image Source:</label>
//           <input type="text" className="form-control" name="imgsrc" value={formData.imgsrc} onChange={handleInputChange} required />
//         </div>
//         <button type="submit" className="btn btn-primary">{formData.id ? 'Update' : 'Add'}</button>
//       </form>
//     </div>
//   );
// };

// export default BookForm;
