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
const form = document.getElementById('formulario');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = {
    nome: form.nome.value,
    email: form.email.value,
    telefone: form.telefone.value,
    servico: form.servico.value,
    mensagem: form.mensagem.value
  };

  try {
    const resposta = await fetch('http://127.0.0.1:3000/api/servicos/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    alert(resultado.mensagem || resultado.erro);

    if (resposta.ok) {
      form.reset();
    }
  } catch (err) {
    alert('Erro ao enviar o formulário. Tente novamente.');
    //console.error(err);
  }
});
