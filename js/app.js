const marvel = {
    render: () => {
        const urlAPI = 'https://gateway.marvel.com:443/v1/public/series?ts=1&apikey=ca64c8841f7624fce474860e03a12c96&hash=8d2a379ff030b984b0d99114c5230110';
        const container = document.querySelector('#marvel-row');
        let contentHTML = '';

        fetch(urlAPI)
            .then(res => res.json())
            .then(json => {
                console.log(json.data.results); // Verifica los datos en la consola

                for (const series of json.data.results) {
                    let urlSeries = series.urls[0]?.url || '#'; // Valida si existe una URL
                    let thumbnailPath = series.thumbnail?.path || 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';
                    let thumbnailExtension = series.thumbnail?.extension || 'jpg';

                    contentHTML += `
                        <div class="col-md-4">
                            <a href="${urlSeries}" target="_blank">
                                <img src="${thumbnailPath}.${thumbnailExtension}" alt="${series.title}" class="img-thumbnail">
                            </a>
                            <h3 class="title">${series.title || "Sin título disponible"}</h3>
                        </div>`;
                }

                container.innerHTML = contentHTML;
            })
            .catch(error => console.error('Error al obtener los datos de la API:', error));
    }
};

marvel.render();
   
