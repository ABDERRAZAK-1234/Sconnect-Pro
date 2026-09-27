-- ============================================================
-- SportConnect Pro
-- PostgreSQL Database Schema
-- ============================================================

-- ============================================================
-- SUPPRESSION DES TABLES EXISTANTES
-- ============================================================

DROP TABLE IF EXISTS paiement CASCADE;
DROP TABLE IF EXISTS inscription CASCADE;
DROP TABLE IF EXISTS activite CASCADE;
DROP TABLE IF EXISTS membre CASCADE;
DROP TABLE IF EXISTS association CASCADE;
DROP TABLE IF EXISTS infrastructure CASCADE;
DROP TABLE IF EXISTS famille CASCADE;


-- ============================================================
-- 1. TABLE FAMILLE
-- ============================================================

CREATE TABLE famille (
    id                  SERIAL PRIMARY KEY,

    nom_famille         VARCHAR(150) NOT NULL,

    quotient_familial   DECIMAL(10,2),

    CONSTRAINT check_quotient_familial
        CHECK (
            quotient_familial IS NULL
            OR quotient_familial >= 0
        )
);


-- ============================================================
-- 2. TABLE MEMBRE
-- ============================================================

CREATE TABLE membre (
    id                          SERIAL PRIMARY KEY,

    prenom                      VARCHAR(100) NOT NULL,

    nom                         VARCHAR(100) NOT NULL,

    date_naissance              DATE NOT NULL,

    est_resident                BOOLEAN NOT NULL DEFAULT FALSE,

    code_pass_sport             VARCHAR(50),

    famille_id                  INTEGER NOT NULL,

    date_emission_certificat    DATE,

    date_expiration_certificat  DATE,

    type_sport_certifie         VARCHAR(100),

    statut_certificat           VARCHAR(30),

    CONSTRAINT fk_membre_famille
        FOREIGN KEY (famille_id)
        REFERENCES famille(id)
        ON DELETE CASCADE,

    CONSTRAINT check_dates_certificat
        CHECK (
            (
                date_emission_certificat IS NULL
                AND date_expiration_certificat IS NULL
            )
            OR
            (
                date_emission_certificat IS NOT NULL
                AND date_expiration_certificat IS NOT NULL
                AND date_expiration_certificat > date_emission_certificat
            )
        ),

    CONSTRAINT check_statut_certificat
        CHECK (
            statut_certificat IS NULL
            OR statut_certificat IN (
                'valide',
                'expire',
                'refuse',
                'medical_non_compliant'
            )
        )
);


-- ============================================================
-- 3. TABLE ASSOCIATION
-- ============================================================

CREATE TABLE association (
    id              SERIAL PRIMARY KEY,

    nom             VARCHAR(150) NOT NULL,

    description     TEXT,

    contact         VARCHAR(150)
);


-- ============================================================
-- 4. TABLE INFRASTRUCTURE
-- ============================================================

CREATE TABLE infrastructure (
    id              SERIAL PRIMARY KEY,

    nom             VARCHAR(150) NOT NULL,

    type             VARCHAR(100) NOT NULL,

    capacite_erp    INTEGER NOT NULL,

    divisible       BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT check_capacite_erp
        CHECK (capacite_erp > 0)
);


-- ============================================================
-- 5. TABLE ACTIVITE
-- ============================================================

