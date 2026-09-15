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
    .then(response => {
        if (!response.ok) {
            throw new Error("devlogs.json didt load ):");
        }

        return response.json();
    })
    .then(devlogs => {

        const container = document.querySelector("#devlogs > div");

        devlogs.forEach(devlog => {

            const article = document.createElement("article");

            article.innerHTML = `
                <button class="devlog-button" type="button">
                    <span>${devlog.title}</span>
                    <span class="devlog-arrow">+</span>
                </button>

                <div class="devlog-content">
                    <p>${devlog.date}</p>
                    <p>${devlog.text}</p>
                </div>
            `;

            const button = article.querySelector(".devlog-button");
            const content = article.querySelector(".devlog-content");
            const arrow = article.querySelector(".devlog-arrow");

            button.addEventListener("click", () => {

                const isOpen = content.classList.contains("open");

                content.classList.toggle("open");
                arrow.textContent = isOpen ? "+" : "−";
            });

            container.appendChild(article);
        });
    })
    .catch(error => {
        console.error("Devlogs:", error);
    });
