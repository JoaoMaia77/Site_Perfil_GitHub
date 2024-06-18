const username = 'JoaoMaia77';
const token = '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';

// Busca os dados do usuário (incluindo a bio)
fetch(`https://api.github.com/users/${username}`, {
  headers: {
    'Authorization': `token ${token}`
  }
})
.then(response => response.json())
.then(user => {
  // Insere a bio no elemento com id "bio"
  const bioElement = document.getElementById('bio');
  if (bioElement){
    bioElement.textContent = user.bio || 'Sem descrição no perfil do GitHub.'; 
  }

  // Insere a localização no elemento com id "location"
  const locationElement = document.getElementById('location');
  if (locationElement) {
    locationElement.textContent = user.location || 'Localização não informada.';
  }

  // Insere o site (blog) no elemento com id "site"
  const siteElement = document.getElementById('site');
  if (siteElement) {
    siteElement.textContent = user.blog || 'Site não informado.';
    siteElement.href = user.blog; // Define o link do site
  }

  // Insere o número de seguidores no elemento com id "followers"
  const followersElement = document.getElementById('followers');
  if (followersElement) {
    followersElement.textContent = user.followers;
  }

  // Insere a imagem de perfil no elemento com id "imgprofile"
  const imgProfileElement = document.getElementById('imgprofile');
  if (imgProfileElement) {
    imgProfileElement.src = user.avatar_url;
    imgProfileElement.alt = `Foto de perfil de ${user.name}`;
  }
})
.catch(error => console.error('Erro ao buscar dados do usuário:', error));

// Busca os repositórios do usuário
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

    // Cria o link para repo.html com o nome do repositório como parâmetro
    const repoLink = document.createElement('a');
    repoLink.href = `repo.html?repo=${repo.name}`;

    // Adiciona o conteúdo do card dentro do link
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

    // Adiciona o link ao card
    card.appendChild(repoLink);
    
    // Adiciona o card à lista de repositórios
    repoList.appendChild(card);
  });
})
.catch(error => console.error('Erro ao buscar repositórios:', error));
