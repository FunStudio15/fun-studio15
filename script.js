document.getElementById("year").textContent = new Date().getFullYear();


// projects

fetch("projects.json")
    .then(response => response.json())
    .then(projects => {

        const container = document.querySelector("#projects > div");

        projects.forEach(project => {

            if (!project.enabled) {
                return;
            }

            const article = document.createElement("article");

            article.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.text}</p>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer">
                    View on itch.io
                </a>
            `;

            container.appendChild(article);
        });
    })
    .catch(error => {
        console.error("Could not load projects.json:", error);
    });


// news

fetch("news.json")
    .then(response => response.json())
    .then(news => {

        const container = document.querySelector("#news > div");

        news.forEach(item => {

            const article = document.createElement("article");

            article.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.date}</p>
                <p>${item.text}</p>
            `;

            container.appendChild(article);
        });
    })
    .catch(error => {
        console.error("Could not load news.json:", error);
    });


// devlogs

fetch("devlogs.json")
    .then(response => response.json())
    .then(devlogs => {

        const container = document.querySelector("#devlogs > div");

        devlogs.forEach(devlog => {

            const article = document.createElement("article");

            article.innerHTML = `
                <h3>${devlog.title}</h3>
                <p>${devlog.date}</p>
                <p>${devlog.text}</p>
            `;

            container.appendChild(article);
        });
    })
    .catch(error => {
        console.error("Could not load devlogs.json:", error);
    });
