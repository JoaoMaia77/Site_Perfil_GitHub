const username = 'JoaoMaia77';
const token = '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';


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
    siteElement.href = user.blog; // Define o link do site
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
