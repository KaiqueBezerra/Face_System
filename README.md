# Face System

Sistema de autenticação com reconhecimento facial e senha, desenvolvido com React, Vite e TanStack Router. Todo o processamento de rosto acontece localmente no navegador via `face-api.js`. Os dados de usuário ficam armazenados no `localStorage`.

Status: em desenvolvimento (produção em andamento).

## Tecnologias

- React + Vite
- TanStack Router e Devtools
- TanStack Query (infra de devtools já integrada)
- Tailwind CSS
- face-api.js (detecção/descritor facial)
- react-webcam (acesso à câmera)
- pnpm (gerenciador de pacotes)

## Funcionalidades

- Registro de usuário com captura do descritor facial e criação de senha
- Login seguro exigindo combinação de rosto reconhecido + senha correta
- Proteção de rota para `Dashboard` após autenticação
- UI moderna para a Home (Index), Login e Registro
- Processamento 100% local no navegador (sem backend)

## Pré-requisitos

- pnpm instalado (`npm i -g pnpm`)
- Permitir acesso à câmera no navegador

## Instalação e execução

- Instalar dependências: `pnpm install`
- Ambiente de desenvolvimento: `pnpm dev` (abre em `http://localhost:3000`)
- Build de produção: `pnpm build`
- Preview do build: `pnpm preview`
- Testes: `pnpm test`
- Lint: `pnpm lint`
- Formatação: `pnpm format`

## Fluxo de uso

- Acesse a Home (`/`) e navegue para:
  - Registro (`/register`): digite seu nome, senha e posicione o rosto; clique em Registrar
  - Login (`/login`): posicione o rosto, informe nome e senha; clique em Login
- Após sucesso, você é redirecionado ao `Dashboard` (`/dashboard`)
- Logout limpa os dados de sessão

## Estrutura das rotas principais

- `/` Home moderna com CTAs para Login e Registro
- `/register` Registro com feedback visual de rosto detectado
- `/login` Login com identificação facial contínua e campo de senha
- `/dashboard` Tela acessível apenas após autenticação

## Armazenamento e modelos

- Usuários (nome, senha, descritor facial) são guardados em `localStorage` na chave `users`
- Modelos do `face-api.js` são carregados de um CDN público (`https://justadudewhohacks.github.io/face-api.js/models`)

## Roadmap

- Adicionar hashing de senha (ex.: bcryptjs) e política de senha forte
- Persistência segura via backend e token de sessão
- Melhorar UX de consentimento de câmera e mensagens de erro
