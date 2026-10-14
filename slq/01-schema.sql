-- ============================================================
-- CinéLoop — Schéma de la base de données
-- Base : PostgreSQL 16
-- ============================================================

-- Suppression des tables si elles existent (pour repartir de zéro)
DROP TABLE IF EXISTS reservation CASCADE;
DROP TABLE IF EXISTS film_categorie CASCADE;
DROP TABLE IF EXISTS film CASCADE;
DROP TABLE IF EXISTS categorie CASCADE;
DROP TABLE IF EXISTS adherent CASCADE;
DROP TABLE IF EXISTS admin CASCADE;

-- ============================================================
-- TABLE : admin
-- L'administrateur du back-office (une seule personne)
-- ============================================================
CREATE TABLE admin (
    id              SERIAL PRIMARY KEY,
    email           VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe    VARCHAR(255) NOT NULL,
    nom             VARCHAR(100) NOT NULL,
    date_creation   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE : adherent
-- Les clients du vidéo-club
-- ============================================================
CREATE TABLE adherent (
    id              SERIAL PRIMARY KEY,
    nom             VARCHAR(100) NOT NULL,
    prenom          VARCHAR(100) NOT NULL,
    email           VARCHAR(150) UNIQUE,
    telephone       VARCHAR(20),
    adresse         TEXT,
    date_inscription DATE NOT NULL DEFAULT CURRENT_DATE,
    actif           BOOLEAN NOT NULL DEFAULT TRUE
);

-- ============================================================
-- TABLE : categorie
-- Les genres de films (Action, Comédie, etc.)
-- ============================================================
CREATE TABLE categorie (
    id      SERIAL PRIMARY KEY,
    nom     VARCHAR(50) NOT NULL UNIQUE
);

-- ============================================================
-- TABLE : film
-- Le catalogue des DVD
-- ============================================================
CREATE TABLE film (
    id                  SERIAL PRIMARY KEY,
    titre               VARCHAR(255) NOT NULL,
    annee_sortie        INTEGER,
    realisateur         VARCHAR(150),
    synopsis            TEXT,
    duree               INTEGER,
    type_support        VARCHAR(20) NOT NULL DEFAULT 'DVD',
    quantite_stock      INTEGER NOT NULL DEFAULT 1,
    quantite_disponible INTEGER NOT NULL DEFAULT 1,
    affiche             VARCHAR(255),
    date_ajout          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_type_support CHECK (type_support IN ('DVD', 'BLU_RAY')),
    CONSTRAINT chk_quantite_stock CHECK (quantite_stock >= 0),
    CONSTRAINT chk_quantite_disponible CHECK (quantite_disponible >= 0),
    CONSTRAINT chk_quantite_coherente CHECK (quantite_disponible <= quantite_stock)
);

-- ============================================================
-- TABLE : film_categorie
-- Table de liaison N-N entre film et categorie
-- ============================================================
CREATE TABLE film_categorie (
    film_id         INTEGER NOT NULL,
    categorie_id    INTEGER NOT NULL,

    PRIMARY KEY (film_id, categorie_id),
    CONSTRAINT fk_film_categorie_film
        FOREIGN KEY (film_id) REFERENCES film(id) ON DELETE CASCADE,
    CONSTRAINT fk_film_categorie_categorie
        FOREIGN KEY (categorie_id) REFERENCES categorie(id) ON DELETE CASCADE
);

-- ============================================================
-- TABLE : reservation
-- Les emprunts de DVD
-- ============================================================
CREATE TABLE reservation (
    id                      SERIAL PRIMARY KEY,
    adherent_id             INTEGER NOT NULL,
    film_id                 INTEGER NOT NULL,
    date_emprunt            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_retour_prevue      DATE NOT NULL,
    date_retour_effective   DATE,
    statut                  VARCHAR(20) NOT NULL DEFAULT 'EN_COURS',

    CONSTRAINT fk_reservation_adherent
        FOREIGN KEY (adherent_id) REFERENCES adherent(id) ON DELETE RESTRICT,
    CONSTRAINT fk_reservation_film
        FOREIGN KEY (film_id) REFERENCES film(id) ON DELETE RESTRICT,
    CONSTRAINT chk_statut CHECK (statut IN ('EN_COURS', 'TERMINEE', 'EN_RETARD', 'ANNULEE'))
);

-- ============================================================
-- INDEX
-- Pour accélérer les recherches fréquentes
-- ============================================================
CREATE INDEX idx_film_titre ON film(titre);
CREATE INDEX idx_adherent_nom ON adherent(nom);
CREATE INDEX idx_reservation_statut ON reservation(statut);
CREATE INDEX idx_reservation_adherent ON reservation(adherent_id);