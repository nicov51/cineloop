-- ============================================================
-- CinéLoop — Données de test (seed)
-- À exécuter APRÈS 01-schema.sql
-- ============================================================

-- ============================================================
-- ADMIN
-- Un seul administrateur pour le back-office
-- Le mot de passe est hashé (on verra le hashage plus tard)
-- ============================================================
INSERT INTO admin (email, mot_de_passe, nom) VALUES
('admin@cineloop.fr', 'motdepasse_hash_a_remplacer', 'Administrateur');

-- ============================================================
-- CATEGORIES
-- 7 catégories fixes
-- ============================================================
INSERT INTO categorie (nom) VALUES
('Action'),
('Comédie'),
('Drame'),
('Science-fiction'),
('Animation'),
('Horreur'),
('Documentaire');

-- ============================================================
-- ADHERENTS
-- 5 clients de test
-- ============================================================
INSERT INTO adherent (nom, prenom, email, telephone, adresse, date_inscription, actif) VALUES
('Dupont', 'Jean', 'jean.dupont@mail.fr', '0612345678', '12 rue de la Paix, 75001 Paris', '2026-01-15', TRUE),
('Martin', 'Marie', 'marie.martin@mail.fr', '0698765432', '5 avenue des Fleurs, 69000 Lyon', '2026-02-20', TRUE),
('Durand', 'Paul', 'paul.durand@mail.fr', '0611223344', '8 boulevard Victor Hugo, 13000 Marseille', '2026-03-10', TRUE),
('Bernard', 'Sophie', 'sophie.bernard@mail.fr', '0655443322', '3 rue du Commerce, 33000 Bordeaux', '2026-04-05', TRUE),
('Petit', 'Lucas', 'lucas.petit@mail.fr', '0677889900', '15 place de la Mairie, 44000 Nantes', '2026-05-12', FALSE);

-- ============================================================
-- FILMS
-- 25 films avec leur stock
-- ============================================================
INSERT INTO film (titre, annee_sortie, realisateur, synopsis, duree, type_support, quantite_stock, quantite_disponible) VALUES
('Dune', 2021, 'Denis Villeneuve', 'Paul Atréides mène une guerre pour libérer Arrakis.', 155, 'DVD', 3, 3),
('Inception', 2010, 'Christopher Nolan', 'Un voleur pénètre les rêves pour y dérober des secrets.', 148, 'DVD', 2, 2),
('Matrix', 1999, 'Lana Wachowski', 'Un hacker découvre que la réalité est une simulation.', 136, 'DVD', 2, 2),
('Alien', 1979, 'Ridley Scott', 'Un équipage affronte une créature extraterrestre.', 117, 'BLU_RAY', 2, 2),
('Pulp Fiction', 1994, 'Quentin Tarantino', 'Des histoires entrelacées dans le monde du crime.', 154, 'DVD', 1, 1),
('Le Parrain', 1972, 'Francis Ford Coppola', 'L''ascension d''une famille mafieuse.', 175, 'DVD', 2, 2),
('Interstellar', 2014, 'Christopher Nolan', 'Des explorateurs voyagent à travers un trou de ver.', 169, 'BLU_RAY', 2, 2),
('Parasite', 2019, 'Bong Joon-ho', 'Une famille pauvre s''infiltre chez des riches.', 132, 'DVD', 1, 1),
('Fight Club', 1999, 'David Fincher', 'Un employé de bureau fonde un club de combat clandestin.', 139, 'DVD', 2, 2),
('Forrest Gump', 1994, 'Robert Zemeckis', 'La vie extraordinaire d''un homme simple.', 142, 'DVD', 1, 1),
('Gladiator', 2000, 'Ridley Scott', 'Un général romain devient gladiateur pour se venger.', 155, 'DVD', 2, 2),
('Titanic', 1997, 'James Cameron', 'Une histoire d''amour sur le paquebot maudit.', 195, 'DVD', 1, 1),
('Avatar', 2009, 'James Cameron', 'Un marine découvre la planète Pandora.', 162, 'BLU_RAY', 3, 3),
('Le Seigneur des Anneaux', 2001, 'Peter Jackson', 'Un hobbit doit détruire un anneau maléfique.', 178, 'DVD', 2, 2),
('La Liste de Schindler', 1993, 'Steven Spielberg', 'Un industriel sauve des Juifs pendant la Shoah.', 195, 'DVD', 1, 1),
('Shining', 1980, 'Stanley Kubrick', 'Un écrivain sombre dans la folie dans un hôtel isolé.', 146, 'DVD', 1, 1),
('Le Fabuleux Destin d''Amélie Poulain', 2001, 'Jean-Pierre Jeunet', 'Une serveuse décide de changer la vie des autres.', 122, 'DVD', 2, 2),
('Toy Story', 1995, 'John Lasseter', 'Des jouets prennent vie quand les humains partent.', 81, 'DVD', 3, 3),
('Le Roi Lion', 1994, 'Roger Allers', 'Un lionceau doit reprendre sa place sur le trône.', 88, 'DVD', 2, 2),
('Spirited Away', 2001, 'Hayao Miyazaki', 'Une fillette se retrouve dans un monde d''esprits.', 125, 'BLU_RAY', 2, 2),
('The Dark Knight', 2008, 'Christopher Nolan', 'Batman affronte le Joker à Gotham.', 152, 'DVD', 2, 2),
('Inglourious Basterds', 2009, 'Quentin Tarantino', 'Des soldats juifs traquent les nazis en France.', 153, 'DVD', 1, 1),
('Whiplash', 2014, 'Damien Chazelle', 'Un jeune batteur subit la pression d''un professeur tyrannique.', 106, 'DVD', 2, 2),
('Get Out', 2017, 'Jordan Peele', 'Un jeune homme découvre un secret terrifiant chez sa belle-famille.', 104, 'DVD', 1, 1),
('Une affaire de famille', 2018, 'Hirokazu Kore-eda', 'Une famille japonaise vit de petits larcins.', 121, 'DVD', 1, 1);

