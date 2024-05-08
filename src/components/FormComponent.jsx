import React, { useState } from 'react';

function FormComponent() {
    const [csvData, setCsvData] = useState(null);
    const [results, setResults] = useState([]);

    // First Handle the filechange and set the CSV data
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCsvData(event.target.result);
            };
            reader.readAsText(file);
        }
    };

    const parseCSV = (csvText) => {
        console.log("I am csvText ",csvText);
        const rows = csvText.split('\n');
        console.log("I am rows ",rows);
        const data = rows.map(row => row.split(','));
        console.log("I am data ",data);
        return data;
    }

    const extractColumnData = (data, columnName) => {
        const columnData = [];
        for (let i = 8; i < data.length; i++) {
            const rowData = data[i][columnName.charCodeAt(0) - 'A'.charCodeAt(0)];
            if(rowData) {
                columnData.push(rowData);
            }
        }
        return columnData;
    }

    // Second handle the Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!csvData) {
            console.error('No CSV file selected.');
            return;
        }

        // Parse CSV data
        const parsedData = parseCSV(csvData);
        const columnData = extractColumnData(parsedData, 'D');

        // Set the results
        setResults(columnData);
        console.log(columnData);
    }

    return (
        <div className="max-w-md mx-auto mt-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <label htmlFor="" className='block'>
                    <span className='text-gray-700'>CSV File:</span>
                    <input type="file"
                        name=""
                        id="csvFile"
                        onChange={handleFileChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    />
                </label>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >Submit</button>
            </form>
            {results.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2">Results:</h2>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>{result}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export { FormComponent };