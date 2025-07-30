// Mobile Menu Toggle
const toggleButton = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

toggleButton?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn?.classList.remove('opacity-0', 'invisible');
        backToTopBtn?.classList.add('opacity-100', 'visible');
    } else {
        backToTopBtn?.classList.remove('opacity-100', 'visible');
        backToTopBtn?.classList.add('opacity-0', 'invisible');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });

            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Form submission com envio para o backend
const form = document.getElementById('form-contato');

form?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('name').value.trim();
    const telefone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('message').value.trim();

    const dados = {
        nome,
        telefone,
        email,
        mensagem
    };

    // Aqui você pode enviar os dados para o backend usando fetch ou AJAX
    // Exemplo:
    // const response = await fetch('/api/contato', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(dados)
    // });
    // const result = await response.json();
    // alert(result.message);

});

// Outro formulário (se necessário)
document.getElementById('formulario')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const dados = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value,
    servico: document.getElementById('servico').value,
    mensagem: document.getElementById('mensagem').value
  };
  const resposta = await fetch('/servicos/submit-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  const resultado = await resposta.json();
  alert(resultado.mensagem || resultado.erro);
});