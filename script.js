// Seleciona elementos
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const areaFilter = document.getElementById("areaFilter");
const projectGrid = document.getElementById("projectGrid");
const addProjectForm = document.getElementById("addProjectForm");

let editMode = null; // card que está sendo editado

// ---------- FUNÇÃO DE FILTRAR ----------
function filtrarProjetos() {
    const searchText = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;
    const areaValue = areaFilter.value;
    const cards = projectGrid.getElementsByClassName("card");

    for (let card of cards) {
        const titulo = card.querySelector("h3").innerText.toLowerCase();
        const descricao = card.querySelector("p").innerText.toLowerCase();
        const cardStatus = card.getAttribute("data-status");
        const cardArea = card.getAttribute("data-area");

        let visivel = true;

        if (searchText && !titulo.includes(searchText) && !descricao.includes(searchText)) {
            visivel = false;
        }
        if (statusValue && cardStatus !== statusValue) {
            visivel = false;
        }
        if (areaValue && cardArea !== areaValue) {
            visivel = false;
        }

        card.style.display = visivel ? "flex" : "none";
    }
}

// ---------- FUNÇÃO PARA CRIAR CARD ----------
function criarCard({ titulo, descricao, status, area, tags, autor, data }) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-status", status);
    card.setAttribute("data-area", area);

    card.innerHTML = `
    <div class="card-header">
      <h3>${titulo}</h3>
      <span class="status ${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </div>
    <p>${descricao}</p>
    <div class="tags">
      ${tags.map(tag => `<span class="tag">${tag.trim()}</span>`).join("")}
    </div>
    <div class="card-footer">
      <span>👤 ${autor}</span>
      <span>📅 ${data}</span>
    </div>
    <div class="actions">
      <button class="edit-btn">Editar</button>
      <button class="delete-btn">Remover</button>
    </div>
    <a href="#" class="btn">Ver Detalhes</a>
  `;

    // Botão remover
    card.querySelector(".delete-btn").addEventListener("click", () => {
        card.remove();
    });

    // Botão editar
    card.querySelector(".edit-btn").addEventListener("click", () => {
        document.getElementById("titulo").value = titulo;
        document.getElementById("descricao").value = descricao;
        document.getElementById("status").value = status;
        document.getElementById("area").value = area;
        document.getElementById("tags").value = tags.join(", ");
        document.getElementById("autor").value = autor;
        document.getElementById("data").value = data;

        editMode = card; // armazenar referência
    });

    return card;
}

// ---------- EVENTO SUBMIT DO FORMULÁRIO ----------
addProjectForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const status = document.getElementById("status").value;
    const area = document.getElementById("area").value;
    const tagsInput = document.getElementById("tags").value;
    const autor = document.getElementById("autor").value;
    const data = document.getElementById("data").value;

    const novoProjeto = {
        titulo,
        descricao,
        status,
        area,
        tags: tagsInput ? tagsInput.split(",") : [],
        autor,
        data,
    };

    if (editMode) {
        // Atualizar card existente
        const novoCard = criarCard(novoProjeto);
        projectGrid.replaceChild(novoCard, editMode);
        editMode = null;
    } else {
        // Criar novo card
        const card = criarCard(novoProjeto);
        projectGrid.appendChild(card);
    }

    addProjectForm.reset();
});

// ---------- EVENTOS DE FILTRO ----------
searchInput.addEventListener("input", filtrarProjetos);
statusFilter.addEventListener("change", filtrarProjetos);
areaFilter.addEventListener("change", filtrarProjetos);
