async function searchGifs() {
    const apiKey = 'ZkM4XR92FwQNTDQn4xAArwZmQF4Im27B';
    const searchInput = document.getElementById('searchInput').value.trim();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchInput}&limit=60`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayGifs(data.data);
    } catch (error) {
        console.error('Error fetching GIFs:', error);
    }
}

function displayGifs(gifs) {
    const gifContainer = document.getElementById('gifContainer');
    gifContainer.innerHTML = '';

    gifs.forEach(gif => {
        const gifElement = document.createElement('div');
        gifElement.classList.add('gif');
        gifElement.innerHTML = `<img src="${gif.images.fixed_height.url}" alt="${gif.title}">`;
        gifContainer.appendChild(gifElement);
    });
}