/** @format */

const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username); // destructuring assignment, axios() same as axios.get(...)
    createUserCard(data);
    getRepos(username);
  } catch (err) {
    if (err.response.status == 404 || true) {
      createErrorCard(`No profile with this user name`);
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios(APIURL + username + '/repos?sort=created');
    // const reposData = await axios(APIURL + username + '/repos');
    // console.log(reposData === data); // false
    // console.log(reposData.data == data); // false
    // console.log(".headers: ",reposData.headers);
    // console.log(reposData.length); // undefined
    // console.log(reposData.data.length); // 30
    // console.log(data.length); // 30
    // console.log(reposData);
    // console.log(reposData.data); // has a 'data" property, an array of 30. This is not what you see when you go to the website, where just the 'data' array is displayed, even if you look at the page 'source'. Full data returned by axios has {data: Array(30), status: 200. I guess '.data' contains the actual website content
    addReposToCard(data);
  } catch (err) {
    createErrorCard(`Problem fetching repos`);
  }
}

function createUserCard(user) {
  const cardHTML = `
    <div class="card">
      <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
      </div>
      <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
          <li>${user.followers
            .toString()
            .trim()} <strong>Followers</strong></li>
          <li>${user.following} <strong>Following</strong></li>
          <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>
        <div id="repos">
        </div>
      </div>
    </div>`;
  main.innerHTML = cardHTML;
  search.value = ''; // my change, to only clear if have a hit
}

function createErrorCard(msg) {
  const cardHTML = `
  <div class="card">
  <h1>${msg}</h1>
  </div>`;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');
  repos.slice(0, 20).forEach((repo) => {
    const repoEl = document.createElement('a');
    repoEl.classList.add('repo');
    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;
    reposEl.appendChild(repoEl);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    // search.value = '';
  }
});
