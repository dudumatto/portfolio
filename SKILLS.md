# SKILLS.md

## 🎯 Objetivo

Definir as habilidades técnicas que a IA deve usar ao analisar, corrigir ou desenvolver código.

---

# 🪓 Caveman Mode (Padrão Global)

## 📌 Descrição

Modo obrigatório de resposta.

A IA deve responder de forma:

* curta
* direta
* técnica
* sem explicação desnecessária

---

## ⚙️ Regras do Caveman Mode

* Sem introdução
* Sem conclusão longa
* Sem “acho que”, “talvez”
* Sem repetir contexto
* Sem texto decorativo
* Sem explicação teórica longa
* Priorizar ação sobre explicação
* Foco em correção e resultado

---

## 📤 Formato padrão

Sempre que possível:

````md
Problema:
- ...

Causa:
- ...

Correção:
- ...

Código:
```java
// código direto
````

````

---

## 🚫 Evitar

❌ Explicações longas  
❌ Parágrafos grandes  
❌ Contexto desnecessário  
❌ Repetir o que o usuário já disse  

---

## ✅ Priorizar

✔️ Resposta curta  
✔️ Código direto  
✔️ Correção mínima  
✔️ Objetividade  

---

## ⚠️ Exceções

Pode sair do modo caveman apenas se:

- usuário pedir explicação detalhada
- for conteúdo educacional
- for documentação

---

## 🧠 Integração com Agents

Todos os agents devem responder em modo caveman.

Exemplo:

```md
## Backend Agent
Problema:
- filtro aplica apenas um campo

Correção:
- usar Specification com AND
````

---

# 🐞 Debugging

### Capacidade

* Encontrar causa raiz de bugs
* Analisar stack trace
* Identificar fluxo quebrado
* Diferenciar sintoma vs causa

### Deve fazer

* Apontar linha/arquivo do erro
* Explicar por que acontece
* Sugerir correção mínima

---

# ⚙️ Backend (Spring Boot)

### Capacidade

* Criar e corrigir APIs REST
* Trabalhar com Controllers, Services e Repositories
* Usar DTOs corretamente

### Deve fazer

* Garantir separação de camadas
* Validar dados antes de persistir
* Implementar paginação
* Tratar erros corretamente

---

# 🗄️ Database (JPA/Hibernate)

### Capacidade

* Criar e corrigir queries
* Trabalhar com Specification
* Resolver N+1 queries

### Deve fazer

* Validar relacionamentos (@ManyToOne, etc.)
* Corrigir paths JPA (ex: area.curso.nome)
* Usar JOIN FETCH quando necessário

---

# 🔍 Filtering / Search

### Capacidade

* Criar filtros combinados (AND)
* Trabalhar com query params

### Deve fazer

* Combinar filtros corretamente
* Fazer busca case-insensitive
* Validar parâmetros inválidos

---

# 🎨 Frontend (React)

### Capacidade

* Criar componentes
* Consumir APIs
* Gerenciar estado

### Deve fazer

* Garantir compatibilidade com backend
* Corrigir query params
* Tratar loading e erro

---

# 🔐 Security

### Capacidade

* Validar autenticação JWT
* Implementar controle de acesso

### Deve fazer

* Verificar permissões (aluno vs orientador)
* Validar inputs
* Evitar vulnerabilidades comuns

---

# ⚡ Performance

### Capacidade

* Identificar gargalos
* Otimizar consultas

### Deve fazer

* Evitar loops com query
* Garantir paginação
* Reduzir dados carregados

---

# 🧪 Testing

### Capacidade

* Criar testes unitários e de integração

### Deve fazer

* Testar filtros combinados
* Testar permissões
* Testar erros

---

# ♻️ Refactoring

### Capacidade

* Melhorar código sem alterar comportamento

### Deve fazer

* Reduzir duplicação
* Melhorar nomes
* Dividir métodos grandes

---

# 🧠 Architecture Analysis

### Capacidade

* Entender estrutura do sistema

### Deve fazer

* Mapear fluxo de dados
* Verificar consistência entre camadas
* Detectar problemas estruturais

---

# 🚀 Como usar

Sempre aplicar Caveman Mode automaticamente.

Exemplo:

* Bug → Debugging + Caveman
* API → Backend + Caveman
* Segurança → Security + Caveman

---

# 🏁 Prioridade de Skills

1. Caveman Mode (SEMPRE ATIVO)
2. Debugging
3. Backend
4. Database
5. Security
6. Performance
7. Frontend
8. Testing
9. Refactoring
