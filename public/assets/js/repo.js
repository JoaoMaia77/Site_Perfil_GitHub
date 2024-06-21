const urlParams = new URLSearchParams(window.location.search);
const repoName = urlParams.get('repo');

const username = 'SEU_USUARIO_GITHUB';
const token = 'SEU_TOKEN_GITHUB';

fetch(`https://api.github.com/repos/${username}/${repoName}`, {
    headers: {
        'Authorization': `token ${token}`
    }
})
    .then(response => response.json())
    .then(repo => {
    
        document.getElementById('Trepo').textContent = `Repositório: ${repo.name}`;
        document.getElementById('descricao').textContent = repo.description || 'Sem descrição';
        document.getElementById('data').textContent = repo.created_at.split('T')[0];
        document.getElementById('ling').textContent = repo.language || 'Linguagem não informada';
        document.getElementById('link').textContent = repo.html_url;
        document.getElementById('link').href = repo.html_url;


        const iconStar = document.getElementById('iconstar');
        iconStar.innerHTML = `<i class="fa-solid fa-star"></i> <p class="legenda">${repo.stargazers_count}</p>`;

        const iconFork = document.getElementById('iconperson');
        iconFork.innerHTML = `<i class="fa-solid fa-code-fork"></i> <p class="legenda">${repo.forks_count}</p>`;

 
        fetch(repo.languages_url, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(response => response.json())
            .then(languages => {
              const topicosContainer = document.getElementById('topicos-container'); 
          

             
                topicosContainer.innerHTML = '';

                
                for (const language in languages) {
                    const listItem = document.createElement('p');
                    listItem.textContent = language;
                    listItem.classList.add('topico');
                    topicosContainer.appendChild(listItem);
                }
            })
            .catch(error => console.error('Erro ao buscar linguagens:', error));
    })
    .catch(error => console.error('Erro ao buscar dados do repositório:', error));
