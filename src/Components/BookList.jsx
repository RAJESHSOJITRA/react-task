import React from 'react';

const BookList = ({ data, onDelete, onEdit }) => {
  return (
    <div className="col-md-8">
      <h2>Books List</h2>
      <div className="row">
        {data.map(item => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card" style={{ width: "18rem" }}>
              <img src={item.imgsrc} className="card-img-top" alt="" />
              <div className="card-body">
                <ul>
                  <li>ID: {item.id}</li>
                  <li>Name: {item.bookName}</li>
                  <li>Description: {item.Description}</li>
                  <li>Author: {item.author}</li>
                </ul>
                <button className="btn btn-danger mr-2" onClick={() => onDelete(item.id)}>Delete</button>
                <button className="btn btn-info" onClick={() => onEdit(item)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
