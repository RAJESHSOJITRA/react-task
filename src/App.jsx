import React, { useState, useEffect } from 'react';
import { Data } from './Components/Data';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookForm from './Components/BookForm';
import BookList from './Components/BookList';

function App() {
  const [data, setData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('bookData'));
    return storedData ? storedData : Data;
  });
  const [formData, setFormData] = useState({
    id: '',
    bookName: '',
    Description: '',
    author: '',
    imgsrc: ''
  });

  const updateLocalStorage = (newData) => {
    localStorage.setItem('bookData', JSON.stringify(newData));
  };

  const handleFormSubmit = () => {
    const index = data.findIndex(item => item.id === formData.id);
    if (index !== -1) {
      const newData = [...data];
      newData[index] = formData;
      setData(newData);
      updateLocalStorage(newData);
      alert("Book updated successfully");
    } else {
      const newData = [...data, formData];
      setData(newData);
      updateLocalStorage(newData);
      alert("Book added successfully");
    }
    setFormData({
      id: '',
      bookName: '',
      Description: '',
      author: '',
      imgsrc: ''
    });
  };

  const handleDelete = id => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
    updateLocalStorage(newData);
    alert("Are you sure you want to delete the book?");
  };

  const handleEdit = item => {
    setFormData(item);
    alert("Editing book");
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <BookForm onSubmit={handleFormSubmit} formData={formData} setFormData={setFormData} />
          <BookList data={data} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      </div>
    </>
  );
}

export default App;



// Add ,Delete and Edit button for Books using alert message   
// required user Authentication

// import React, { useState, useEffect } from 'react';
// import { Data } from './Components/Data';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const [data, setData] = useState([]);
//   const [formData, setFormData] = useState({
//     id: '',
//     bookName: '',
//     Description: '',
//     author: '',
//     imgsrc: ''
//   });

//   useEffect(() => {
//     setData(Data);
//   }, []);

//   const handleInputChange = event => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleFormSubmit = event => {
//     event.preventDefault();
//     const index = data.findIndex(item => item.id === formData.id);
//     if (index !== -1) {
//       const newData = [...data];
//       newData[index] = formData;
//       setData(newData);
//       alert("book updated Succesfully");
//     } else {
//       setData([...data, formData]);
//       alert("you Added book succesfully");
//     }
//     setFormData({
//       id: '',
//       bookName: '',
//       Description: '',
//       author: '',
//       imgsrc: ''
//     });
//   };

//   const handleDelete = id => {
//     setData(data.filter(item => item.id !== id));
//     alert("are you sure you want to delete the component");
//   };

//   const handleEdit = item => {
//     setFormData(item);
//     alert("editing a book");
//   };

//   return (
//     <>
//       <div className="container">
//         <div className="row">
//           <div className="col-md-4">
//             <h2>Add/Edit Book</h2>
//             <form onSubmit={handleFormSubmit}>
//               <div className="form-group">
//                 <label>ID:</label>
//                 <input type="text" className="form-control" name="id" value={formData.id} onChange={handleInputChange} required/>
//               </div>
//               <div className="form-group">
//                 <label>Book Name:</label>
//                 <input type="text" className="form-control" name="bookName" value={formData.bookName} onChange={handleInputChange} 
//                required />
//               </div>
//               <div className="form-group">
//                 <label>Description:</label>
//                 <input type="text" className="form-control" name="Description" value={formData.Description} onChange={handleInputChange} required/>
//               </div>
//               <div className="form-group">
//                 <label>Author:</label>
//                 <input type="text" className="form-control" name="author" value={formData.author} onChange={handleInputChange} required/>
//               </div>
//               <div className="form-group">
//                 <label>Image Source:</label>
//                 <input type="text" className="form-control" name="imgsrc" value={formData.imgsrc} onChange={handleInputChange} required />
//               </div>
//               <button type="submit" className="btn btn-primary">{formData.id ? 'Update' : 'Add'}</button>
//             </form>
//           </div>
//           <div className="col-md-8">
//             <h2>Books List</h2>
//             <div className="row">
//               {data.map(item => (
//                 <div key={item.id} className="col-md-4 mb-4">
//                   <div className="card" style={{ width: "18rem" }}>
//                     <img src={item.imgsrc} className="card-img-top" alt="" />
//                     <div className="card-body">
//                       <ul>
//                         <li>ID: {item.id}</li>
//                         <li>Name: {item.bookName}</li>
//                         <li>Description: {item.Description}</li>
//                         <li>Author: {item.author}</li>
//                       </ul>
//                       <button className="btn btn-danger mr-2" onClick={() => handleDelete(item.id)}>Delete</button>
//                       <button className="btn btn-info" onClick={() => handleEdit(item)}>Edit</button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
