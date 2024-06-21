
const username = 'SEU USUÁRIO AQUI';
const token = 'SEU TOLEM AQUI';


fetch(`https://api.github.com/users/${username}`, {
  headers: {
    'Authorization': `token ${token}`
  }
})
.then(response => response.json())
.then(user => {

  const bioElement = document.getElementById('bio');
  if (bioElement){
    bioElement.textContent = user.bio || 'Sem descrição no perfil do GitHub.'; 
  }

 
  const locationElement = document.getElementById('location');
  if (locationElement) {
    locationElement.textContent = user.location || 'Localização não informada.';
  }


  const siteElement = document.getElementById('site');
  if (siteElement) {
    siteElement.textContent = user.blog || 'Site não informado.';
    siteElement.href = user.blog; 
  }


  const followersElement = document.getElementById('followers');
  if (followersElement) {
    followersElement.textContent = user.followers;
  }


  const imgProfileElement = document.getElementById('imgprofile');
  if (imgProfileElement) {
    imgProfileElement.src = user.avatar_url;
    imgProfileElement.alt = `Foto de perfil de ${user.name}`;
  }
})
.catch(error => console.error('Erro ao buscar dados do usuário:', error));


fetch(`https://api.github.com/users/${username}/repos`, {
  headers: {
    'Authorization': `token ${token}`
  }
})
.then(response => response.json())
.then(repos => {
  const repoList = document.getElementById('secao2'); 
  repos.forEach(repo => {
    const card = document.createElement('div');
    card.classList.add('card');

   
    const repoLink = document.createElement('a');
    repoLink.href = `repo.html?repo=${repo.name}`;


    repoLink.innerHTML = `
      <div class="card">
        <h3 class="reptitulo">${repo.name}</h3>
        <p>${repo.description || 'Sem descrição'}</p>
        <div>
          <img src="assets/img/img5.svg" width="20px" alt="Estrela">
          <p class="legenda">${repo.stargazers_count}</p>
          <img src="assets/img/img4.svg" width="25px" alt="Usuário">
          <p class="legenda">${repo.watchers_count}</p>
        </div>
      </div>
    `;

 
    card.appendChild(repoLink);
    
   
    repoList.appendChild(card);
  });
})
.catch(error => console.error('Erro ao buscar repositórios:', error));

//------------------------------------------------------------------------------------------

// Função para buscar dados do JSON Server (mantém a mesma)
async function fetchData(endpoint) {
  try {
    const response = await fetch(`http://localhost:3000/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Erro de requisição: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint}:`, error);
    return [];
  }
}

fetchData('conteudoSugerido').then(conteudo => {
  const carouselInner = document.querySelector('.carousel-inner');
  const carouselIndicators = document.querySelector('.carousel-indicators');

  let carouselItemsHTML = '';
  let indicatorButtonsHTML = '';

  conteudo.forEach((item, index) => {
    const isActive = index === 0 ? 'active' : ''; // Define o primeiro como ativo
    carouselItemsHTML += `
      <div class="carousel-item ${isActive}">
        <a href="${item.link}" target="_blank"><img src="${item.imagem}" class="d-block w-100" alt="Conteúdo Sugerido ${index + 1}"></a>
      </div>
    `;
    indicatorButtonsHTML += `
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" ${isActive} aria-label="Slide ${index + 1}"></button>
    `;
  });

  carouselInner.innerHTML = carouselItemsHTML;
  carouselIndicators.innerHTML = indicatorButtonsHTML;

  // Inicializar o carrossel após a criação dos elementos
  const carousel = new bootstrap.Carousel(carouselExampleIndicators, {
    interval: 2000,
    wrap: true
  });
});

// Buscar colegas de trabalho
fetchData('colegasTrabalho').then(colegas => {
  const secao4 = document.getElementById('secao4');
  colegas.forEach(colega => {
    const divColega = document.createElement('div');
    divColega.classList.add('colega');
    divColega.innerHTML = `
      <a href="${colega.link}" target="_blank">
        <img class="colegaImg" src="${colega.imagem}" alt="${colega.nome}"> 
        <p class="colNome">${colega.nome}</p>
      </a>
    `; // Removido "assets/img/" do src
    secao4.appendChild(divColega);
  });
});
