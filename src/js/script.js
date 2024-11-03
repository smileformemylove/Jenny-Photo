// Ініціалізація змінної для поточного альбому
let currentAlbum = 'default';

// Функція для збереження альбомів у локальному сховищі
function saveAlbumsToLocalStorage(albums) {
    localStorage.setItem('albums', JSON.stringify(albums));
}

// Функція для завантаження альбомів із локального сховища
function loadAlbumsFromLocalStorage() {
    const storedAlbums = localStorage.getItem('albums');
    return storedAlbums ? JSON.parse(storedAlbums) : { 'default': [] }; // Початковий альбом "default"
}

// Функція для відображення фотографій з обраного альбому
function displayImages(images) {
    const previewContainer = document.getElementById('photo-preview');
    previewContainer.innerHTML = ''; // Очищуємо попередні зображення

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.name;

        const photoContainer = document.createElement('div');
        photoContainer.classList.add('photo-container');

        // Створюємо посилання для завантаження зображення
        const downloadLink = document.createElement('a');
        downloadLink.href = image.src;
        downloadLink.download = image.name;
        downloadLink.classList.add('download-link');
        downloadLink.textContent = 'Download';

        // Додаємо зображення і посилання в контейнер
        photoContainer.appendChild(imgElement);
        photoContainer.appendChild(downloadLink);

        previewContainer.appendChild(photoContainer);
    });
}

// Функція для оновлення списку альбомів
function updateAlbumSelect(albums) {
    const albumSelect = document.getElementById('album-select');
    albumSelect.innerHTML = ''; // Очищуємо попередні варіанти альбомів

    // Створюємо елементи <option> для кожного альбому
    Object.keys(albums).forEach(album => {
        const option = document.createElement('option');
        option.value = album;
        option.textContent = album;
        albumSelect.appendChild(option);
    });

    albumSelect.value = currentAlbum; // Встановлюємо обраний альбом
}

// Завантажуємо альбоми з локального сховища при завантаженні сторінки
window.addEventListener('load', function() {
    const storedAlbums = loadAlbumsFromLocalStorage();
    updateAlbumSelect(storedAlbums);
    displayImages(storedAlbums[currentAlbum]);
});

// Додаємо нові зображення у поточний альбом
document.getElementById('file-input').addEventListener('change', function(event) {
    const files = event.target.files;
    const storedAlbums = loadAlbumsFromLocalStorage();
    const albumImages = storedAlbums[currentAlbum];

    // Перебираємо завантажені файли і додаємо їх у альбом
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            albumImages.push({
                name: file.name,
                src: e.target.result
            });

            // Зберігаємо альбоми у локальне сховище
            saveAlbumsToLocalStorage(storedAlbums);

            // Відображаємо нове зображення
            displayImages(albumImages);
        };

        // Читаємо файл як Data URL
        reader.readAsDataURL(file);
    }
});

// Створення нового альбому
document.getElementById('create-album').addEventListener('click', function() {
    const newAlbumName = document.getElementById('new-album-name').value.trim();
    if (newAlbumName) {
        const storedAlbums = loadAlbumsFromLocalStorage();
        if (!storedAlbums[newAlbumName]) {
            storedAlbums[newAlbumName] = []; // Створюємо новий альбом

            saveAlbumsToLocalStorage(storedAlbums);
            updateAlbumSelect(storedAlbums);
            currentAlbum = newAlbumName;
            document.getElementById('new-album-name').value = '';
        } else {
            alert('Album already exists!');
        }
    }
});

// Зміна поточного альбому
document.getElementById('album-select').addEventListener('change', function() {
    currentAlbum = this.value;
    const storedAlbums = loadAlbumsFromLocalStorage();
    displayImages(storedAlbums[currentAlbum]);
});

// Очищення альбому
document.getElementById('clear-storage').addEventListener('click', function() {
    const storedAlbums = loadAlbumsFromLocalStorage();
    storedAlbums[currentAlbum] = [];
    saveAlbumsToLocalStorage(storedAlbums);
    displayImages([]);
});
