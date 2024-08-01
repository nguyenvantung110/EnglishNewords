// Thay thế bằng API key của bạn
const API_KEY = 'AIzaSyDsUflr7kTuKtWacS_P3jVvGn2mCxqkri4';
// Thay thế bằng ID của Google Sheet của bạn
const SHEET_ID = '19_mjN2Uv0Pm6-vvrq9C7brw3VvnJJODIkNo3eeLZOuY';
const SHEET_NAME = 'Sheet1'
const EDIT_SVG = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
const DELETE_SVG = '<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'

function loadWords() {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`)
    .then(response => response.json())
    .then(data => displayWords(data.values))
    .catch(error => console.error('Error:', error));
}

function displayWords(words) {
    words.forEach((word) => {
        const wordItem = document.createElement('tr');
        wordItem.className = 'word-item';
        wordItem.innerHTML = `
                <td>${word[0]}</td>
                <td>${word[1]}</td>
                <td>${word[2]}</td>
                <td onclick="editWord('${word[0]}')">${EDIT_SVG}</td>
                <td onclick="deleteWord('${word[0]}')">${DELETE_SVG}</td>
            `;
        wordList.appendChild(wordItem);
    });

}

function addWord(event) {
    event.preventDefault();
    const newWord = document.getElementById('newWord').value;
    const meaning = document.getElementById('meaning').value;
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A:C',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [[Date.now(), newWord, meaning]]
        }
    }).then(() => {
        loadWords();
        document.getElementById('addWordForm').reset();
    });
}

function editWord(id) {
    // Implement edit functionality
}

function deleteWord(id) {
    // Implement delete functionality
}

document.getElementById('addWordForm').addEventListener('submit', addWord);

gapi.load('client', loadWords);