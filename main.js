// Thay thế bằng API key của bạn
const API_KEY = 'AIzaSyDsUflr7kTuKtWacS_P3jVvGn2mCxqkri4';
// Thay thế bằng ID của Google Sheet của bạn
const SHEET_ID = '19_mjN2Uv0Pm6-vvrq9C7brw3VvnJJODIkNo3eeLZOuY';
const SHEET_NAME = 'Sheet1'

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
                <td onclick="editWord('${word[0]}')">Sửa</td>
                <td onclick="deleteWord('${word[0]}')">Xóa</td>
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