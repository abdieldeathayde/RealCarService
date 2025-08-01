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

// Envio do formulário principal para o backend
const form = document.getElementById('formulario');

form?.addEventListener('submit', async function(e) {
  e.preventDefault();
  // Coleta e validação dos campos obrigatórios
  const nome = document.getElementById('nome')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const telefone = document.getElementById('telefone')?.value.trim();
  const servico = document.getElementById('servico')?.value.trim();
  const mensagem = document.getElementById('mensagem')?.value.trim();

  if (!nome || !email || !telefone || !servico || !mensagem) {
    alert('Preencha todos os campos obrigatórios!');
    return;
  }

  const dados = { nome, email, telefone, servico, mensagem };






  try {
    const resposta = await fetch('/api/servicos/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });




    const resultado = await resposta.json();

    if (resposta.ok) {
        alert(resultado.mensagem || 'Dados enviados com sucesso!');
        form.reset();
    } else {
        alert(resultado.erro || 'Erro ao enviar os dados.');
    }
    } catch (err) {
    console.error('Erro no envio:', err);
    alert('Erro ao enviar o formulário. Tente novamente.');
    }
});