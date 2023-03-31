// Define la URL de la API y los parámetros de búsqueda
const apiUrl = 'https://world.openfoodfacts.org/cgi/search.pl';
const searchParams = {
  search_terms: 'pizza',
  page_size: 10,
  json: true,
};

// Realiza la solicitud a la API
fetch(`${apiUrl}?${new URLSearchParams(searchParams)}`)
  .then(response => response.json())
  .then(data => {
    const products = data.products;

    // Itera sobre los productos y los muestra en la página
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'col-md-4';

      const card = document.createElement('div');
      card.className = 'card';

      const img = document.createElement('img');
      img.className = 'card-img-top';
      img.src = product.image_url;

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      const title = document.createElement('h5');
      title.className = 'card-title';
      title.innerText = product.product_name;

      const description = document.createElement('p');
      description.className = 'card-text';
      description.innerText = product.ingredients_text;

      const price = document.createElement('p');
      price.className = 'card-text';
      price.innerText = `$${product.price}`;

      const sourceLink = document.createElement('a');
      sourceLink.className = 'btn btn-primary';
      sourceLink.href = product.url;
      sourceLink.target = '_blank';
      sourceLink.innerText = 'Ver Fuente';
      sourceLink.style.display = 'block';
      sourceLink.style.margin = 'auto';

      cardBody.appendChild(title);
      cardBody.appendChild(description);
      cardBody.appendChild(price);
      cardBody.appendChild(sourceLink);

      card.appendChild(img);
      card.appendChild(cardBody);

      productCard.appendChild(card);
      productsContainer.appendChild(productCard);
    });
  })
  .catch(error => console.error(error));
