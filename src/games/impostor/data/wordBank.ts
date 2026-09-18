import { Word } from '../types';

// ============================================================
// BANCO DE PALAVRAS — organizado por dificuldade
// Ordem: FÁCIL -> MÉDIO -> DIFÍCIL
// Dica do impostor: sempre UMA ÚNICA PALAVRA (nunca frase)
// ============================================================

export const WORD_BANK: Word[] = [

  // ==================== FÁCIL ====================

  // --- animais ---
  { id: 'animais_easy_1', value: 'Cachorro', category: 'animais', difficulty: 'easy', impostorHint: 'Companhia' },
  { id: 'animais_easy_2', value: 'Leão', category: 'animais', difficulty: 'easy', impostorHint: 'Selvagem' },
  { id: 'animais_easy_3', value: 'Elefante', category: 'animais', difficulty: 'easy', impostorHint: 'Grandeza' },
  { id: 'animais_easy_4', value: 'Pinguim', category: 'animais', difficulty: 'easy', impostorHint: 'Antártida' },
  { id: 'animais_easy_5', value: 'Tartaruga', category: 'animais', difficulty: 'easy', impostorHint: 'Longevidade' },
  { id: 'animais_easy_6', value: 'Tubarão', category: 'animais', difficulty: 'easy', impostorHint: 'Oceano' },
  { id: 'animais_easy_7', value: 'Cobra', category: 'animais', difficulty: 'easy', impostorHint: 'Rastejante' },
  { id: 'animais_easy_8', value: 'Macaco', category: 'animais', difficulty: 'easy', impostorHint: 'Floresta' },
  { id: 'animais_easy_9', value: 'Coruja', category: 'animais', difficulty: 'easy', impostorHint: 'Noite' },
  { id: 'animais_easy_10', value: 'Gato', category: 'animais', difficulty: 'easy', impostorHint: 'Bigodes' },

  // --- comidas ---
  { id: 'comidas_easy_1', value: 'Pizza', category: 'comidas', difficulty: 'easy', impostorHint: 'Forno' },
  { id: 'comidas_easy_2', value: 'Hambúrguer', category: 'comidas', difficulty: 'easy', impostorHint: 'Lanche' },
  { id: 'comidas_easy_3', value: 'Sushi', category: 'comidas', difficulty: 'easy', impostorHint: 'Japão' },
  { id: 'comidas_easy_4', value: 'Churrasco', category: 'comidas', difficulty: 'easy', impostorHint: 'Domingo' },
  { id: 'comidas_easy_5', value: 'Feijoada', category: 'comidas', difficulty: 'easy', impostorHint: 'Inverno' },
  { id: 'comidas_easy_6', value: 'Sorvete', category: 'comidas', difficulty: 'easy', impostorHint: 'Verão' },
  { id: 'comidas_easy_7', value: 'Bolo', category: 'comidas', difficulty: 'easy', impostorHint: 'Festa' },
  { id: 'comidas_easy_8', value: 'Chocolate', category: 'comidas', difficulty: 'easy', impostorHint: 'Doce' },
  { id: 'comidas_easy_9', value: 'Macarrão', category: 'comidas', difficulty: 'easy', impostorHint: 'Itália' },
  { id: 'comidas_easy_10', value: 'Salada', category: 'comidas', difficulty: 'easy', impostorHint: 'Leve' },

  // --- esportes ---
  { id: 'esportes_easy_1', value: 'Futebol', category: 'esportes', difficulty: 'easy', impostorHint: 'Estádio' },
  { id: 'esportes_easy_2', value: 'Basquete', category: 'esportes', difficulty: 'easy', impostorHint: 'Quadra' },
  { id: 'esportes_easy_3', value: 'Natação', category: 'esportes', difficulty: 'easy', impostorHint: 'Água' },
  { id: 'esportes_easy_4', value: 'Tênis', category: 'esportes', difficulty: 'easy', impostorHint: 'Individual' },
  { id: 'esportes_easy_5', value: 'Vôlei', category: 'esportes', difficulty: 'easy', impostorHint: 'Rodízio' },
  { id: 'esportes_easy_6', value: 'Boxe', category: 'esportes', difficulty: 'easy', impostorHint: 'Combate' },
  { id: 'esportes_easy_7', value: 'Ciclismo', category: 'esportes', difficulty: 'easy', impostorHint: 'Pedal' },
  { id: 'esportes_easy_8', value: 'Judô', category: 'esportes', difficulty: 'easy', impostorHint: 'Japão' },
  { id: 'esportes_easy_9', value: 'Atletismo', category: 'esportes', difficulty: 'easy', impostorHint: 'Velocidade' },
  { id: 'esportes_easy_10', value: 'Surfe', category: 'esportes', difficulty: 'easy', impostorHint: 'Onda' },

  // --- filmes_e_series ---
  { id: 'filmes_easy_1', value: 'Titanic', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Navio' },
  { id: 'filmes_easy_2', value: 'Star Wars', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Galáxia' },
  { id: 'filmes_easy_3', value: 'Harry Potter', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Escola' },
  { id: 'filmes_easy_4', value: 'Vingadores', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Equipe' },
  { id: 'filmes_easy_5', value: 'Batman', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Gotham' },
  { id: 'filmes_easy_6', value: 'Matrix', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Pílula' },
  { id: 'filmes_easy_7', value: 'O Senhor dos Anéis', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Fantasia' },
  { id: 'filmes_easy_8', value: 'Jurassic Park', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Jurássico' },
  { id: 'filmes_easy_9', value: 'Stranger Things', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Mistério' },
  { id: 'filmes_easy_10', value: 'Game of Thrones', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Realeza' },

  // --- lugares ---
  { id: 'lugares_easy_1', value: 'Praia', category: 'lugares', difficulty: 'easy', impostorHint: 'Verão' },
  { id: 'lugares_easy_2', value: 'Cinema', category: 'lugares', difficulty: 'easy', impostorHint: 'Sessão' },
  { id: 'lugares_easy_3', value: 'Zoológico', category: 'lugares', difficulty: 'easy', impostorHint: 'Animais' },
  { id: 'lugares_easy_4', value: 'Hospital', category: 'lugares', difficulty: 'easy', impostorHint: 'Urgência' },
  { id: 'lugares_easy_5', value: 'Escola', category: 'lugares', difficulty: 'easy', impostorHint: 'Estudantes' },
  { id: 'lugares_easy_6', value: 'Shopping', category: 'lugares', difficulty: 'easy', impostorHint: 'Lojas' },
  { id: 'lugares_easy_7', value: 'Academia', category: 'lugares', difficulty: 'easy', impostorHint: 'Treino' },
  { id: 'lugares_easy_8', value: 'Parque', category: 'lugares', difficulty: 'easy', impostorHint: 'Passeio' },
  { id: 'lugares_easy_9', value: 'Aeroporto', category: 'lugares', difficulty: 'easy', impostorHint: 'Viagem' },
  { id: 'lugares_easy_10', value: 'Biblioteca', category: 'lugares', difficulty: 'easy', impostorHint: 'Pesquisa' },

  // --- jogos ---
  { id: 'jogos_easy_1', value: 'Minecraft', category: 'jogos', difficulty: 'easy', impostorHint: 'Construção' },
  { id: 'jogos_easy_2', value: 'Fortnite', category: 'jogos', difficulty: 'easy', impostorHint: 'Tempestade' },
  { id: 'jogos_easy_3', value: 'Super Mario', category: 'jogos', difficulty: 'easy', impostorHint: 'Cogumelo' },
  { id: 'jogos_easy_4', value: 'League of Legends', category: 'jogos', difficulty: 'easy', impostorHint: 'Campeões' },
  { id: 'jogos_easy_5', value: 'GTA', category: 'jogos', difficulty: 'easy', impostorHint: 'Cidade' },
  { id: 'jogos_easy_6', value: 'Pokémon', category: 'jogos', difficulty: 'easy', impostorHint: 'Treinador' },
  { id: 'jogos_easy_7', value: 'FIFA', category: 'jogos', difficulty: 'easy', impostorHint: 'Futebol' },
  { id: 'jogos_easy_8', value: 'Counter-Strike', category: 'jogos', difficulty: 'easy', impostorHint: 'Equipe' },
  { id: 'jogos_easy_9', value: 'The Sims', category: 'jogos', difficulty: 'easy', impostorHint: 'Casas' },
  { id: 'jogos_easy_10', value: 'Resident Evil', category: 'jogos', difficulty: 'easy', impostorHint: 'Terror' },

  // --- musica ---
  { id: 'musica_easy_1', value: 'Rock', category: 'musica', difficulty: 'easy', impostorHint: 'Distorsão' },
  { id: 'musica_easy_2', value: 'Sertanejo', category: 'musica', difficulty: 'easy', impostorHint: 'Interior' },
  { id: 'musica_easy_3', value: 'Funk', category: 'musica', difficulty: 'easy', impostorHint: 'Baile' },
  { id: 'musica_easy_4', value: 'Violão', category: 'musica', difficulty: 'easy', impostorHint: 'Madeira' },
  { id: 'musica_easy_5', value: 'Bateria', category: 'musica', difficulty: 'easy', impostorHint: 'Ritmo' },
  { id: 'musica_easy_6', value: 'Piano', category: 'musica', difficulty: 'easy', impostorHint: 'Harmonia' },
  { id: 'musica_easy_7', value: 'Microfone', category: 'musica', difficulty: 'easy', impostorHint: 'Cantor' },
  { id: 'musica_easy_8', value: 'Palco', category: 'musica', difficulty: 'easy', impostorHint: 'Plateia' },
  { id: 'musica_easy_9', value: 'Orquestra', category: 'musica', difficulty: 'easy', impostorHint: 'Concerto' },
  { id: 'musica_easy_10', value: 'Eletrônica', category: 'musica', difficulty: 'easy', impostorHint: 'Batida' },

  // --- cotidiano ---
  { id: 'cotidiano_easy_1', value: 'Banho', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Higiene' },
  { id: 'cotidiano_easy_2', value: 'Dormir', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Cama' },
  { id: 'cotidiano_easy_3', value: 'Trabalhar', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Rotina' },
  { id: 'cotidiano_easy_4', value: 'Escovar os Dentes', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Higiene' },
  { id: 'cotidiano_easy_5', value: 'Almoçar', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Meio-dia' },
  { id: 'cotidiano_easy_6', value: 'Ler', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Páginas' },
  { id: 'cotidiano_easy_7', value: 'Assistir TV', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Sala' },
  { id: 'cotidiano_easy_8', value: 'Chorar', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Emoção' },
  { id: 'cotidiano_easy_9', value: 'Sorrir', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Expressão' },
  { id: 'cotidiano_easy_10', value: 'Fazer Compras', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Carrinho' },

  // --- objetos ---
  { id: 'objetos_easy_1', value: 'Cadeira', category: 'objetos', difficulty: 'easy', impostorHint: 'Móveis' },
  { id: 'objetos_easy_2', value: 'Celular', category: 'objetos', difficulty: 'easy', impostorHint: 'Aplicativos' },
  { id: 'objetos_easy_3', value: 'Guarda-chuva', category: 'objetos', difficulty: 'easy', impostorHint: 'Temporal' },
  { id: 'objetos_easy_4', value: 'Espelho', category: 'objetos', difficulty: 'easy', impostorHint: 'Vaidade' },
  { id: 'objetos_easy_5', value: 'Relógio', category: 'objetos', difficulty: 'easy', impostorHint: 'Tempo' },
  { id: 'objetos_easy_6', value: 'Geladeira', category: 'objetos', difficulty: 'easy', impostorHint: 'Cozinha' },
  { id: 'objetos_easy_7', value: 'Chave', category: 'objetos', difficulty: 'easy', impostorHint: 'Acesso' },
  { id: 'objetos_easy_8', value: 'Copo', category: 'objetos', difficulty: 'easy', impostorHint: 'Bebida' },
  { id: 'objetos_easy_9', value: 'Óculos', category: 'objetos', difficulty: 'easy', impostorHint: 'Visão' },
  { id: 'objetos_easy_10', value: 'Tesoura', category: 'objetos', difficulty: 'easy', impostorHint: 'Recorte' },

  // --- profissoes ---
  { id: 'profissoes_easy_1', value: 'Médico', category: 'profissoes', difficulty: 'easy', impostorHint: 'Consultório' },
  { id: 'profissoes_easy_2', value: 'Professor', category: 'profissoes', difficulty: 'easy', impostorHint: 'Escola' },
  { id: 'profissoes_easy_3', value: 'Policial', category: 'profissoes', difficulty: 'easy', impostorHint: 'Patrulha' },
  { id: 'profissoes_easy_4', value: 'Advogado', category: 'profissoes', difficulty: 'easy', impostorHint: 'Defesa' },
  { id: 'profissoes_easy_5', value: 'Cozinheiro', category: 'profissoes', difficulty: 'easy', impostorHint: 'Receita' },
  { id: 'profissoes_easy_6', value: 'Engenheiro', category: 'profissoes', difficulty: 'easy', impostorHint: 'Cálculo' },
  { id: 'profissoes_easy_7', value: 'Bombeiro', category: 'profissoes', difficulty: 'easy', impostorHint: 'Resgate' },
  { id: 'profissoes_easy_8', value: 'Piloto', category: 'profissoes', difficulty: 'easy', impostorHint: 'Voo' },
  { id: 'profissoes_easy_9', value: 'Fotógrafo', category: 'profissoes', difficulty: 'easy', impostorHint: 'Retrato' },
  { id: 'profissoes_easy_10', value: 'Mecânico', category: 'profissoes', difficulty: 'easy', impostorHint: 'Oficina' },

  // ==================== MÉDIO ====================

  // --- animais ---
  { id: 'animais_medium_1', value: 'Camaleão', category: 'animais', difficulty: 'medium', impostorHint: 'Mudança' },
  { id: 'animais_medium_2', value: 'Morcego', category: 'animais', difficulty: 'medium', impostorHint: 'Caverna' },
  { id: 'animais_medium_3', value: 'Canguru', category: 'animais', difficulty: 'medium', impostorHint: 'Austrália' },
  { id: 'animais_medium_4', value: 'Polvo', category: 'animais', difficulty: 'medium', impostorHint: 'Marinho' },
  { id: 'animais_medium_5', value: 'Girafa', category: 'animais', difficulty: 'medium', impostorHint: 'Altura' },

  // --- comidas ---
  { id: 'comidas_medium_1', value: 'Lasanha', category: 'comidas', difficulty: 'medium', impostorHint: 'Forno' },
  { id: 'comidas_medium_2', value: 'Tapioca', category: 'comidas', difficulty: 'medium', impostorHint: 'Brasil' },
  { id: 'comidas_medium_3', value: 'Coxinha', category: 'comidas', difficulty: 'medium', impostorHint: 'Festa' },
  { id: 'comidas_medium_4', value: 'Risoto', category: 'comidas', difficulty: 'medium', impostorHint: 'Itália' },
  { id: 'comidas_medium_5', value: 'Fondue', category: 'comidas', difficulty: 'medium', impostorHint: 'Mesa' },

  // --- esportes ---
  { id: 'esportes_medium_1', value: 'Handebol', category: 'esportes', difficulty: 'medium', impostorHint: 'Quadra' },
  { id: 'esportes_medium_2', value: 'Rúgbi', category: 'esportes', difficulty: 'medium', impostorHint: 'Contato' },
  { id: 'esportes_medium_3', value: 'Esgrima', category: 'esportes', difficulty: 'medium', impostorHint: 'Duelo' },
  { id: 'esportes_medium_4', value: 'Golfe', category: 'esportes', difficulty: 'medium', impostorHint: 'Campo' },
  { id: 'esportes_medium_5', value: 'Badminton', category: 'esportes', difficulty: 'medium', impostorHint: 'Raquete' },

  // --- filmes_e_series ---
  { id: 'filmes_medium_1', value: 'Breaking Bad', category: 'filmes_e_series', difficulty: 'medium', impostorHint: 'Metanfetamina' },
  { id: 'filmes_medium_2', value: 'A Casa de Papel', category: 'filmes_e_series', difficulty: 'medium', impostorHint: 'Máscaras' },
  { id: 'filmes_medium_3', value: 'Friends', category: 'filmes_e_series', difficulty: 'medium', impostorHint: 'Manhattan' },
  { id: 'filmes_medium_4', value: 'Round 6', category: 'filmes_e_series', difficulty: 'medium', impostorHint: 'Coreia' },
  { id: 'filmes_medium_5', value: 'Interestelar', category: 'filmes_e_series', difficulty: 'medium', impostorHint: 'Espaço' },

  // --- lugares ---
  { id: 'lugares_medium_1', value: 'Cemitério', category: 'lugares', difficulty: 'medium', impostorHint: 'Memória' },
  { id: 'lugares_medium_2', value: 'Fazenda', category: 'lugares', difficulty: 'medium', impostorHint: 'Interior' },
  { id: 'lugares_medium_3', value: 'Delegacia', category: 'lugares', difficulty: 'medium', impostorHint: 'Polícia' },
  { id: 'lugares_medium_4', value: 'Igreja', category: 'lugares', difficulty: 'medium', impostorHint: 'Celebração' },
  { id: 'lugares_medium_5', value: 'Estádio', category: 'lugares', difficulty: 'medium', impostorHint: 'Torcida' },

  // --- jogos ---
  { id: 'jogos_medium_1', value: 'Among Us', category: 'jogos', difficulty: 'medium', impostorHint: 'Tripulação' },
  { id: 'jogos_medium_2', value: 'Valorant', category: 'jogos', difficulty: 'medium', impostorHint: 'Competição' },
  { id: 'jogos_medium_3', value: 'Roblox', category: 'jogos', difficulty: 'medium', impostorHint: 'Criação' },
  { id: 'jogos_medium_4', value: 'Zelda', category: 'jogos', difficulty: 'medium', impostorHint: 'Fantasia' },
  { id: 'jogos_medium_5', value: 'Animal Crossing', category: 'jogos', difficulty: 'medium', impostorHint: 'Vizinhança' },

  // --- musica ---
  { id: 'musica_medium_1', value: 'Reggae', category: 'musica', difficulty: 'medium', impostorHint: 'Ilha' },
  { id: 'musica_medium_2', value: 'Jazz', category: 'musica', difficulty: 'medium', impostorHint: 'Improviso' },
  { id: 'musica_medium_3', value: 'Pagode', category: 'musica', difficulty: 'medium', impostorHint: 'Roda' },
  { id: 'musica_medium_4', value: 'Ópera', category: 'musica', difficulty: 'medium', impostorHint: 'Teatro' },
  { id: 'musica_medium_5', value: 'Hip Hop', category: 'musica', difficulty: 'medium', impostorHint: 'Microfone' },

  // --- cotidiano ---
  { id: 'cotidiano_medium_1', value: 'Reunião', category: 'cotidiano', difficulty: 'medium', impostorHint: 'Trabalho' },
  { id: 'cotidiano_medium_2', value: 'Exercitar-se', category: 'cotidiano', difficulty: 'medium', impostorHint: 'Energia' },
  { id: 'cotidiano_medium_3', value: 'Cozinhar', category: 'cotidiano', difficulty: 'medium', impostorHint: 'Receita' },
  { id: 'cotidiano_medium_4', value: 'Estudar', category: 'cotidiano', difficulty: 'medium', impostorHint: 'Prova' },
  { id: 'cotidiano_medium_5', value: 'Viajar', category: 'cotidiano', difficulty: 'medium', impostorHint: 'Destino' },

  // --- objetos ---
  { id: 'objetos_medium_1', value: 'Liquidificador', category: 'objetos', difficulty: 'medium', impostorHint: 'Cozinha' },
  { id: 'objetos_medium_2', value: 'Extintor', category: 'objetos', difficulty: 'medium', impostorHint: 'Emergência' },
  { id: 'objetos_medium_3', value: 'Termômetro', category: 'objetos', difficulty: 'medium', impostorHint: 'Temperatura' },
  { id: 'objetos_medium_4', value: 'Grampeador', category: 'objetos', difficulty: 'medium', impostorHint: 'Escritório' },
  { id: 'objetos_medium_5', value: 'Ventilador', category: 'objetos', difficulty: 'medium', impostorHint: 'Verão' },

  // --- profissoes ---
  { id: 'profissoes_medium_1', value: 'Dentista', category: 'profissoes', difficulty: 'medium', impostorHint: 'Consultório' },
  { id: 'profissoes_medium_2', value: 'Veterinário', category: 'profissoes', difficulty: 'medium', impostorHint: 'Clínica' },
  { id: 'profissoes_medium_3', value: 'Arquiteto', category: 'profissoes', difficulty: 'medium', impostorHint: 'Construção' },
  { id: 'profissoes_medium_4', value: 'Jornalista', category: 'profissoes', difficulty: 'medium', impostorHint: 'Notícia' },
  { id: 'profissoes_medium_5', value: 'Farmacêutico', category: 'profissoes', difficulty: 'medium', impostorHint: 'Farmácia' },

  // ==================== DIFÍCIL ====================

  // --- animais ---
  { id: 'animais_hard_1', value: 'Ornitorrinco', category: 'animais', difficulty: 'hard', impostorHint: 'Austrália' },
  { id: 'animais_hard_2', value: 'Axolote', category: 'animais', difficulty: 'hard', impostorHint: 'Salamandra' },
  { id: 'animais_hard_3', value: 'Equidna', category: 'animais', difficulty: 'hard', impostorHint: 'Mamífero' },
  { id: 'animais_hard_4', value: 'Narval', category: 'animais', difficulty: 'hard', impostorHint: 'Ártico' },
  { id: 'animais_hard_5', value: 'Pangolim', category: 'animais', difficulty: 'hard', impostorHint: 'Noturno' },

  // --- comidas ---
  { id: 'comidas_hard_1', value: 'Caviar', category: 'comidas', difficulty: 'hard', impostorHint: 'Luxo' },
  { id: 'comidas_hard_2', value: 'Trufa', category: 'comidas', difficulty: 'hard', impostorHint: 'Floresta' },
  { id: 'comidas_hard_3', value: 'Kimchi', category: 'comidas', difficulty: 'hard', impostorHint: 'Coreia' },
  { id: 'comidas_hard_4', value: 'Ceviche', category: 'comidas', difficulty: 'hard', impostorHint: 'Marinado' },
  { id: 'comidas_hard_5', value: 'Escargot', category: 'comidas', difficulty: 'hard', impostorHint: 'França' },

  // --- esportes ---
  { id: 'esportes_hard_1', value: 'Curling', category: 'esportes', difficulty: 'hard', impostorHint: 'Canadá' },
  { id: 'esportes_hard_2', value: 'Polo Aquático', category: 'esportes', difficulty: 'hard', impostorHint: 'Piscina' },
  { id: 'esportes_hard_3', value: 'Halterofilismo', category: 'esportes', difficulty: 'hard', impostorHint: 'Força' },
  { id: 'esportes_hard_4', value: 'Triatlo', category: 'esportes', difficulty: 'hard', impostorHint: 'Resistência' },
  { id: 'esportes_hard_5', value: 'Parkour', category: 'esportes', difficulty: 'hard', impostorHint: 'Obstáculos' },

  // --- filmes_e_series ---
  { id: 'filmes_hard_1', value: 'Pulp Fiction', category: 'filmes_e_series', difficulty: 'hard', impostorHint: 'Mala' },
  { id: 'filmes_hard_2', value: 'Clube da Luta', category: 'filmes_e_series', difficulty: 'hard', impostorHint: 'Clube' },
  { id: 'filmes_hard_3', value: 'Black Mirror', category: 'filmes_e_series', difficulty: 'hard', impostorHint: 'Distopia' },
  { id: 'filmes_hard_4', value: 'O Poderoso Chefão', category: 'filmes_e_series', difficulty: 'hard', impostorHint: 'Família' },
  { id: 'filmes_hard_5', value: 'Cidade de Deus', category: 'filmes_e_series', difficulty: 'hard', impostorHint: 'Brasil' },

  // --- lugares ---
  { id: 'lugares_hard_1', value: 'Catacumbas', category: 'lugares', difficulty: 'hard', impostorHint: 'Subterrâneo' },
  { id: 'lugares_hard_2', value: 'Observatório', category: 'lugares', difficulty: 'hard', impostorHint: 'Astronomia' },
  { id: 'lugares_hard_3', value: 'Vulcão', category: 'lugares', difficulty: 'hard', impostorHint: 'Cinzas' },
  { id: 'lugares_hard_4', value: 'Deserto', category: 'lugares', difficulty: 'hard', impostorHint: 'Calor' },
  { id: 'lugares_hard_5', value: 'Farol', category: 'lugares', difficulty: 'hard', impostorHint: 'Costa' },

  // --- jogos ---
  { id: 'jogos_hard_1', value: 'Dark Souls', category: 'jogos', difficulty: 'hard', impostorHint: 'Desafio' },
  { id: 'jogos_hard_2', value: 'Hollow Knight', category: 'jogos', difficulty: 'hard', impostorHint: 'Insetos' },
  { id: 'jogos_hard_3', value: 'Portal', category: 'jogos', difficulty: 'hard', impostorHint: 'Enigma' },
  { id: 'jogos_hard_4', value: 'Undertale', category: 'jogos', difficulty: 'hard', impostorHint: 'Escolhas' },
  { id: 'jogos_hard_5', value: 'Elden Ring', category: 'jogos', difficulty: 'hard', impostorHint: 'Fantasia' },

  // --- musica ---
  { id: 'musica_hard_1', value: 'Bossa Nova', category: 'musica', difficulty: 'hard', impostorHint: 'Portugal' },
  { id: 'musica_hard_2', value: 'Fado', category: 'musica', difficulty: 'hard', impostorHint: 'Portugal' },
  { id: 'musica_hard_3', value: 'Tecnobrega', category: 'musica', difficulty: 'hard', impostorHint: 'Belém' },
  { id: 'musica_hard_4', value: 'Xote', category: 'musica', difficulty: 'hard', impostorHint: 'Nordeste' },
  { id: 'musica_hard_5', value: 'MPB', category: 'musica', difficulty: 'hard', impostorHint: 'Brasil' },

  // --- cotidiano ---
  { id: 'cotidiano_hard_1', value: 'Meditar', category: 'cotidiano', difficulty: 'hard', impostorHint: 'Calma' },
  { id: 'cotidiano_hard_2', value: 'Procrastinar', category: 'cotidiano', difficulty: 'hard', impostorHint: 'Amanhã' },
  { id: 'cotidiano_hard_3', value: 'Jejuar', category: 'cotidiano', difficulty: 'hard', impostorHint: 'Jejum' },
  { id: 'cotidiano_hard_4', value: 'Reciclar', category: 'cotidiano', difficulty: 'hard', impostorHint: 'Lixo' },
  { id: 'cotidiano_hard_5', value: 'Improvisar', category: 'cotidiano', difficulty: 'hard', impostorHint: 'Criatividade' },

  // --- objetos ---
  { id: 'objetos_hard_1', value: 'Bússola', category: 'objetos', difficulty: 'hard', impostorHint: 'Direção' },
  { id: 'objetos_hard_2', value: 'Ábaco', category: 'objetos', difficulty: 'hard', impostorHint: 'Antiguidade' },
  { id: 'objetos_hard_3', value: 'Sextante', category: 'objetos', difficulty: 'hard', impostorHint: 'Mar' },
  { id: 'objetos_hard_4', value: 'Metrônomo', category: 'objetos', difficulty: 'hard', impostorHint: 'Ritmo' },
  { id: 'objetos_hard_5', value: 'Estetoscópio', category: 'objetos', difficulty: 'hard', impostorHint: 'Médico' },

  // --- profissoes ---
  { id: 'profissoes_hard_1', value: 'Paleontólogo', category: 'profissoes', difficulty: 'hard', impostorHint: 'Museu' },
  { id: 'profissoes_hard_2', value: 'Astronauta', category: 'profissoes', difficulty: 'hard', impostorHint: 'Órbita' },
  { id: 'profissoes_hard_3', value: 'Diplomata', category: 'profissoes', difficulty: 'hard', impostorHint: 'Exterior' },
  { id: 'profissoes_hard_4', value: 'Sommelier', category: 'profissoes', difficulty: 'hard', impostorHint: 'Restaurante' },
  { id: 'profissoes_hard_5', value: 'Linguista', category: 'profissoes', difficulty: 'hard', impostorHint: 'Gramática' },

  // --- animais (easy) — palavras adicionais ---
  { id: 'animais_easy_11', value: 'Coelho', category: 'animais', difficulty: 'easy', impostorHint: 'Toca' },
  { id: 'animais_easy_12', value: 'Cavalo', category: 'animais', difficulty: 'easy', impostorHint: 'Estábulo' },
  { id: 'animais_easy_13', value: 'Golfinho', category: 'animais', difficulty: 'easy', impostorHint: 'Oceano' },
  { id: 'animais_easy_14', value: 'Abelha', category: 'animais', difficulty: 'easy', impostorHint: 'Colmeia' },
  { id: 'animais_easy_15', value: 'Panda', category: 'animais', difficulty: 'easy', impostorHint: 'Bambu' },

  // --- animais (medium) — palavras adicionais ---
  { id: 'animais_medium_11', value: 'Hiena', category: 'animais', difficulty: 'medium', impostorHint: 'Risos' },
  { id: 'animais_medium_12', value: 'Preguiça', category: 'animais', difficulty: 'medium', impostorHint: 'Copas' },
  { id: 'animais_medium_13', value: 'Flamingo', category: 'animais', difficulty: 'medium', impostorHint: 'Lagoa' },
  { id: 'animais_medium_14', value: 'Camurça', category: 'animais', difficulty: 'medium', impostorHint: 'Montanha' },
  { id: 'animais_medium_15', value: 'Iguana', category: 'animais', difficulty: 'medium', impostorHint: 'Escamas' },

  // --- animais (hard) — palavras adicionais ---
  { id: 'animais_hard_11', value: 'Quokka', category: 'animais', difficulty: 'hard', impostorHint: 'Austrália' },
  { id: 'animais_hard_12', value: 'Aye-Aye', category: 'animais', difficulty: 'hard', impostorHint: 'Madagascar' },
  { id: 'animais_hard_13', value: 'Tamanduá-bandeira', category: 'animais', difficulty: 'hard', impostorHint: 'Formigas' },
  { id: 'animais_hard_14', value: 'Peixe-lua', category: 'animais', difficulty: 'hard', impostorHint: 'Oceano' },
  { id: 'animais_hard_15', value: 'Lêmure', category: 'animais', difficulty: 'hard', impostorHint: 'Ilha' },

  // --- comidas (easy) — palavras adicionais ---
  { id: 'comidas_easy_11', value: 'Hambúrguer', category: 'comidas', difficulty: 'easy', impostorHint: 'Lanchonete' },
  { id: 'comidas_easy_12', value: 'Pipoca', category: 'comidas', difficulty: 'easy', impostorHint: 'Cinema' },
  { id: 'comidas_easy_13', value: 'Pastel', category: 'comidas', difficulty: 'easy', impostorHint: 'Feira' },
  { id: 'comidas_easy_14', value: 'Brigadeiro', category: 'comidas', difficulty: 'easy', impostorHint: 'Festa' },
  { id: 'comidas_easy_15', value: 'Arroz', category: 'comidas', difficulty: 'easy', impostorHint: 'Almoço' },

  // --- comidas (medium) — palavras adicionais ---
  { id: 'comidas_medium_11', value: 'Moqueca', category: 'comidas', difficulty: 'medium', impostorHint: 'Bahia' },
  { id: 'comidas_medium_12', value: 'Ratatouille', category: 'comidas', difficulty: 'medium', impostorHint: 'França' },
  { id: 'comidas_medium_13', value: 'Nhoque', category: 'comidas', difficulty: 'medium', impostorHint: 'Domingo' },
  { id: 'comidas_medium_14', value: 'Yakissoba', category: 'comidas', difficulty: 'medium', impostorHint: 'China' },
  { id: 'comidas_medium_15', value: 'Quiche', category: 'comidas', difficulty: 'medium', impostorHint: 'Forno' },

  // --- comidas (hard) — palavras adicionais ---
  { id: 'comidas_hard_11', value: 'Burrata', category: 'comidas', difficulty: 'hard', impostorHint: 'Itália' },
  { id: 'comidas_hard_12', value: 'Moussaka', category: 'comidas', difficulty: 'hard', impostorHint: 'Grécia' },
  { id: 'comidas_hard_13', value: 'Ramen', category: 'comidas', difficulty: 'hard', impostorHint: 'Japão' },
  { id: 'comidas_hard_14', value: 'Goulash', category: 'comidas', difficulty: 'hard', impostorHint: 'Hungria' },
  { id: 'comidas_hard_15', value: 'Tiramisù', category: 'comidas', difficulty: 'hard', impostorHint: 'Café' },

  // --- esportes (easy) — palavras adicionais ---
  { id: 'esportes_easy_11', value: 'Skate', category: 'esportes', difficulty: 'easy', impostorHint: 'Manobra' },
  { id: 'esportes_easy_12', value: 'Corrida', category: 'esportes', difficulty: 'easy', impostorHint: 'Tênis' },
  { id: 'esportes_easy_13', value: 'Ginástica', category: 'esportes', difficulty: 'easy', impostorHint: 'Aparelho' },
  { id: 'esportes_easy_14', value: 'Futsal', category: 'esportes', difficulty: 'easy', impostorHint: 'Quadra' },
  { id: 'esportes_easy_15', value: 'Beisebol', category: 'esportes', difficulty: 'easy', impostorHint: 'Taco' },

  // --- esportes (medium) — palavras adicionais ---
  { id: 'esportes_medium_11', value: 'Críquete', category: 'esportes', difficulty: 'medium', impostorHint: 'Inglaterra' },
  { id: 'esportes_medium_12', value: 'Karatê', category: 'esportes', difficulty: 'medium', impostorHint: 'Faixa' },
  { id: 'esportes_medium_13', value: 'Hóquei', category: 'esportes', difficulty: 'medium', impostorHint: 'Gelo' },
  { id: 'esportes_medium_14', value: 'Vela', category: 'esportes', difficulty: 'medium', impostorHint: 'Mar' },
  { id: 'esportes_medium_15', value: 'Escalada', category: 'esportes', difficulty: 'medium', impostorHint: 'Parede' },

  // --- esportes (hard) — palavras adicionais ---
  { id: 'esportes_hard_11', value: 'Biathlon', category: 'esportes', difficulty: 'hard', impostorHint: 'Neve' },
  { id: 'esportes_hard_12', value: 'Pentatlo', category: 'esportes', difficulty: 'hard', impostorHint: 'Provas' },
  { id: 'esportes_hard_13', value: 'Skeleton', category: 'esportes', difficulty: 'hard', impostorHint: 'Trenó' },
  { id: 'esportes_hard_14', value: 'Lacrosse', category: 'esportes', difficulty: 'hard', impostorHint: 'Canadá' },
  { id: 'esportes_hard_15', value: 'Kitesurf', category: 'esportes', difficulty: 'hard', impostorHint: 'Vento' },

  // --- filmes_e_series (easy) — palavras adicionais ---
  { id: 'filmes_e_series_easy_11', value: 'Toy Story', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Brinquedos' },
  { id: 'filmes_e_series_easy_12', value: 'Shrek', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Pântano' },
  { id: 'filmes_e_series_easy_13', value: 'Frozen', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Gelo' },
  { id: 'filmes_e_series_easy_14', value: 'Avatar', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Pandora' },
  { id: 'filmes_e_series_easy_15', value: 'Homem-Aranha', category: 'filmes_e_series', difficulty: 'easy', impostorHint: 'Teia' },

  // --- filmes_e_series (medium) — palavras adicionais ---
  { id: 'filmes_e_series_medium_11', value: 'Lost', category: 'filmes_e_series', difficulty: 'medium', impostorHint: 'Ilha' },
  { id: 'filmes_e_series_medium_12', value: 'The Office', category: 'filmes_e_series', difficulty: 'medium', impostorHint: 'Escritório' },
  { id: 'filmes_e_series_medium_13', value: 'The Boys', category: 'filmes_e_series', difficulty: 'medium', impostorHint: 'Heróis' },
  { id: 'filmes_e_series_medium_14', value: 'Dark', category: 'filmes_e_series', difficulty: 'medium', impostorHint: 'Tempo' },
  { id: 'filmes_e_series_medium_15', value: 'Peaky Blinders', category: 'filmes_e_series', difficulty: 'medium', impostorHint: 'Inglaterra' },

  // --- filmes_e_series (hard) — palavras adicionais ---
  { id: 'filmes_e_series_hard_11', value: 'Whiplash', category: 'filmes_e_series', difficulty: 'hard', impostorHint: 'Bateria' },
  { id: 'filmes_e_series_hard_12', value: 'Hereditário', category: 'filmes_e_series', difficulty: 'hard', impostorHint: 'Família' },
  { id: 'filmes_e_series_hard_13', value: 'Parasita', category: 'filmes_e_series', difficulty: 'hard', impostorHint: 'Casa' },
  { id: 'filmes_e_series_hard_14', value: 'O Iluminado', category: 'filmes_e_series', difficulty: 'hard', impostorHint: 'Hotel' },
  { id: 'filmes_e_series_hard_15', value: 'Donnie Darko', category: 'filmes_e_series', difficulty: 'hard', impostorHint: 'Coelho' },

  // --- lugares (easy) — palavras adicionais ---
  { id: 'lugares_easy_11', value: 'Museu', category: 'lugares', difficulty: 'easy', impostorHint: 'Exposição' },
  { id: 'lugares_easy_12', value: 'Restaurante', category: 'lugares', difficulty: 'easy', impostorHint: 'Cardápio' },
  { id: 'lugares_easy_13', value: 'Farmácia', category: 'lugares', difficulty: 'easy', impostorHint: 'Receita' },
  { id: 'lugares_easy_14', value: 'Hotel', category: 'lugares', difficulty: 'easy', impostorHint: 'Hospedagem' },
  { id: 'lugares_easy_15', value: 'Mercado', category: 'lugares', difficulty: 'easy', impostorHint: 'Carrinho' },

  // --- lugares (medium) — palavras adicionais ---
  { id: 'lugares_medium_11', value: 'Aquário', category: 'lugares', difficulty: 'medium', impostorHint: 'Tanques' },
  { id: 'lugares_medium_12', value: 'Rodoviária', category: 'lugares', difficulty: 'medium', impostorHint: 'Ônibus' },
  { id: 'lugares_medium_13', value: 'Teatro', category: 'lugares', difficulty: 'medium', impostorHint: 'Palco' },
  { id: 'lugares_medium_14', value: 'Cartório', category: 'lugares', difficulty: 'medium', impostorHint: 'Documentos' },
  { id: 'lugares_medium_15', value: 'Porto', category: 'lugares', difficulty: 'medium', impostorHint: 'Navios' },

  // --- lugares (hard) — palavras adicionais ---
  { id: 'lugares_hard_11', value: 'Mosteiro', category: 'lugares', difficulty: 'hard', impostorHint: 'Claustro' },
  { id: 'lugares_hard_12', value: 'Bunker', category: 'lugares', difficulty: 'hard', impostorHint: 'Abrigo' },
  { id: 'lugares_hard_13', value: 'Fiorde', category: 'lugares', difficulty: 'hard', impostorHint: 'Noruega' },
  { id: 'lugares_hard_14', value: 'Oásis', category: 'lugares', difficulty: 'hard', impostorHint: 'Deserto' },
  { id: 'lugares_hard_15', value: 'Ruínas', category: 'lugares', difficulty: 'hard', impostorHint: 'História' },

  // --- jogos (easy) — palavras adicionais ---
  { id: 'jogos_easy_11', value: 'Mario Kart', category: 'jogos', difficulty: 'easy', impostorHint: 'Corrida' },
  { id: 'jogos_easy_12', value: 'Clash Royale', category: 'jogos', difficulty: 'easy', impostorHint: 'Cartas' },
  { id: 'jogos_easy_13', value: 'Free Fire', category: 'jogos', difficulty: 'easy', impostorHint: 'Sobrevivência' },
  { id: 'jogos_easy_14', value: 'Terraria', category: 'jogos', difficulty: 'easy', impostorHint: 'Mineração' },
  { id: 'jogos_easy_15', value: 'Pac-Man', category: 'jogos', difficulty: 'easy', impostorHint: 'Labirinto' },

  // --- jogos (medium) — palavras adicionais ---
  { id: 'jogos_medium_11', value: 'Overwatch', category: 'jogos', difficulty: 'medium', impostorHint: 'Heróis' },
  { id: 'jogos_medium_12', value: 'Rocket League', category: 'jogos', difficulty: 'medium', impostorHint: 'Carros' },
  { id: 'jogos_medium_13', value: 'Fall Guys', category: 'jogos', difficulty: 'medium', impostorHint: 'Obstáculos' },
  { id: 'jogos_medium_14', value: 'Stardew Valley', category: 'jogos', difficulty: 'medium', impostorHint: 'Fazenda' },
  { id: 'jogos_medium_15', value: 'God of War', category: 'jogos', difficulty: 'medium', impostorHint: 'Mitologia' },

  // --- jogos (hard) — palavras adicionais ---
  { id: 'jogos_hard_11', value: 'Hades', category: 'jogos', difficulty: 'hard', impostorHint: 'Submundo' },
  { id: 'jogos_hard_12', value: 'Celeste', category: 'jogos', difficulty: 'hard', impostorHint: 'Montanha' },
  { id: 'jogos_hard_13', value: 'Disco Elysium', category: 'jogos', difficulty: 'hard', impostorHint: 'Detetive' },
  { id: 'jogos_hard_14', value: 'Sekiro', category: 'jogos', difficulty: 'hard', impostorHint: 'Samurai' },
  { id: 'jogos_hard_15', value: 'Control', category: 'jogos', difficulty: 'hard', impostorHint: 'Paranormal' },

  // --- musica (easy) — palavras adicionais ---
  { id: 'musica_easy_11', value: 'Guitarra', category: 'musica', difficulty: 'easy', impostorHint: 'Palheta' },
  { id: 'musica_easy_12', value: 'Saxofone', category: 'musica', difficulty: 'easy', impostorHint: 'Sopro' },
  { id: 'musica_easy_13', value: 'Rap', category: 'musica', difficulty: 'easy', impostorHint: 'Microfone' },
  { id: 'musica_easy_14', value: 'Forró', category: 'musica', difficulty: 'easy', impostorHint: 'Nordeste' },
  { id: 'musica_easy_15', value: 'Coro', category: 'musica', difficulty: 'easy', impostorHint: 'Vozes' },

  // --- musica (medium) — palavras adicionais ---
  { id: 'musica_medium_11', value: 'Blues', category: 'musica', difficulty: 'medium', impostorHint: 'Escala' },
  { id: 'musica_medium_12', value: 'Samba', category: 'musica', difficulty: 'medium', impostorHint: 'Carnaval' },
  { id: 'musica_medium_13', value: 'Trap', category: 'musica', difficulty: 'medium', impostorHint: 'Graves' },
  { id: 'musica_medium_14', value: 'Gospel', category: 'musica', difficulty: 'medium', impostorHint: 'Igreja' },
  { id: 'musica_medium_15', value: 'Flamenco', category: 'musica', difficulty: 'medium', impostorHint: 'Espanha' },

  // --- musica (hard) — palavras adicionais ---
  { id: 'musica_hard_11', value: 'Choro', category: 'musica', difficulty: 'hard', impostorHint: 'Pixinguinha' },
  { id: 'musica_hard_12', value: 'Klezmer', category: 'musica', difficulty: 'hard', impostorHint: 'Casamento' },
  { id: 'musica_hard_13', value: 'Bolero', category: 'musica', difficulty: 'hard', impostorHint: 'Dança' },
  { id: 'musica_hard_14', value: 'Gaita', category: 'musica', difficulty: 'hard', impostorHint: 'Sopro' },
  { id: 'musica_hard_15', value: 'Samba-rock', category: 'musica', difficulty: 'hard', impostorHint: 'Balanço' },

  // --- cotidiano (easy) — palavras adicionais ---
  { id: 'cotidiano_easy_11', value: 'Café da manhã', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Manhã' },
  { id: 'cotidiano_easy_12', value: 'Pentear-se', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Cabelo' },
  { id: 'cotidiano_easy_13', value: 'Dirigir', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Trânsito' },
  { id: 'cotidiano_easy_14', value: 'Caminhar', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Calçada' },
  { id: 'cotidiano_easy_15', value: 'Cantar', category: 'cotidiano', difficulty: 'easy', impostorHint: 'Música' },

  // --- cotidiano (medium) — palavras adicionais ---
  { id: 'cotidiano_medium_11', value: 'Fazer faxina', category: 'cotidiano', difficulty: 'medium', impostorHint: 'Casa' },
  { id: 'cotidiano_medium_12', value: 'Planejar', category: 'cotidiano', difficulty: 'medium', impostorHint: 'Agenda' },
  { id: 'cotidiano_medium_13', value: 'Fotografar', category: 'cotidiano', difficulty: 'medium', impostorHint: 'Memória' },
  { id: 'cotidiano_medium_14', value: 'Medir', category: 'cotidiano', difficulty: 'medium', impostorHint: 'Número' },
  { id: 'cotidiano_medium_15', value: 'Esperar', category: 'cotidiano', difficulty: 'medium', impostorHint: 'Tempo' },

  // --- cotidiano (hard) — palavras adicionais ---
  { id: 'cotidiano_hard_11', value: 'Contemplar', category: 'cotidiano', difficulty: 'hard', impostorHint: 'Paisagem' },
  { id: 'cotidiano_hard_12', value: 'Negociar', category: 'cotidiano', difficulty: 'hard', impostorHint: 'Acordo' },
  { id: 'cotidiano_hard_13', value: 'Investigar', category: 'cotidiano', difficulty: 'hard', impostorHint: 'Pistas' },
  { id: 'cotidiano_hard_14', value: 'Reparar', category: 'cotidiano', difficulty: 'hard', impostorHint: 'Conserto' },
  { id: 'cotidiano_hard_15', value: 'Delegar', category: 'cotidiano', difficulty: 'hard', impostorHint: 'Equipe' },

  // --- objetos (easy) — palavras adicionais ---
  { id: 'objetos_easy_11', value: 'Lápis', category: 'objetos', difficulty: 'easy', impostorHint: 'Escola' },
  { id: 'objetos_easy_12', value: 'Mochila', category: 'objetos', difficulty: 'easy', impostorHint: 'Viagem' },
  { id: 'objetos_easy_13', value: 'Caneta', category: 'objetos', difficulty: 'easy', impostorHint: 'Tinta' },
  { id: 'objetos_easy_14', value: 'Panela', category: 'objetos', difficulty: 'easy', impostorHint: 'Cozinha' },
  { id: 'objetos_easy_15', value: 'Toalha', category: 'objetos', difficulty: 'easy', impostorHint: 'Banheiro' },

  // --- objetos (medium) — palavras adicionais ---
  { id: 'objetos_medium_11', value: 'Furadeira', category: 'objetos', difficulty: 'medium', impostorHint: 'Oficina' },
  { id: 'objetos_medium_12', value: 'Lanterna', category: 'objetos', difficulty: 'medium', impostorHint: 'Escuro' },
  { id: 'objetos_medium_13', value: 'Aspirador', category: 'objetos', difficulty: 'medium', impostorHint: 'Limpeza' },
  { id: 'objetos_medium_14', value: 'Balança', category: 'objetos', difficulty: 'medium', impostorHint: 'Peso' },
  { id: 'objetos_medium_15', value: 'Chaleira', category: 'objetos', difficulty: 'medium', impostorHint: 'Cozinha' },

  // --- objetos (hard) — palavras adicionais ---
  { id: 'objetos_hard_11', value: 'Astrolábio', category: 'objetos', difficulty: 'hard', impostorHint: 'Navegação' },
  { id: 'objetos_hard_12', value: 'Plaina', category: 'objetos', difficulty: 'hard', impostorHint: 'Madeira' },
  { id: 'objetos_hard_13', value: 'Gramofone', category: 'objetos', difficulty: 'hard', impostorHint: 'Vinil' },
  { id: 'objetos_hard_14', value: 'Telescópio', category: 'objetos', difficulty: 'hard', impostorHint: 'Estrelas' },
  { id: 'objetos_hard_15', value: 'Ampulheta', category: 'objetos', difficulty: 'hard', impostorHint: 'Areia' },

  // --- profissoes (easy) — palavras adicionais ---
  { id: 'profissoes_easy_11', value: 'Enfermeiro', category: 'profissoes', difficulty: 'easy', impostorHint: 'Hospital' },
  { id: 'profissoes_easy_12', value: 'Garçom', category: 'profissoes', difficulty: 'easy', impostorHint: 'Restaurante' },
  { id: 'profissoes_easy_13', value: 'Padeiro', category: 'profissoes', difficulty: 'easy', impostorHint: 'Forno' },
  { id: 'profissoes_easy_14', value: 'Eletricista', category: 'profissoes', difficulty: 'easy', impostorHint: 'Fiação' },
  { id: 'profissoes_easy_15', value: 'Jardineiro', category: 'profissoes', difficulty: 'easy', impostorHint: 'Plantas' },

  // --- profissoes (medium) — palavras adicionais ---
  { id: 'profissoes_medium_11', value: 'Contador', category: 'profissoes', difficulty: 'medium', impostorHint: 'Números' },
  { id: 'profissoes_medium_12', value: 'Designer', category: 'profissoes', difficulty: 'medium', impostorHint: 'Criatividade' },
  { id: 'profissoes_medium_13', value: 'Programador', category: 'profissoes', difficulty: 'medium', impostorHint: 'Código' },
  { id: 'profissoes_medium_14', value: 'Geólogo', category: 'profissoes', difficulty: 'medium', impostorHint: 'Rochas' },
  { id: 'profissoes_medium_15', value: 'Nutricionista', category: 'profissoes', difficulty: 'medium', impostorHint: 'Dieta' },

  // --- profissoes (hard) — palavras adicionais ---
  { id: 'profissoes_hard_11', value: 'Criminologista', category: 'profissoes', difficulty: 'hard', impostorHint: 'Investigação' },
  { id: 'profissoes_hard_12', value: 'Oceanógrafo', category: 'profissoes', difficulty: 'hard', impostorHint: 'Mar' },
  { id: 'profissoes_hard_13', value: 'Meteorologista', category: 'profissoes', difficulty: 'hard', impostorHint: 'Previsão' },
  { id: 'profissoes_hard_14', value: 'Cartógrafo', category: 'profissoes', difficulty: 'hard', impostorHint: 'Mapas' },
  { id: 'profissoes_hard_15', value: 'Perito', category: 'profissoes', difficulty: 'hard', impostorHint: 'Evidências' },

  // ============================================================
  // NOVAS CATEGORIAS EXPANDIDAS
  // ============================================================

  // --- memes_brasileiros (easy) ---
  { id: 'memes_easy_1', value: 'Caneta Azul', category: 'memes_brasileiros', difficulty: 'easy', impostorHint: 'Manoel' },
  { id: 'memes_easy_2', value: 'Bora Bill', category: 'memes_brasileiros', difficulty: 'easy', impostorHint: 'Ceará' },
  { id: 'memes_easy_3', value: 'Grávida de Taubaté', category: 'memes_brasileiros', difficulty: 'easy', impostorHint: 'Barriga' },
  { id: 'memes_easy_4', value: 'Luva de Pedreiro', category: 'memes_brasileiros', difficulty: 'easy', impostorHint: 'Receba' },
  { id: 'memes_easy_5', value: 'Nazaré Confusa', category: 'memes_brasileiros', difficulty: 'easy', impostorHint: 'Cálculos' },
  { id: 'memes_easy_6', value: 'Casimiro', category: 'memes_brasileiros', difficulty: 'easy', impostorHint: 'Reações' },
  { id: 'memes_easy_7', value: 'É Verdade Esse Bilete', category: 'memes_brasileiros', difficulty: 'easy', impostorHint: 'Bilhete' },
  { id: 'memes_easy_8', value: 'Calma Calabreso', category: 'memes_brasileiros', difficulty: 'easy', impostorHint: 'Apelido' },
  { id: 'memes_easy_9', value: 'Choque de Cultura', category: 'memes_brasileiros', difficulty: 'easy', impostorHint: 'Transporte' },
  { id: 'memes_easy_10', value: 'Morre Diabo', category: 'memes_brasileiros', difficulty: 'easy', impostorHint: 'Entrevista' },

  // --- memes_brasileiros (medium) ---
  { id: 'memes_medium_1', value: 'Cringe', category: 'memes_brasileiros', difficulty: 'medium', impostorHint: 'Vergonha' },
  { id: 'memes_medium_2', value: 'TravaZap', category: 'memes_brasileiros', difficulty: 'medium', impostorHint: 'Bloqueio' },
  { id: 'memes_medium_3', value: 'Ema da Alvorada', category: 'memes_brasileiros', difficulty: 'medium', impostorHint: 'Bicada' },
  { id: 'memes_medium_4', value: 'Galo Cego', category: 'memes_brasileiros', difficulty: 'medium', impostorHint: 'Venda' },
  { id: 'memes_medium_5', value: 'Rei do Camarote', category: 'memes_brasileiros', difficulty: 'medium', impostorHint: 'Champanhe' },
  { id: 'memes_medium_6', value: 'Joel Santana', category: 'memes_brasileiros', difficulty: 'medium', impostorHint: 'Prancheta' },
  { id: 'memes_medium_7', value: 'Forninho', category: 'memes_brasileiros', difficulty: 'medium', impostorHint: 'Desabamento' },
  { id: 'memes_medium_8', value: 'Whindersson', category: 'memes_brasileiros', difficulty: 'medium', impostorHint: 'Piauí' },
  { id: 'memes_medium_9', value: 'Padre do Balão', category: 'memes_brasileiros', difficulty: 'medium', impostorHint: 'Céu' },
  { id: 'memes_medium_10', value: 'Sanduíche-iche', category: 'memes_brasileiros', difficulty: 'medium', impostorHint: 'Nutrição' },

  // --- memes_brasileiros (hard) ---
  { id: 'memes_hard_1', value: 'Nissim Ourfali', category: 'memes_brasileiros', difficulty: 'hard', impostorHint: 'Baleia' },
  { id: 'memes_hard_2', value: 'Menino do Acre', category: 'memes_brasileiros', difficulty: 'hard', impostorHint: 'Criptografia' },
  { id: 'memes_hard_3', value: 'Tulla Luana', category: 'memes_brasileiros', difficulty: 'hard', impostorHint: 'Confeiteira' },
  { id: 'memes_hard_4', value: 'Betina', category: 'memes_brasileiros', difficulty: 'hard', impostorHint: 'Patrimônio' },
  { id: 'memes_hard_5', value: 'Pintinho Piu', category: 'memes_brasileiros', difficulty: 'hard', impostorHint: 'Trator' },

  // --- cultura_brasileira (easy) ---
  { id: 'cultura_easy_1', value: 'Carnaval', category: 'cultura_brasileira', difficulty: 'easy', impostorHint: 'Fantasia' },
  { id: 'cultura_easy_2', value: 'Saci-Pererê', category: 'cultura_brasileira', difficulty: 'easy', impostorHint: 'Redemoinho' },
  { id: 'cultura_easy_3', value: 'Festa Junina', category: 'cultura_brasileira', difficulty: 'easy', impostorHint: 'Fogueira' },
  { id: 'cultura_easy_4', value: 'Capoeira', category: 'cultura_brasileira', difficulty: 'easy', impostorHint: 'Berimbau' },
  { id: 'cultura_easy_5', value: 'Caipirinha', category: 'cultura_brasileira', difficulty: 'easy', impostorHint: 'Limão' },
  { id: 'cultura_easy_6', value: 'Pão de Queijo', category: 'cultura_brasileira', difficulty: 'easy', impostorHint: 'Minas' },
  { id: 'cultura_easy_7', value: 'Cristo Redentor', category: 'cultura_brasileira', difficulty: 'easy', impostorHint: 'Corcovado' },
  { id: 'cultura_easy_8', value: 'Cuca', category: 'cultura_brasileira', difficulty: 'easy', impostorHint: 'Jacaré' },
  { id: 'cultura_easy_9', value: 'Samba', category: 'cultura_brasileira', difficulty: 'easy', impostorHint: 'Pandeiro' },
  { id: 'cultura_easy_10', value: 'Brigadeiro', category: 'cultura_brasileira', difficulty: 'easy', impostorHint: 'Granulado' },

  // --- cultura_brasileira (medium) ---
  { id: 'cultura_medium_1', value: 'Frevo', category: 'cultura_brasileira', difficulty: 'medium', impostorHint: 'Sombrinha' },
  { id: 'cultura_medium_2', value: 'Bumba Meu Boi', category: 'cultura_brasileira', difficulty: 'medium', impostorHint: 'Maranhão' },
  { id: 'cultura_medium_3', value: 'Curupira', category: 'cultura_brasileira', difficulty: 'medium', impostorHint: 'Pegadas' },
  { id: 'cultura_medium_4', value: 'Iemanjá', category: 'cultura_brasileira', difficulty: 'medium', impostorHint: 'Flores' },
  { id: 'cultura_medium_5', value: 'Acarajé', category: 'cultura_brasileira', difficulty: 'medium', impostorHint: 'Dendê' },
  { id: 'cultura_medium_6', value: 'Maracatu', category: 'cultura_brasileira', difficulty: 'medium', impostorHint: 'Tambor' },
  { id: 'cultura_medium_7', value: 'Baião', category: 'cultura_brasileira', difficulty: 'medium', impostorHint: 'Sanfona' },
  { id: 'cultura_medium_8', value: 'Cordel', category: 'cultura_brasileira', difficulty: 'medium', impostorHint: 'Xilogravura' },
  { id: 'cultura_medium_9', value: 'Chimarrão', category: 'cultura_brasileira', difficulty: 'medium', impostorHint: 'Cuia' },
  { id: 'cultura_medium_10', value: 'Forró', category: 'cultura_brasileira', difficulty: 'medium', impostorHint: 'Triângulo' },

  // --- cultura_brasileira (hard) ---
  { id: 'cultura_hard_1', value: 'Boitatá', category: 'cultura_brasileira', difficulty: 'hard', impostorHint: 'Serpente' },
  { id: 'cultura_hard_2', value: 'Carimbó', category: 'cultura_brasileira', difficulty: 'hard', impostorHint: 'Pará' },
  { id: 'cultura_hard_3', value: 'Maculelê', category: 'cultura_brasileira', difficulty: 'hard', impostorHint: 'Bastões' },
  { id: 'cultura_hard_4', value: 'Jongo', category: 'cultura_brasileira', difficulty: 'hard', impostorHint: 'Terreiro' },
  { id: 'cultura_hard_5', value: 'Congada', category: 'cultura_brasileira', difficulty: 'hard', impostorHint: 'Coroação' },

  // --- personagens (easy) ---
  { id: 'personagens_easy_1', value: 'Batman', category: 'personagens', difficulty: 'easy', impostorHint: 'Morcego' },
  { id: 'personagens_easy_2', value: 'Homem-Aranha', category: 'personagens', difficulty: 'easy', impostorHint: 'Teia' },
  { id: 'personagens_easy_3', value: 'Harry Potter', category: 'personagens', difficulty: 'easy', impostorHint: 'Cicatriz' },
  { id: 'personagens_easy_4', value: 'Mônica', category: 'personagens', difficulty: 'easy', impostorHint: 'Sansão' },
  { id: 'personagens_easy_5', value: 'Shrek', category: 'personagens', difficulty: 'easy', impostorHint: 'Pântano' },
  { id: 'personagens_easy_6', value: 'Pikachu', category: 'personagens', difficulty: 'easy', impostorHint: 'Trovão' },
  { id: 'personagens_easy_7', value: 'Darth Vader', category: 'personagens', difficulty: 'easy', impostorHint: 'Respiração' },
  { id: 'personagens_easy_8', value: 'Super Mario', category: 'personagens', difficulty: 'easy', impostorHint: 'Encanador' },
  { id: 'personagens_easy_9', value: 'Bob Esponja', category: 'personagens', difficulty: 'easy', impostorHint: 'Hambúrguer' },
  { id: 'personagens_easy_10', value: 'Capitão América', category: 'personagens', difficulty: 'easy', impostorHint: 'Escudo' },

  // --- personagens (medium) ---
  { id: 'personagens_medium_1', value: 'Cebolinha', category: 'personagens', difficulty: 'medium', impostorHint: 'Trocas' },
  { id: 'personagens_medium_2', value: 'Gandalf', category: 'personagens', difficulty: 'medium', impostorHint: 'Cajado' },
  { id: 'personagens_medium_3', value: 'Sherlock Holmes', category: 'personagens', difficulty: 'medium', impostorHint: 'Cachimbo' },
  { id: 'personagens_medium_4', value: 'Chaves', category: 'personagens', difficulty: 'medium', impostorHint: 'Barril' },
  { id: 'personagens_medium_5', value: 'Coringa', category: 'personagens', difficulty: 'medium', impostorHint: 'Risada' },
  { id: 'personagens_medium_6', value: 'Tarzan', category: 'personagens', difficulty: 'medium', impostorHint: 'Selva' },
  { id: 'personagens_medium_7', value: 'Robin Hood', category: 'personagens', difficulty: 'medium', impostorHint: 'Arco' },
  { id: 'personagens_medium_8', value: 'Wolverine', category: 'personagens', difficulty: 'medium', impostorHint: 'Garras' },
  { id: 'personagens_medium_9', value: 'Buzz Lightyear', category: 'personagens', difficulty: 'medium', impostorHint: 'Espaço' },
  { id: 'personagens_medium_10', value: 'Goku', category: 'personagens', difficulty: 'medium', impostorHint: 'Cauda' },

  // --- personagens (hard) ---
  { id: 'personagens_hard_1', value: 'Dom Quixote', category: 'personagens', difficulty: 'hard', impostorHint: 'Moinhos' },
  { id: 'personagens_hard_2', value: 'Capitão Gancho', category: 'personagens', difficulty: 'hard', impostorHint: 'Crocodilo' },
  { id: 'personagens_hard_3', value: 'Severus Snape', category: 'personagens', difficulty: 'hard', impostorHint: 'Poções' },
  { id: 'personagens_hard_4', value: 'Sauron', category: 'personagens', difficulty: 'hard', impostorHint: 'Anel' },
  { id: 'personagens_hard_5', value: 'Frankenstein', category: 'personagens', difficulty: 'hard', impostorHint: 'Laboratório' },

  // --- marcas (easy) ---
  { id: 'marcas_easy_1', value: 'Coca-Cola', category: 'marcas', difficulty: 'easy', impostorHint: 'Refrigerante' },
  { id: 'marcas_easy_2', value: "McDonald's", category: 'marcas', difficulty: 'easy', impostorHint: 'Palhaço' },
  { id: 'marcas_easy_3', value: 'Apple', category: 'marcas', difficulty: 'easy', impostorHint: 'Maçã' },
  { id: 'marcas_easy_4', value: 'Nike', category: 'marcas', difficulty: 'easy', impostorHint: 'Tênis' },
  { id: 'marcas_easy_5', value: 'Netflix', category: 'marcas', difficulty: 'easy', impostorHint: 'Streaming' },
  { id: 'marcas_easy_6', value: 'Google', category: 'marcas', difficulty: 'easy', impostorHint: 'Pesquisa' },
  { id: 'marcas_easy_7', value: 'Ferrari', category: 'marcas', difficulty: 'easy', impostorHint: 'Cavalinho' },
  { id: 'marcas_easy_8', value: 'Disney', category: 'marcas', difficulty: 'easy', impostorHint: 'Castelo' },
  { id: 'marcas_easy_9', value: 'Havaianas', category: 'marcas', difficulty: 'easy', impostorHint: 'Borracha' },
  { id: 'marcas_easy_10', value: 'Nubank', category: 'marcas', difficulty: 'easy', impostorHint: 'Roxo' },

  // --- marcas (medium) ---
  { id: 'marcas_medium_1', value: 'Lego', category: 'marcas', difficulty: 'medium', impostorHint: 'Encaixe' },
  { id: 'marcas_medium_2', value: 'Guaraná Antarctica', category: 'marcas', difficulty: 'medium', impostorHint: 'Amazônia' },
  { id: 'marcas_medium_3', value: 'Spotify', category: 'marcas', difficulty: 'medium', impostorHint: 'Playlists' },
  { id: 'marcas_medium_4', value: 'PlayStation', category: 'marcas', difficulty: 'medium', impostorHint: 'Controle' },
  { id: 'marcas_medium_5', value: 'Starbucks', category: 'marcas', difficulty: 'medium', impostorHint: 'Café' },
  { id: 'marcas_medium_6', value: 'Red Bull', category: 'marcas', difficulty: 'medium', impostorHint: 'Energético' },
  { id: 'marcas_medium_7', value: 'Rolex', category: 'marcas', difficulty: 'medium', impostorHint: 'Relógio' },
  { id: 'marcas_medium_8', value: 'Subway', category: 'marcas', difficulty: 'medium', impostorHint: 'Sanduíche' },
  { id: 'marcas_medium_9', value: 'Uber', category: 'marcas', difficulty: 'medium', impostorHint: 'Motorista' },
  { id: 'marcas_medium_10', value: 'Nintendo', category: 'marcas', difficulty: 'medium', impostorHint: 'Console' },

  // --- marcas (hard) ---
  { id: 'marcas_hard_1', value: 'Lamborghini', category: 'marcas', difficulty: 'hard', impostorHint: 'Touro' },
  { id: 'marcas_hard_2', value: 'Chanel', category: 'marcas', difficulty: 'hard', impostorHint: 'Perfume' },
  { id: 'marcas_hard_3', value: 'Harley-Davidson', category: 'marcas', difficulty: 'hard', impostorHint: 'Motocicleta' },
  { id: 'marcas_hard_4', value: 'Swarovski', category: 'marcas', difficulty: 'hard', impostorHint: 'Cristais' },
  { id: 'marcas_hard_5', value: 'Pringles', category: 'marcas', difficulty: 'hard', impostorHint: 'Tubos' },

  // --- tecnologia (easy) ---
  { id: 'tecnologia_easy_1', value: 'WhatsApp', category: 'tecnologia', difficulty: 'easy', impostorHint: 'Mensagens' },
  { id: 'tecnologia_easy_2', value: 'Instagram', category: 'tecnologia', difficulty: 'easy', impostorHint: 'Fotos' },
  { id: 'tecnologia_easy_3', value: 'YouTube', category: 'tecnologia', difficulty: 'easy', impostorHint: 'Vídeos' },
  { id: 'tecnologia_easy_4', value: 'Wi-Fi', category: 'tecnologia', difficulty: 'easy', impostorHint: 'Roteador' },
  { id: 'tecnologia_easy_5', value: 'Bluetooth', category: 'tecnologia', difficulty: 'easy', impostorHint: 'Pareamento' },
  { id: 'tecnologia_easy_6', value: 'Drone', category: 'tecnologia', difficulty: 'easy', impostorHint: 'Hélices' },
  { id: 'tecnologia_easy_7', value: 'Robô', category: 'tecnologia', difficulty: 'easy', impostorHint: 'Mecânica' },
  { id: 'tecnologia_easy_8', value: 'Satélite', category: 'tecnologia', difficulty: 'easy', impostorHint: 'Órbita' },
  { id: 'tecnologia_easy_9', value: 'Smartwatch', category: 'tecnologia', difficulty: 'easy', impostorHint: 'Pulso' },
  { id: 'tecnologia_easy_10', value: 'Tablet', category: 'tecnologia', difficulty: 'easy', impostorHint: 'Tela' },

  // --- tecnologia (medium) ---
  { id: 'tecnologia_medium_1', value: 'Inteligência Artificial', category: 'tecnologia', difficulty: 'medium', impostorHint: 'Algoritmo' },
  { id: 'tecnologia_medium_2', value: 'Pix', category: 'tecnologia', difficulty: 'medium', impostorHint: 'Chave' },
  { id: 'tecnologia_medium_3', value: 'TikTok', category: 'tecnologia', difficulty: 'medium', impostorHint: 'Rolagem' },
  { id: 'tecnologia_medium_4', value: 'Antivírus', category: 'tecnologia', difficulty: 'medium', impostorHint: 'Escaneamento' },
  { id: 'tecnologia_medium_5', value: 'Nuvem', category: 'tecnologia', difficulty: 'medium', impostorHint: 'Servidor' },
  { id: 'tecnologia_medium_6', value: 'Fone sem Fio', category: 'tecnologia', difficulty: 'medium', impostorHint: 'Estojo' },
  { id: 'tecnologia_medium_7', value: 'Impressora 3D', category: 'tecnologia', difficulty: 'medium', impostorHint: 'Filamento' },
  { id: 'tecnologia_medium_8', value: 'Criptomoeda', category: 'tecnologia', difficulty: 'medium', impostorHint: 'Carteira' },
  { id: 'tecnologia_medium_9', value: 'Realidade Virtual', category: 'tecnologia', difficulty: 'medium', impostorHint: 'Imersão' },
  { id: 'tecnologia_medium_10', value: 'GPS', category: 'tecnologia', difficulty: 'medium', impostorHint: 'Navegação' },

  // --- tecnologia (hard) ---
  { id: 'tecnologia_hard_1', value: 'Computador Quântico', category: 'tecnologia', difficulty: 'hard', impostorHint: 'Qubits' },
  { id: 'tecnologia_hard_2', value: 'Fibra Óptica', category: 'tecnologia', difficulty: 'hard', impostorHint: 'Velocidade' },
  { id: 'tecnologia_hard_3', value: 'Metaverso', category: 'tecnologia', difficulty: 'hard', impostorHint: 'Avatares' },
  { id: 'tecnologia_hard_4', value: 'Microchip', category: 'tecnologia', difficulty: 'hard', impostorHint: 'Silício' },
  { id: 'tecnologia_hard_5', value: 'Firewall', category: 'tecnologia', difficulty: 'hard', impostorHint: 'Segurança' },

]; 

export const CATEGORIES = [
  { id: 'all', name: 'Todas as Categorias' },
  { id: 'animais', name: 'Animais' },
  { id: 'comidas', name: 'Comidas' },
  { id: 'esportes', name: 'Esportes' },
  { id: 'filmes_e_series', name: 'Filmes e Séries' },
  { id: 'lugares', name: 'Lugares' },
  { id: 'jogos', name: 'Jogos' },
  { id: 'musica', name: 'Música' },
  { id: 'cotidiano', name: 'Cotidiano' },
  { id: 'objetos', name: 'Objetos' },
  { id: 'profissoes', name: 'Profissões' },
  { id: 'memes_brasileiros', name: 'Memes Brasileiros' },
  { id: 'cultura_brasileira', name: 'Cultura Brasileira' },
  { id: 'personagens', name: 'Personagens' },
  { id: 'marcas', name: 'Marcas Famosas' },
  { id: 'tecnologia', name: 'Tecnologia' },
  { id: 'personalizadas', name: 'Personalizadas' },
];