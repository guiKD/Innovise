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
    const statusValue = statusFilter ? statusFilter.value : "";
    const areaValue = areaFilter ? areaFilter.value : "";
    const cards = Array.from(projectGrid.getElementsByClassName("card"));

    cards.forEach(card => {
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
    });
}

// ---------- EVENTOS DE FILTRO ----------
searchInput.addEventListener("input", filtrarProjetos);
if (statusFilter) statusFilter.addEventListener("change", filtrarProjetos);
if (areaFilter) areaFilter.addEventListener("change", filtrarProjetos);
