<a name="readme-top"></a>

<div align="center">

  <!-- <img src="https://github.com/RisticDjordje/betting-bot-client-server/blob/master/Media/logo/BettingLogo2.png" alt="logo" width="160" height="auto" /> -->
  <h1>Tasky - Task Manager Kanban Board</h1>
  
  <p>
    <strong>Tasky is a task manager app that upgrades the funcationality offered by Trello. It allows users to create lists, tasks, keep track of what is completed but also add as many subtasks, subsubtasks, etc. as they want. </strong>
  </p>

---

<!-- Badges -->
<p>
  <img alt="contributors" src="https://img.shields.io/github/contributors/RisticDjordje/kanban-board-webapp">
  <img alt="Commits" src="https://badgen.net/github/commits/RisticDjordje/kanban-board-webapp">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/RisticDjordje/kanban-board-webapp">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/RisticDjordje/kanban-board-webapp">  
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/RisticDjordje/kanban-board-webapp">
  <img alt="Languages count" src="https://img.shields.io/github/languages/count/RisticDjordje/kanban-board-webapp">
  <img alt="Language top" src="https://img.shields.io/github/languages/top/RisticDjordje/kanban-board-webapp">
  <img alt="Lines of code" src="https://sloc.xyz/github/RisticDjordje/tasky-task-manager-kanban-board-webapp">
</p> 
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#file-structure">File Structure</a></li>
    <li><a href='#installation'>Installation</a></li>
  </ol>
</details>
<br>

<!-- DEMO -->

## Demo


https://github.com/RisticDjordje/tasky-task-manager-kanban-board-webapp/assets/38117050/b14a177e-0807-4f68-a368-ebb82adde08e

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

<!-- BUILT WITH -->

## Built With

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Client

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ![React][React.js]![javascript][javascript]![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Server

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Features

- [x] Register and log-in into their accounts. Input validation is added on both client and server side.
- [x] Add new lists which are saved in the backend. Users can add as many lists as they want.
- [x] Users can delete, change the name of the list all of which will be saved in the backend.
- [x] Users can reorder lists and that order will be saved.
- [x] In each list, users can add new tasks, which are saved in the backend. Users can add as many tasks as they want.
- [x] Each task can have as many subtasks as the user wants. Each of these subtasks can have their own subsubtasks, and so on. This can be as deep as the user wants.
- [x] Users can hide or show any of these layers of subtasks in an intuitive way (shown by the accordion)
- [x] Users can checkmark a task to indicate that it is completed. This will be saved in the backend.
- [x] Implemented detailed recursive task logic that goes through the task tree to ensure completed logic is working correctly.<details><summary>Click to expand for a more detailed explanation</summary>
      If all subtasks of a task are completed, the task will be automatically checkmarked. Vice versa, if you uncheck a subtask of a task, the task will be unchecked. If the user moves an unchecked task to another list and its former parent task now has all of its subtasks completed, the parent task will be automatically checkmarked. If a task is completed and a new subtask is added to it, the task will be marked as not completed.
      
   All of this will recursively be bubbled up or down for all parent and child tasks. I have decided that if the user marks a task as completed its children won't be marked as complete. The reason for this is that if the user checkmarks the master task as completed by accident and wants to revert back the decision, I don't want to forget how the subtasks were previously checkmarked.
- [x] Users can change task names, delete tasks and move them to other lists. All of these changes will be saved in the backend. Moving a task or a subtask to another list will move it to the bottom of the list and will make it a main task.
- [x] Added feature that shows how many of the tasks are completed in a list. This is shown in the list header. It will be colored green if all tasks are completed.
- [x] Implemented comprehensive user authorization and authentication. Users can only see their own lists and tasks. They can't see other users' lists and tasks. They can not access certain pages without being logged in.
- [x] The design is fully responsive for all devices.

<br><br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- FILE STRUCTURE -->

## File Structure
```
Tasky Task Manager Kanban Board Webapp
│
├── README.md                 # Project overview and documentation
│
├── client/                   # Contains React frontend components and assets
│   ├── .env                  # Environment variables for the client
│   ├── README.md             # Documentation specific to the client side
│   ├── package-lock.json     # Auto-generated file for npm dependencies
│   ├── package.json          # NPM package configuration
│   ├── public/               # Public assets like favicon and HTML template
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/                  # Source files for the React application
│       ├── ApiClient.js      # API client for interacting with the backend
│       ├── App.js            # Main React application component
│       ├── App.test.js       # Tests for the main application
│       ├── components/       # Reusable React components
│       ├── contexts/         # React contexts for state management
│       ├── index.js          # Entry point for the React application
│       └── logo.svg          # Logo file
│
└── server/                   # Contains Flask backend API files
    ├── flask_backend/        # Flask application and its configurations
    │   ├── blueprints/       # Flask blueprints for modularizing the application
    │   │   ├── bp_auth.py    # Blueprint for authentication routes
    │   │   ├── bp_lists.py   # Blueprint for list-related routes
    │   │   └── bp_tasks.py   # Blueprint for task-related routes
    │   ├── main.py           # Main file to run the Flask application
    │   └── models.py         # Database models for the application
    └── requirements.txt      # Required Python packages for the server

```

<br><br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- INSTALLATION -->

## Installation

1. Clone the repo
   ```sh
   git clone
   ```
2. Create a virtual environment (Conda, Pipenv, etc.). Optional but highly recommended.
   ```sh
   conda create -n myenv python
   conda activate myenv
   ```   

#### Frontend

1. Open the frontend folder
   ```sh
   cd client
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the app
   ```sh
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Backend

1. Open the backend folder
   ```sh
   cd server
   ```
2. Install the requirements
   ```sh
   pip install -r requirements.txt
   ```
3. Open 'flask_backend' folder
   ```sh
   cd flask_backend
   ```
4. Run the app
   ```sh
   python main.py
   ```

<br><br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP
## Roadmap

- [x] Add Changelog


<p align="right">(<a href="#readme-top">back to top</a>)</p>
 -->

[contributors-shield]: https://img.shields.io/github/RisticDjordje/betting-bot-client-server.svg?style=for-the-badge
[contributors-url]: https://github.com/RisticDjordje/betting-bot-client-server/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/RisticDjordje/betting-bot-client-server.svg?style=for-the-badge
[forks-url]: https://github.com/RisticDjordje/betting-bot-client-server/network/members
[stars-shield]: https://img.shields.io/github/stars/RisticDjordje/betting-bot-client-server.svg?style=for-the-badge
[stars-url]: https://github.com/RisticDjordje/betting-bot-client-server/stargazers
[issues-shield]: https://img.shields.io/github/issues//RisticDjordje/betting-bot-client-server.svg?style=for-the-badge
[issues-url]: https://github.com/RisticDjordje/betting-bot-client-server/issues
[license-shield]: https://img.shields.io/github/license/RisticDjordje/betting-bot-client-server.svg?style=for-the-badge
[license-url]: https://github.com/RisticDjordje/betting-bot-client-server/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/djordjeristic
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Kotlin]: https://img.shields.io/badge/Kotlin-0095D5?&style=for-the-badge&logo=kotlin&logoColor=white
[Java]: https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[javascript]: https://img.shields.io/badge/JavaScript%20-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black
[express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
