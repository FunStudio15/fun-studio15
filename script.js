const ANALYTICS_ENABLED = false;

function setStatus(container, message) {
    const status = document.createElement("p");
    status.textContent = message;
    container.replaceChildren(status);
}

document.getElementById("year").textContent = new Date().getFullYear();


// projects

const projectsContainer = document.querySelector("#projects > div");
setStatus(projectsContainer, "Loading projects…");

fetch("projects.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Could not load projects.json: ${response.status}`);
        }
        return response.json();
    })
    .then(projects => {

        projectsContainer.replaceChildren();

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

            projectsContainer.appendChild(article);
        });
    })
    .catch(error => {
        console.error("Could not load projects.json:", error);
        setStatus(projectsContainer, "Projects could not be loaded. Please try again later.");
    });


// news

const newsContainer = document.querySelector("#news > div");
setStatus(newsContainer, "Loading news…");

fetch("news.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Could not load news.json: ${response.status}`);
        }
        return response.json();
    })
    .then(news => {

        newsContainer.replaceChildren();

        news.forEach(item => {

            const article = document.createElement("article");

            article.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.date}</p>
                <p>${item.text}</p>
            `;

            newsContainer.appendChild(article);
        });
    })
    .catch(error => {
        console.error("Could not load news.json:", error);
        setStatus(newsContainer, "News could not be loaded. Please try again later.");
    });


// devlogs

const devlogsContainer = document.querySelector("#devlogs > div");
setStatus(devlogsContainer, "Loading devlogs…");

fetch("devlogs.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("devlogs.json did not load");
        }

        return response.json();
    })
    .then(devlogs => {

        devlogsContainer.replaceChildren();

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

            devlogsContainer.appendChild(article);
        });
    })
    .catch(error => {
        console.error("Devlogs:", error);
        setStatus(devlogsContainer, "Devlogs could not be loaded. Please try again later.");
    });


// analytics

if (ANALYTICS_ENABLED) {

    fetch("https://funstudio15-analytics.funstudio15rblx.workers.dev", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body: JSON.stringify({
            page: window.location.pathname
        }),
        keepalive: true
    })
    .then(async response => {

        const result = await response.text();

        console.log("Analytics HTTP:", response.status);
        console.log("Analytics Response:", result);

        if (!response.ok) {
            throw new Error(`${response.status}: ${result}`);
        }
    })
    .catch(error => {
        console.error("Analytics error:", error.name, error.message);
    });

}
