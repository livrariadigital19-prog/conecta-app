
import React from 'react';
import { Category, Question } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'icebreaker',
    name: 'Quebra-Gelo',
    description: 'Perguntas leves para iniciar qualquer conversa.',
    icon: '❄️',
    gradient: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'deep',
    name: 'Conexão Profunda',
    description: 'Explore valores, sonhos e pensamentos íntimos.',
    icon: '🌊',
    gradient: 'from-purple-600 to-indigo-600'
  },
  {
    id: 'romance',
    name: 'Romance & Crush',
    description: 'Ideal para dates e fortalecer laços afetivos.',
    icon: '❤️',
    gradient: 'from-rose-500 to-pink-500'
  },
  {
    id: 'bold',
    name: 'Ousado',
    description: 'Perguntas picantes e atrevidas para subir o nível.',
    icon: '🔥',
    gradient: 'from-orange-600 to-red-600'
  },
  {
    id: 'work',
    name: 'Carreira & Networking',
    description: 'Perguntas para colegas e ambiente profissional.',
    icon: '💼',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 'funny',
    name: 'Divertidas',
    description: 'Perguntas inusitadas para dar boas risadas.',
    icon: '🎭',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'favorites',
    name: 'Favoritos',
    description: 'Suas perguntas preferidas salvas aqui.',
    icon: '❤️',
    gradient: 'from-rose-400 to-rose-600'
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // ICEBREAKERS
  { id: 'ib1', text: 'Se você pudesse viajar para qualquer lugar agora, para onde iria?', category: 'icebreaker' },
  { id: 'ib2', text: 'Qual foi o melhor café que você já tomou?', category: 'icebreaker' },
  { id: 'ib3', text: 'Você prefere o nascer ou o pôr do sol?', category: 'icebreaker' },
  { id: 'ib4', text: 'Qual é a sua série favorita do momento?', category: 'icebreaker' },
  { id: 'ib5', text: 'O que você mais gosta de fazer no seu tempo livre?', category: 'icebreaker' },
  { id: 'ib6', text: 'Você é uma pessoa mais matinal ou noturna?', category: 'icebreaker' },
  { id: 'ib7', text: 'Qual foi the última música que você ouviu?', category: 'icebreaker' },
  { id: 'ib8', text: 'Cachorro ou gato?', category: 'icebreaker' },
  { id: 'ib9', text: 'Se você pudesse ter um superpoder, qual seria?', category: 'icebreaker' },
  { id: 'ib10', text: 'Qual é o seu prato favorito de infância?', category: 'icebreaker' },
  
  // DEEP
  { id: 'dp1', text: 'Qual é o seu maior medo e por quê?', category: 'deep' },
  { id: 'dp2', text: 'O que traz mais propósito para a sua vida hoje?', category: 'deep' },
  { id: 'dp3', text: 'Se você pudesse mudar uma decisão do seu passado, qual seria?', category: 'deep' },
  { id: 'dp4', text: 'Como você gostaria de ser lembrado pelas pessoas?', category: 'deep' },
  { id: 'dp5', text: 'Qual é a lição mais difícil que a vida já te ensinou?', category: 'deep' },
  { id: 'dp6', text: 'O que significa "sucesso" para você?', category: 'deep' },
  { id: 'dp7', text: 'Qual é a sua memória favorita com a sua família?', category: 'deep' },
  { id: 'dp8', text: 'O que você mais admira em si mesmo?', category: 'deep' },
  { id: 'dp9', text: 'Qual é o seu sonho mais ambicioso?', category: 'deep' },
  { id: 'dp10', text: 'O que te faz sentir verdadeiramente vivo?', category: 'deep' },

  // ROMANCE
  { id: 'rm1', text: 'Qual foi a sua primeira impressão de mim?', category: 'romance' },
  { id: 'rm2', text: 'Qual é a sua linguagem do amor principal?', category: 'romance' },
  { id: 'rm3', text: 'O que você considera imperdoável em um relacionamento?', category: 'romance' },
  { id: 'rm4', text: 'Qual seria o seu encontro perfeito?', category: 'romance' },
  { id: 'rm5', text: 'O que mais te atrai em alguém?', category: 'romance' },
  { id: 'rm6', text: 'Qual é a sua melhor memória romântica?', category: 'romance' },
  { id: 'rm7', text: 'Como você demonstra afeto quando está interessado?', category: 'romance' },
  { id: 'rm8', text: 'Qual música define a sua vida amorosa?', category: 'romance' },
  { id: 'rm9', text: 'Você acredita em alma gêmea?', category: 'romance' },
  { id: 'rm10', text: 'O que você mais valoriza em um parceiro?', category: 'romance' },

  // BOLD (Ousado)
  { id: 'bd1', text: 'Qual é a sua fantasia mais secreta que você nunca contou a ninguém?', category: 'bold' },
  { id: 'bd2', text: 'Qual é a parte do meu corpo que mais te atrai?', category: 'bold' },
  { id: 'bd3', text: 'Qual foi o lugar mais inusitado onde você já ficou com alguém?', category: 'bold' },
  { id: 'bd4', text: 'O que você faria se estivéssemos sozinhos em um elevador agora?', category: 'bold' },
  { id: 'bd5', text: 'Você prefere dominar ou ser dominado?', category: 'bold' },
  { id: 'bd6', text: 'Qual é o seu maior "turn on" imediato?', category: 'bold' },
  { id: 'bd7', text: 'Se pudéssemos fazer qualquer coisa hoje à noite, sem julgamentos, o que seria?', category: 'bold' },
  { id: 'bd8', text: 'Qual mensagem "proibida" você já teve vontade de me mandar?', category: 'bold' },
  { id: 'bd9', text: 'Você gosta de ser provocado ou de provocar?', category: 'bold' },
  { id: 'bd10', text: 'Qual é a sua memória mais quente de nós dois (ou de um encontro)?', category: 'bold' },

  // WORK
  { id: 'wk1', text: 'O que te motivou a escolher a sua carreira atual?', category: 'work' },
  { id: 'wk2', text: 'Qual foi o maior desafio profissional que você já superou?', category: 'work' },
  { id: 'wk3', text: 'Como você lida com o estresse no trabalho?', category: 'work' },
  { id: 'wk4', text: 'Qual habilidade você gostaria de desenvolver este ano?', category: 'work' },
  { id: 'wk5', text: 'Quem é a sua maior referência profissional?', category: 'work' },
  { id: 'wk6', text: 'O que você mais gosta no seu ambiente de trabalho?', category: 'work' },
  { id: 'wk7', text: 'Qual é o seu método favorito de produtividade?', category: 'work' },
  { id: 'wk8', text: 'Como você define um bom líder?', category: 'work' },
  { id: 'wk9', text: 'Trabalho remoto ou presencial?', category: 'work' },
  { id: 'wk10', text: 'Qual projeto você mais se orgulha de ter feito?', category: 'work' },

  // FUNNY
  { id: 'fn1', text: 'Qual é o fato mais aleatório que você conhece?', category: 'funny' },
  { id: 'fn2', text: 'Qual foi a coisa mais estranha que você já comeu?', category: 'funny' },
  { id: 'fn3', text: 'Se você fosse um meme, qual seria?', category: 'funny' },
  { id: 'fn4', text: 'Qual é a sua teoria da conspiração favorita (mesmo que não acredite)?', category: 'funny' },
  { id: 'fn5', text: 'Qual seria a pior música para tocar em um funeral?', category: 'funny' },
  { id: 'fn6', text: 'Se você pudesse ser um animal por um dia, qual seria?', category: 'funny' },
  { id: 'fn7', text: 'Qual é o seu prazer culposo mais vergonhoso?', category: 'funny' },
  { id: 'fn8', text: 'Qual é a piada mais sem graça que você ama?', category: 'funny' },
  { id: 'fn9', text: 'Se você ganhasse na loteria hoje, qual seria a primeira bobagem que compraria?', category: 'funny' },
  { id: 'fn10', text: 'Sanduíche é considerado uma refeição ou lanche?', category: 'funny' },
];
