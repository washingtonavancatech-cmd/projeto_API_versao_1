// Aguarda todo o documento HTML carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // SEÇÃO 1: BOTÃO DE ALTERNÂNCIA DE TEMA (DARK / LIGHT MODE)
    // Seleciona o botão de tema no DOM
    const btnTheme = document.getElementById('btn-theme');
    // Seleciona o ícone de sol/lua dentro do botão
    const themeIcon = document.getElementById('theme-icon');

    // Adiciona o evento de clique ao botão de tema
    btnTheme.addEventListener('click', () => {
        // Alterna a classe 'light-mode' no elemento <body>
        document.body.classList.toggle('light-mode');

        // Verifica se a página agora está no modo claro
        if (document.body.classList.contains('light-mode')) {
            // Se estiver no modo claro, troca o ícone para a lua
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            // Se estiver no modo escuro, troca o ícone para o sol
            themeIcon.className = 'fa-solid fa-sun';
        }
    });

    // SEÇÃO 2: SELETOR DE IDIOMAS (PORTUGUÊS / INGLÊS)
    // Seleciona o botão de troca de idioma
    const btnLang = document.getElementById('btn-lang');
    // Seleciona o texto exibido dentro do botão (EN / PT)
    const langText = document.getElementById('lang-text');
    // Variável de controle do idioma atual (começa em Português)
    let currentLang = 'pt';

    // Adiciona o evento de clique para alternar idiomas
    btnLang.addEventListener('click', () => {
        // Inverte a linguagem atual entre 'pt' e 'en'
        currentLang = currentLang === 'pt' ? 'en' : 'pt';

        // Atualiza a sigla exibida no botão
        langText.textContent = currentLang === 'pt' ? 'EN' : 'PT';

        // Seleciona todos os elementos do HTML que possuem dados de tradução
        const translatableElements = document.querySelectorAll('[data-pt][data-en]');

        // Itera sobre cada elemento alterando o texto para a linguagem selecionada
        translatableElements.forEach(element => {
            // Altera o conteúdo textual lendo o atributo correspondente (data-pt ou data-en)
            element.textContent = element.getAttribute(`data-${currentLang}`);
        });
    });

    // SEÇÃO 3: RECURSO DE LEITURA EM VOZ ALTA (TEXT-TO-SPEECH)
    // Seleciona o botão de leitura por voz
    const btnTts = document.getElementById('btn-tts');

    // Adiciona o evento de clique para iniciar ou parar a leitura
    btnTts.addEventListener('click', () => {
        // Verifica se o navegador possui suporte para a API de síntese de voz
        if ('speechSynthesis' in window) {
            // Se o navegador já estiver falando no momento do clique, cancela a leitura
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                return;
            }

            // Captura o conteúdo de texto da página contido na tag <main>
            const mainText = document.querySelector('main').innerText;

            // Cria uma nova instância de fala com o texto extraído
            const utterance = new SpeechSynthesisUtterance(mainText);

            // Define a linguagem de voz com base no idioma atualmente ativo na página
            utterance.lang = currentLang === 'pt' ? 'pt-BR' : 'en-US';

            // Executa a leitura em voz alta do texto
            window.speechSynthesis.speak(utterance);
        } else {
            // Mensagem exibida caso o navegador não suporte a Web Speech API
            alert('Desculpe, seu navegador não suporta leitura em voz alta (Text-to-Speech).');
        }
    });

});