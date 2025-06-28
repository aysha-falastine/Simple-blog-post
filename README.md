🌿 The Everyday Muse

A simple, elegant blog for sharing daily inspirations—quotes, reflections, and photos of life’s little joys.
Built with HTML, CSS, JavaScript, and a JSON Server mock backend.
✨ Features

    View All Posts:
    Display all blog posts with titles and images in a clean grid layout.

    View Post Details:
    Click on any post to see its full content and author info.

    Add New Posts:
    Submit a form to create new inspiration posts.

    Edit Existing Posts:
    Update a post’s title and content directly from the details view.

    Delete Posts:
    Remove posts with a single click.

📂 Project Structure

project-folder/
├── index.html
├── css/
│   └── styles.css
├── src/
│   └── index.js
├── db.json
└── README.md

⚙️ Setup Instructions

    Install Dependencies

    Make sure you have Node.js installed.
    Then install JSON Server locally:

npm init -y
npm install json-server

Start JSON Server

In the project folder terminal:

npx json-server db.json

The API will be available at:

http://localhost:3000/posts

Start Live Server

Use an extension like Live Server in VSCode, or run:

    live-server

    This serves your index.html in the browser.

🔗 API Endpoints
Method	Endpoint	Description
GET	/posts	Retrieve all posts
GET	/posts/:id	Retrieve a single post
POST	/posts	Create a new post
PATCH	/posts/:id	Update an existing post
DELETE	/posts/:id	Delete a post
🖥️ Technologies Used

    HTML

    CSS

    JavaScript

    JSON Server

✍️ Author

Asha Mohamed
💡 Inspiration

This project was built as a simple blog to share everyday inspirations in a clean and modern design, with easy-to-understand code and styling.




