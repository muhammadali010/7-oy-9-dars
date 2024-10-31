import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addStudent,
  updateStudent,
  deleteStudent,
  clearAllStudents,
} from './store/studentsSlice';

function App() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.studentsData.students);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({ id: null, name: '', age: '' });

  const handleAddStudent = () => {
    setCurrentStudent({ id: Date.now(), name: '', age: '' });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    setEditMode(true);
    setShowModal(true);
  };

  const handleSaveStudent = () => {
    const { id, name, age } = currentStudent;

    if (!name || !age) {
      alert('Please fill out all fields');
      return;
    }

    if (editMode) {
      dispatch(updateStudent({ id, name, age }));
    } else {
      dispatch(addStudent({ id, name, age }));
    }
    setShowModal(false);
  };

  return (
    <div className="app flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Student Management</h1>

      <button
        onClick={handleAddStudent}
        className="mb-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
      >
        Add Student
      </button>

      <div className="student-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {students.map((student) => (
          <div key={student.id} className="student-card p-6 bg-white border border-gray-300 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <h2 className="text-xl font-bold text-gray-700">{student.name}</h2>
            <p className="text-gray-600">Age: {student.age}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleEditStudent(student)}
                className="px-4 py-1 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 shadow-lg transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteStudent(student.id))}
                className="px-4 py-1 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 shadow-lg transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => dispatch(clearAllStudents())}
        className="mt-8 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300"
      >
        Clear All Students
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal bg-white p-8 rounded-lg shadow-xl w-96 transform transition-all duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {editMode ? 'Edit Student' : 'Add Student'}
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={currentStudent.name}
              onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Age"
              value={currentStudent.age}
              onChange={(e) => setCurrentStudent({ ...currentStudent, age: e.target.value })}
              className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-4 px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 shadow-md transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStudent}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
