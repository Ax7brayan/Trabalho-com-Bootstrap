// Função para carregar os livros do localStorage e exibir no carrossel
function loadBooks() {
    const books = JSON.parse(localStorage.getItem('livros')) || [];
    const carouselItems = document.getElementById('carouselItems');
    carouselItems.innerHTML = ''; // Limpa o carrossel antes de preencher

    if (books.length > 0) {
        books.forEach((book, index) => {
            const activeClass = index === 0 ? 'active' : ''; // Define a primeira imagem como ativa
            const itemHTML = `
                <div class="carousel-item ${activeClass}">
                    <img src="${book.imagem}" class="d-block w-100" alt="${book.titulo}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${book.titulo}</h5>
                        <p>${book.autor}</p>
                    </div>
                </div>
            `;
            carouselItems.innerHTML += itemHTML;
        });
    } else {
        carouselItems.innerHTML = `<div class="carousel-item active"><p class="text-center">Nenhum livro cadastrado</p></div>`;
    }
}

// Função para adicionar livro no localStorage
document.getElementById('btnCadastrar').addEventListener('click', () => {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const descricao = document.getElementById('descricao').value;
    const urlImagem = document.getElementById('urlImagem').value;

    if (titulo && autor && descricao && urlImagem) {
        const newBook = {
            id: Date.now(), // Gerar um ID único
            titulo: titulo,
            autor: autor,
            descricao: descricao,
            imagem: urlImagem,
            quantidade: 1 // A quantidade inicial pode ser 1
        };

        const books = JSON.parse(localStorage.getItem('livros')) || [];
        books.push(newBook);
        localStorage.setItem('livros', JSON.stringify(books));

        // Fechar o modal e limpar o formulário
        document.getElementById('formLivro').reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();

        // Atualizar o carrossel com os livros cadastrados
        loadBooks();
    }
});

// Função para listar livros em uma tabela
document.getElementById('btnListarLivros').addEventListener('click', () => {
    const books = JSON.parse(localStorage.getItem('livros')) || [];
    const tabelaLivrosBody = document.getElementById('tabelaLivrosBody');
    tabelaLivrosBody.innerHTML = ''; // Limpa a tabela antes de preencher

    books.forEach((book) => {
        const rowHTML = `
            <tr>
                <td>${book.id}</td>
                <td>${book.titulo}</td>
                <td>${book.autor}</td>
                <td>${book.quantidade}</td>
                <td>${book.descricao}</td>
            </tr>
        `;
        tabelaLivrosBody.innerHTML += rowHTML;
    });

    // Mostrar a tabela
    document.getElementById('tabelaLivros').style.display = 'block';
});

// Carregar os livros ao carregar a página
window.onload = function() {
    loadBooks();
};