CREATE TABLE activite (
    id                  SERIAL PRIMARY KEY,

    nom                 VARCHAR(150) NOT NULL,

    prix_base           DECIMAL(10,2) NOT NULL,

    capacite_max        INTEGER NOT NULL,

    categorie_age       VARCHAR(50),

    jour_semaine        VARCHAR(20) NOT NULL,

    heure_debut        TIME NOT NULL,

    heure_fin          TIME NOT NULL,

    type_public         VARCHAR(50),

    association_id      INTEGER NOT NULL,

    infrastructure_id   INTEGER NOT NULL,

    CONSTRAINT fk_activite_association
        FOREIGN KEY (association_id)
        REFERENCES association(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_activite_infrastructure
        FOREIGN KEY (infrastructure_id)
        REFERENCES infrastructure(id)
        ON DELETE CASCADE,

    CONSTRAINT check_prix_base
        CHECK (prix_base >= 0),

    CONSTRAINT check_capacite_max
        CHECK (capacite_max > 0),

    CONSTRAINT check_heures
        CHECK (heure_fin > heure_debut)
);


-- ============================================================
-- 6. TABLE INSCRIPTION
-- ============================================================

CREATE TABLE inscription (
    id                          SERIAL PRIMARY KEY,

    membre_id                   INTEGER NOT NULL,

    activite_id                 INTEGER NOT NULL,

    date_inscription            TIMESTAMP NOT NULL DEFAULT NOW(),

    statut                      VARCHAR(30) NOT NULL DEFAULT 'en_attente',

    prix_final                  DECIMAL(10,2),

    score_priorite              INTEGER,

    date_entree_liste_attente   TIMESTAMP,

    delai_confirmation          TIMESTAMP,

    CONSTRAINT fk_inscription_membre
        FOREIGN KEY (membre_id)
        REFERENCES membre(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_inscription_activite
        FOREIGN KEY (activite_id)
        REFERENCES activite(id)
        ON DELETE CASCADE,

    CONSTRAINT check_statut_inscription
        CHECK (
            statut IN (
                'en_attente',
                'confirmee',
                'annulee',
                'expiree',
                'promoted_pending'
            )
        ),

    CONSTRAINT check_prix_final
        CHECK (
            prix_final IS NULL
            OR prix_final >= 0
        ),

    CONSTRAINT check_score_priorite
        CHECK (
            score_priorite IS NULL
            OR score_priorite >= 0
        ),

    CONSTRAINT check_waiting_list
        CHECK (
            (
                statut = 'en_attente'
                AND score_priorite IS NOT NULL
                AND date_entree_liste_attente IS NOT NULL
                AND delai_confirmation IS NULL
            )

            OR

            (
                statut = 'promoted_pending'
                AND score_priorite IS NOT NULL
                AND date_entree_liste_attente IS NOT NULL
                AND delai_confirmation IS NOT NULL
            )

            OR

            (
                statut IN (
                    'confirmee',
                    'annulee',
                    'expiree'
                )
                AND score_priorite IS NULL
                AND date_entree_liste_attente IS NULL
                AND delai_confirmation IS NULL
            )
        ),

    CONSTRAINT unique_membre_activite
        UNIQUE (membre_id, activite_id)
);


-- ============================================================
-- 7. TABLE PAIEMENT
-- ============================================================

CREATE TABLE paiement (
    id                  SERIAL PRIMARY KEY,

    montant             DECIMAL(10,2) NOT NULL,

    methode             VARCHAR(50) NOT NULL,

    nombre_echeances    INTEGER NOT NULL DEFAULT 1,

    statut              VARCHAR(30) NOT NULL,

    inscription_id      INTEGER NOT NULL UNIQUE,

    CONSTRAINT fk_paiement_inscription
        FOREIGN KEY (inscription_id)
        REFERENCES inscription(id)
        ON DELETE CASCADE,

    CONSTRAINT check_montant
        CHECK (montant >= 0),

    CONSTRAINT check_nombre_echeances
        CHECK (nombre_echeances > 0),

    CONSTRAINT check_statut_paiement
        CHECK (
            statut IN (
                'en_attente',
                'paye',
                'echoue',
                'rembourse'
            )
        )
);


-- ============================================================
-- INDEX
-- ============================================================

CREATE INDEX idx_membre_famille
ON membre(famille_id);

CREATE INDEX idx_activite_association
ON activite(association_id);

CREATE INDEX idx_activite_infrastructure
ON activite(infrastructure_id);

CREATE INDEX idx_inscription_membre
ON inscription(membre_id);

CREATE INDEX idx_inscription_activite
ON inscription(activite_id);

CREATE INDEX idx_inscription_statut
ON inscription(statut);

CREATE INDEX idx_inscription_waiting_list
ON inscription(
    activite_id,
    statut,
    score_priorite
);

CREATE INDEX idx_paiement_inscription
ON paiement(inscription_id);