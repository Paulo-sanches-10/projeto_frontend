# People API Frontend

Interface desenvolvida em **Next.js** para consumir a API de pessoas criada em Django REST Framework.

## 🚀 Funcionalidades obrigatórias
- Listagem paginada (5 itens por página)
- Cadastro, edição, exclusão e visualização de pessoas
- Exibição das mensagens de erro vindas da API (ex: CPF inválido, campos faltantes, erros 400/500)
- Validação mínima de formulário antes de enviar
- Exibição da idade calculada automaticamente a partir da data de nascimento (na listagem e nos detalhes)

## ✨ Diferenciais
- Componentização consistente
- Gerenciamento de estado (Zustand ou Context API)
- UX simples, feedbacks claros de carregamento e erro
- Tratamento visual elegante para falhas de API

---

## ⚙️ Instalação

### 1. Clonar o repositório
```bash
git clone https://github.com/seuusuario/people-api-frontend.git
cd people-api-frontend
2. Instalar dependências
npm install


3. Rodar servidor
npm run dev


Frontend disponível em:
- http://localhost:3000

🔗 Integração com Backend
O frontend consome a API do backend disponível em:
http://localhost:8000/api/people/


Certifique-se de que o backend esteja rodando antes de usar a interface.

📊 Fluxo da aplicação
- Página inicial → listagem paginada de pessoas (5 por página)
- Cadastro → formulário para adicionar nova pessoa
- Edição → formulário para atualizar dados existentes
- Detalhes → visualização completa de uma pessoa
- Exclusão → remoção de pessoa com confirmação

🧪 Testes
Rodar testes com:
npm test


Testes cobrem:
- Renderização da listagem com paginação
- Validação mínima de formulário
- Exibição de mensagens de erro da API
- Cálculo e exibição da idade