-- ============================================================
-- FILM_CATEGORIE
-- Association entre films et catégories (N-N)
-- On utilise les IDs (1 = Action, 2 = Comédie, etc.)
-- ============================================================
INSERT INTO film_categorie (film_id, categorie_id) VALUES
-- Dune (1) : SF + Action
(1, 1), (1, 4),
-- Inception (2) : SF + Action
(2, 1), (2, 4),
-- Matrix (3) : SF + Action
(3, 1), (3, 4),
-- Alien (4) : SF + Horreur
(4, 4), (4, 6),
-- Pulp Fiction (5) : Drame
(5, 3),
-- Le Parrain (6) : Drame
(6, 3),
-- Interstellar (7) : SF + Drame
(7, 3), (7, 4),
-- Parasite (8) : Drame
(8, 3),
-- Fight Club (9) : Drame
(9, 3),
-- Forrest Gump (10) : Drame + Comédie
(10, 2), (10, 3),
-- Gladiator (11) : Action + Drame
(11, 1), (11, 3),
-- Titanic (12) : Drame
(12, 3),
-- Avatar (13) : SF + Action
(13, 1), (13, 4),
-- Le Seigneur des Anneaux (14) : Action
(14, 1),
-- La Liste de Schindler (15) : Drame
(15, 3),
-- Shining (16) : Horreur
(16, 6),
-- Amélie Poulain (17) : Comédie
(17, 2),
-- Toy Story (18) : Animation + Comédie
(18, 2), (18, 5),
-- Le Roi Lion (19) : Animation
(19, 5),
-- Spirited Away (20) : Animation
(20, 5),
-- The Dark Knight (21) : Action
(21, 1),
-- Inglourious Basterds (22) : Action + Drame
(22, 1), (22, 3),
-- Whiplash (23) : Drame
(23, 3),
-- Get Out (24) : Horreur
(24, 6),
-- Une affaire de famille (25) : Drame
(25, 3);

-- ============================================================
-- RESERVATIONS
-- Quelques emprunts de test
-- ============================================================
INSERT INTO reservation (adherent_id, film_id, date_emprunt, date_retour_prevue, date_retour_effective, statut) VALUES
-- Jean Dupont a emprunté Dune, pas encore rendu
(1, 1, '2026-10-10', '2026-10-17', NULL, 'EN_COURS'),
-- Marie Martin a emprunté Inception, pas encore rendu
(2, 2, '2026-10-05', '2026-10-12', NULL, 'EN_COURS'),
-- Paul Durand a emprunté Alien, en retard
(3, 4, '2026-10-01', '2026-10-08', NULL, 'EN_COURS'),
-- Sophie Bernard a emprunté Matrix, rendu
(4, 3, '2026-09-15', '2026-09-22', '2026-09-20', 'TERMINEE'),
-- Jean Dupont a emprunté Pulp Fiction, rendu
(1, 5, ' status2026-09-01', '2026-09-08', '2026-09-07', 'TERMINEE');