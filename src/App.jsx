import React, { useState, useEffect } from "react";
import { Data } from "./Components/Data";
import "bootstrap/dist/css/bootstrap.min.css";
import BookForm from "./Components/BookForm";
import BookList from "./Components/BookList";

function App() {
  const [data, setData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("bookData"));
    return storedData ? storedData : Data;
  });
  const [formData, setFormData] = useState({
    id: "",
    bookName: "",
    Description: "",
    author: "",
    imgsrc: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const idGenerator = (counter) => {
    const showdate = new Date();
    const displaytodaysdate =
      showdate.getFullYear() +
      (showdate.getMonth() + 1).toString().padStart(2, "0") +
      showdate.getDate().toString().padStart(2, "0") +
      counter.toString().padStart(4, "0");
    return displaytodaysdate;
  };

  const updateLocalStorage = (newData) => {
    localStorage.setItem("bookData", JSON.stringify(newData));
  };

  const handleFormSubmit = () => {
    let maxCounter = 0;
    data.forEach((item) => {
      const itemCounter = parseInt(item.id.substring(8));
      if (itemCounter > maxCounter) {
        maxCounter = itemCounter;
      }
    });

    const newCounter = maxCounter + 1;
    const newId = idGenerator(newCounter);

    const index = data.findIndex((item) => item.id === formData.id);
    const newData = [...data];

    if (index !== -1) {
      newData[index] = { ...formData, id: newId };
      alert("Book updated successfully");
    } else {
      newData.push({ ...formData, id: newId });
      alert("Book added successfully");
    }

    setData(newData);
    updateLocalStorage(newData);
    setFormData({
      id: "",
      bookName: "",
      Description: "",
      author: "",
      imgsrc: "",
    });
  };

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    updateLocalStorage(newData);
    alert("Are you sure you want to delete the book?");
  };

  const handleEdit = (item) => {
    setFormData(item);
    alert("Editing book");
  };

  const handleDuplicate = (item) => {
    const duplicateBook = { ...item };
    duplicateBook.id = idGenerator(data.length + 1);
    setData([...data, duplicateBook]);
    updateLocalStorage([...data, duplicateBook]);
    alert("Book duplicated successfully");
  };

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    if (query === "") {
      setFilteredData([]);
      return;
    }
    const filteredData = data.filter(
      (item) =>
        item.bookName.toLowerCase().includes(query) ||
        item.Description.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query)
    );
    setFilteredData(filteredData);
  }, [searchQuery, data]);

  const handleSearch = () => {
    setFilteredData(
      data.filter(
        (item) =>
          item.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const handleReset = () => {
    setSearchQuery("");
    setFilteredData([]);
  };

  return (
    <div className="container">
      <div>
        <h1>Search Input</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="row">
        <BookForm
          onSubmit={handleFormSubmit}
          formData={formData}
          setFormData={setFormData}
        />
        <BookList
          data={filteredData.length > 0 ? filteredData : data}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
        />
      </div>
    </div>
  );
}

export default App;


// import React, { useState } from "react";
// import { Data } from "./Components/Data";
// import "bootstrap/dist/css/bootstrap.min.css";
// import BookForm from "./Components/BookForm";
// import BookList from "./Components/BookList";

// function App() {
//   const [data, setData] = useState(() => {
//     const storedData = JSON.parse(localStorage.getItem("bookData"));
//     return storedData ? storedData : Data;
//   });

//   const [formData, setFormData] = useState({
//     id: "",
//     bookName: "",
//     Description: "",
//     author: "",
//     imgsrc: "",
//   });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredData, setFilteredData] = useState([]);

//   const idGenerator = (counter) => {
//     const showdate = new Date();
//     const displaytodaysdate =
//       showdate.getFullYear() +
//       (showdate.getMonth() + 1).toString().padStart(2, "0") +
//       showdate.getDate().toString().padStart(2, "0") +
//       counter.toString().padStart(4, "0");
//     return displaytodaysdate;
//   };

//   const updateLocalStorage = (newData) => {
//     localStorage.setItem("bookData", JSON.stringify(newData));
//   };

//   const handleFormSubmit = () => {
//     let maxCounter = 0;
//     data.forEach((item) => {
//       const itemCounter = parseInt(item.id.substring(8));
//       if (itemCounter > maxCounter) {
//         maxCounter = itemCounter;
//       }
//     });

//     const newCounter = maxCounter + 1;
//     const newId = idGenerator(newCounter);

//     const index = data.findIndex((item) => item.id === formData.id);
//     const newData = [...data];

//     if (index !== -1) {
//       newData[index] = { ...formData, id: newId };
//       alert("Book updated successfully");
//     } else {
//       newData.push({ ...formData, id: newId });
//       alert("Book added successfully");
//     }

//     setData(newData);
//     updateLocalStorage(newData);
//     setFormData({
//       id: "",
//       bookName: "",
//       Description: "",
//       author: "",
//       imgsrc: "",
//     });
//   };

//   const handleDelete = (id) => {
//     const newData = data.filter((item) => item.id !== id);
//     setData(newData);
//     updateLocalStorage(newData);
//     alert("Are you sure you want to delete the book?");
//   };

//   const handleEdit = (item) => {
//     setFormData(item);
//     alert("Editing book");
//   };

//   const handleDuplicate = (item) => {
//     const duplicateBook = { ...item };
//     duplicateBook.id = idGenerator(data.length + 1);
//     setData([...data, duplicateBook]);
//     updateLocalStorage([...data, duplicateBook]);
//     alert("Book duplicated successfully");
//   };

//   const handleSearch = () => {
//     const query = searchQuery.toLowerCase();
//     const filteredData = data.filter(
//       (item) =>
//         item.bookName.toLowerCase().includes(query) ||
//         item.Description.toLowerCase().includes(query) ||
//         item.author.toLowerCase().includes(query)
//     );
//     setFilteredData(filteredData);
//   };

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//     if (!event.target.value) {
//       // If search query is empty, show all data
//       setFilteredData([]);
//     }
//   };
  
//   return (
//     <div className="container">
//       <div>
//         <h1>Search Input</h1>
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearchInputChange}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>   
//       <div className="row">
//         <BookForm
//           onSubmit={handleFormSubmit}
//           formData={formData}
//           setFormData={setFormData}
//         />
//         <BookList
//           data={data}
//           onDelete={handleDelete}
//           onEdit={handleEdit}
//           onDuplicate={handleDuplicate}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import { Data } from "./Components/Data";
// import "bootstrap/dist/css/bootstrap.min.css";
// import BookForm from "./Components/BookForm";
// import BookList from "./Components/BookList";

// function App() {
//   const [data, setData] = useState(() => {
//     const storedData = JSON.parse(localStorage.getItem("bookData"));
//     return storedData ? storedData : Data;
//   });
//   const [formData, setFormData] = useState({
//     id: "",
//     bookName: "",
//     Description: "",
//     author: "",
//     imgsrc: "",
//   });

  
//   const idGenerator = (counter) => {
//     const showdate = new Date();
//     const displaytodaysdate =
//       showdate.getFullYear() +
//       (showdate.getMonth() + 1).toString().padStart(2, "0") +
//       showdate.getDate().toString().padStart(2, "0") +
//       counter.toString().padStart(4, "0");
//     return displaytodaysdate;
//   };

//   const updateLocalStorage = (newData) => {
//     localStorage.setItem("bookData", JSON.stringify(newData));
//   };

//   const handleFormSubmit = () => {
//     let maxCounter = 0;
//     data.forEach((item) => {
//       const itemCounter = parseInt(item.id.substring(8)); // Extract the last 4 digits
//       if (itemCounter > maxCounter) {
//         maxCounter = itemCounter;
//       }
//     });

//     const newCounter = maxCounter + 1;
//     const newId = idGenerator(newCounter); // Generate new ID using idGenerator function

//     const index = data.findIndex((item) => item.id === formData.id);
//     const newData = [...data];

//     if (index !== -1) {
//       newData[index] = { ...formData, id: newId };
//       alert("Book updated successfully");
//     } else {
//       newData.push({ ...formData, id: newId });
//       alert("Book added successfully");
//     }

//     setData(newData);
//     updateLocalStorage(newData);
//     setFormData({
//       id: "",
//       bookName: "",
//       Description: "",
//       author: "",
//       imgsrc: "",
//     });
//   };
  

//   const handleDelete = (id) => {
//     const newData = data.filter((item) => item.id !== id);
//     setData(newData);
//     updateLocalStorage(newData);
//     alert("Are you sure you want to delete the book?");
//   };

//   const handleEdit = (item) => {
//     setFormData(item);
//     alert("Editing book");
//   };

//   const handleDuplicate = (item) => {
//     const duplicateBook = { ...item }; // Create a duplicate of the selected book
//     // Modify duplicate book ID to avoid conflicts
//     duplicateBook.id = idGenerator(data.length + 1);
//     setData([...data, duplicateBook]); // Add duplicate book to data
//     updateLocalStorage([...data, duplicateBook]); // Update local storage
//     alert("Book duplicated successfully");
//   };

//   return (
//     <div className="container">
//           <div>   <h1>Search Input</h1>
//         <input type="text"  />
//         <button >search</button></div>
//       <div className="row">
    
//         <BookForm
//           onSubmit={handleFormSubmit}
//           formData={formData}
//           setFormData={setFormData}
//         />
//         <BookList
//           data={data}
//           onDelete={handleDelete}
//           onEdit={handleEdit}
//           onDuplicate={handleDuplicate} // Pass handleDuplicate function to BookList
//         />
//       </div>
//     </div>
//   );
// }

// export default App;

// // 