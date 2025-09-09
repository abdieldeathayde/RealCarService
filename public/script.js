// Aguarda o documento estar completamente carregado antes de executar o código.



$(document).ready(function() {

    // --- MÁSCARAS E PLACEHOLDERS ---
    
    // Máscara para o campo de telefone.
    // O placeholder (xx) xxxxx-xxxx é exibido quando o campo está vazio.
    $('#telefone').mask('(00) 00000-0000', {
        placeholder: '(xx) xxxxx-xxxx'
    });

    
    
    
    // Define um placeholder para o campo de e-mail.
    $('#email').attr('placeholder', 'exemplo@dominio.com');

    // --- FUNCIONALIDADES DO SITE (Navegação, etc.) ---
    
    // Toggle do menu mobile.
    $('#menu-toggle').on('click', function() {
        $('#mobile-menu').toggleClass('hidden');
    });

    // Smooth scrolling para os links da navegação.
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const targetId = $(this).attr('href');
        const targetElement = $(targetId);
        
        if (targetElement.length) {
            $('html, body').animate({
                scrollTop: targetElement.offset().top
            }, 800);
            
            // Esconde o menu mobile após clicar em um link.
            $('#mobile-menu').addClass('hidden');
        }
    });

    // Botão "Voltar ao topo" que aparece ao rolar a página.
    const backToTopBtn = $('#back-to-top');
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            backToTopBtn.removeClass('opacity-0 invisible').addClass('opacity-100 visible');
        } else {
            backToTopBtn.removeClass('opacity-100 visible').addClass('opacity-0 invisible');
        }
    });

    // --- LÓGICA DO FORMULÁRIO ---
    
    // Evento de submissão do formulário.
    $('#formulario').on('submit', async function(e) {
        e.preventDefault();

        // Coleta os valores dos campos, removendo espaços extras.
        const nome = $('#nome').val().trim();
        const email = $('#email').val().trim();
        const telefone = $('#telefone').val();
        const servico = $('#servico').val().trim();
        const mensagem = $('#mensagem').val().trim();
        
        // Remove caracteres não numéricos do telefone para a validação.
        const regexTelefone =  /^\(?(\d{2})\)? ?(\d{4,5})-?(\d{4})$/; 
        const telefoneNumerico = telefone.replace(/\D/g, '');

        // Validação principal: verifica se todos os campos obrigatórios estão preenchidos.
        if (!nome || !email || !telefone || !servico || !mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        // Validação específica para o campo de telefone.
        if (telefoneNumerico.length !== 11) {
            alert('Por favor, insira um número de telefone completo com 11 dígitos (DDD + número). Exemplo: (47) 98897-9901');
            $('#telefone').focus(); // Foca o cursor no campo para facilitar a correção.
            return;
        }

        // Se a validação passar, prepara os dados para o envio.
        const dados = { nome, email, telefone, servico, mensagem };

        // Envia os dados para o backend usando `fetch`.
        try {
            const resposta = await fetch('/servicos/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            // Converte a resposta do servidor para JSON.
            const resultado = await resposta.json();

            if (resposta.ok) {
                alert(resultado.mensagem || 'Dados enviados com sucesso!');
                this.reset(); // Limpa o formulário em caso de sucesso.
            } else {
                alert(resultado.erro || 'Erro ao enviar os dados.');
            }
        } catch (err) {
            console.error('Erro no envio:', err);
            alert('Erro ao enviar o formulário. Tente novamente.');
        }
    });
});

