// ============================
// Mobile Menu Toggle
// ============================
const toggleButton = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

toggleButton?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// ============================
// Back to Top Button
// ============================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    const isVisible = window.pageYOffset > 300;
    backToTopBtn?.classList.toggle('opacity-0', !isVisible);
    backToTopBtn?.classList.toggle('invisible', !isVisible);
    backToTopBtn?.classList.toggle('opacity-100', isVisible);
    backToTopBtn?.classList.toggle('visible', isVisible);
});

// ============================
// Funções auxiliares
// ============================

// Coleta dados de um formulário
function getFormData(fields) {
    const data = {};
    fields.forEach(id => {
        const el = document.getElementById(id);
        data[id] = el?.value.trim() || '';
    });
    return data;
}

// Envia dados via fetch
async function sendFormData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const text = await response.text();
    let result = {};
    try {
        result = text ? JSON.parse(text) : {};
    } catch {
        throw new Error('Resposta do servidor não é um JSON válido');
    }

    if (!response.ok) throw new Error(result.error || 'Erro na resposta do servidor');
    return result;
}

// Validação de campos obrigatórios
function validarCamposObrigatorios(data) {
    return Object.values(data).every(val => val && val.trim() !== '');
}

// ============================
// Formulário secundário (#meuForm)
// ============================
const meuForm = document.getElementById('meuForm');

meuForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = getFormData(['nome', 'email', 'telefone', 'servico', 'mensagem']);

    if (!validarCamposObrigatorios(data)) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    try {
        const result = await sendFormData('http://localhost:3000/servicos/submit-form', dados);

        alert(result.mensagem || 'Enviado com sucesso!');
        meuForm.reset();
    } catch (err) {
        console.error('Erro no envio:', err);
        alert(err.message || 'Erro ao enviar o formulário.');
    }
});

// ============================
// Formulário principal (#formulario)
// ============================
const form = document.getElementById('formulario');

form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = getFormData(['nome', 'email', 'telefone', 'servico', 'mensagem']);

    if (!validarCamposObrigatorios(dados)) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    try {
        const resultado = await sendFormData('/servicos/submit-form', dados);
        alert(resultado.mensagem || 'Dados enviados com sucesso!');
        form.reset();
    } catch (err) {
        console.error('Erro no envio:', err);
        alert(err.message || 'Erro ao enviar o formulário. Tente novamente.');
    }
});
