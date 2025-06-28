const BASE_URL = 'http://localhost:3000/posts';

function main() {
  displayPosts();
  addNewPostListener();
}

function displayPosts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById('post-list');
      postList.innerHTML = '';

      posts.forEach((post, index) => {
        const div = document.createElement('div');
        div.classList.add('post-item');
        div.innerHTML = `
          <h3 data-id="${post.id}" class="post-title" style="cursor:pointer;">${post.title}</h3>
          <img src="${post.image}" alt="${post.title}" />
        `;
        postList.appendChild(div);

        div.querySelector('.post-title').addEventListener('click', () => handlePostClick(post.id));

        // Show the first post automatically
        if (index === 0) {
          handlePostClick(post.id);
        }
      });
    });
}

function handlePostClick(postId) {
  fetch(`${BASE_URL}/${postId}`)
    .then(res => res.json())
    .then(post => {
      const postDetail = document.getElementById('post-detail');
      postDetail.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p><em>By: ${post.author}</em></p>
        <img src="${post.image}" alt="${post.title}" />

        <button id="edit-button">Edit</button>
        <button id="delete-button">Delete</button>
      `;

      document.getElementById('edit-button').addEventListener('click', () => showEditForm(post));
      document.getElementById('delete-button').addEventListener('click', () => deletePost(post.id));
    });
}

function addNewPostListener() {
  const form = document.getElementById('new-post-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.title.value.trim();
    const author = form.author.value.trim();
    const content = form.content.value.trim();
    const image = form.image.value.trim() || 'https://via.placeholder.com/150';

    const newPost = { title, author, content, image };

    // Persist to server
    fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then(post => {
      displayPosts();
      form.reset();
    });
  });
}

function showEditForm(post) {
  const form = document.getElementById('edit-post-form');
  form.classList.remove('hidden');
  form.dataset.id = post.id;
  form.title.value = post.title;
  form.content.value = post.content;

  form.addEventListener('submit', handleEditSubmit);
  document.getElementById('cancel-edit').addEventListener('click', () => {
    form.classList.add('hidden');
    form.removeEventListener('submit', handleEditSubmit);
  });
}

function handleEditSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const id = form.dataset.id;
  const updatedPost = {
    title: form.title.value.trim(),
    content: form.content.value.trim()
  };

  fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost)
  })
    .then(res => res.json())
    .then(() => {
      displayPosts();
      form.classList.add('hidden');
      form.removeEventListener('submit', handleEditSubmit);
    });
}

function deletePost(id) {
  fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    .then(() => {
      displayPosts();
      const postDetail = document.getElementById('post-detail');
      postDetail.innerHTML = '<h2>Post Details</h2><p>Select a post to see details.</p>';
    });
}

document.addEventListener('DOMContentLoaded', main);
