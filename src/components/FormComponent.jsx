import React, { useState } from 'react';
import * as Papa from 'papaparse';

function FormComponent() {
    const [csvData, setCsvData] = useState(null);
    const [results, setResults] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!csvData) {
            console.error('No CSV file selected.');
            return;
        }

        // Parse CSV data
        const parsedData = Papa.parse(csvData, { header: true });
        const rows = parsedData.data;
        console.log(rows)
        console.log(rows[9].__parsed_extra[2])

        // Extract data from D column starting from the 9th row
        const columnData = [];
        for (let i = 7; i < rows.length; i++) {
            const rowData = rows[i]?.__parsed_extra?.[2];
            if (rowData) {
                columnData.push(rowData);
            }
        }

        // Set the results
        setResults(columnData);
        console.log(columnData);
    }

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