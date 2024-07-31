// Thay thế bằng API key của bạn
const API_KEY = 'AIzaSyDsUflr7kTuKtWacS_P3jVvGn2mCxqkri4';
// Thay thế bằng ID của Google Sheet của bạn
const SHEET_ID = '19_mjN2Uv0Pm6-vvrq9C7brw3VvnJJODIkNo3eeLZOuY';

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(() => {
        loadWords();
    });
}

function loadWords() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A2:C',
    }).then((response) => {
        const words = response.result.values;
        displayWords(words);
    });
}

function displayWords(words) {
    const wordList = document.getElementById('wordList');
    wordList.innerHTML = '';
    words.forEach((word) => {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';
        wordItem.innerHTML = `
            <strong>${word[1]}</strong>: ${word[2]}
            <button onclick="editWord('${word[0]}')">Sửa</button>
            <button onclick="deleteWord('${word[0]}')">Xóa</button>
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

gapi.load('client', initClient);