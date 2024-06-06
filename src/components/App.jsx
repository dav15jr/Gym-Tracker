import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"
import '../firebaseConfig';
import React, { useState } from 'react';

function App() {
const [inputValue1, setInputValue1] = useState('');
const [inputValue2, setInputValue2] = useState('');
const [storedValues, setStoredValues] = useState([]);

const db = getFirestore();

const saveDataToFirestore = async () => {
    const docRef = await addDoc(collection(db, "myCollection"), {
      field1: inputValue1,
      field2: inputValue2,
    });
    alert("Document written to Database");
};


const fetchDataFromFirestore = async () => {
      const querySnapshot = await getDocs(collection(db, "myCollection"));
      const temporaryArr = [];
      querySnapshot.forEach((doc) => {
            temporaryArr.push(doc.data());
      });
      setStoredValues(temporaryArr);
};
    return (
            <div className="App">
                <h1>Save Data to Firebase Firestore</h1>
                    <input
                        type="text"
                        value={inputValue1}
                        onChange={(e) => setInputValue1(e.target.value)}
                    />
                    <input
                        type="text"
                        value={inputValue2}
                        onChange={(e) => setInputValue2(e.target.value)}
                    />
                <button onClick={saveDataToFirestore}>Save to Firestore</button>
                <button onClick={fetchDataFromFirestore}>Fetch from Firestore</button>

                <h2>Stored Values</h2>
                    <ul>
                    {storedValues.map((value, index) => (
                            <li key={index}>
                                Field1: {value.field1}, Field2: {value.field2}
                            </li>
                    ))}
                    </ul>
            </div>

        );
}

export default App;