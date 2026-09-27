-- ============================================================
-- Seeds - SportConnect Pro
-- Données de test
-- ============================================================


-- ============================================================
-- 1. FAMILLES
-- ============================================================

INSERT INTO famille (
    nom_famille,
    quotient_familial
)
VALUES
    ('Famille El Amrani', 500.00),
    ('Famille Benali', 750.00),
    ('Famille Alaoui', 1200.00);


-- ============================================================
-- 2. MEMBRES
-- ============================================================

INSERT INTO membre (
    prenom,
    nom,
    date_naissance,
    est_resident,
    code_pass_sport,
    famille_id,
    date_emission_certificat,
    date_expiration_certificat,
    type_sport_certifie,
    statut_certificat
)
VALUES
    (
        'Yassine',
        'El Amrani',
        '2005-03-15',
        TRUE,
        'PS-2026-001',
        1,
        '2026-01-10',
        '2027-01-10',
        'Football',
        'valide'
    ),
    (
        'Sara',
        'El Amrani',
        '2008-07-22',
        TRUE,
        'PS-2026-002',
        1,
        '2026-02-05',
        '2027-02-05',
        'Natation',
        'valide'
    ),
    (
        'Omar',
        'Benali',
        '1999-11-08',
        FALSE,
        NULL,
        2,
        NULL,
        NULL,
        NULL,
        NULL
    ),
    (
        'Aya',
        'Benali',
        '2012-05-18',
        FALSE,
        'PS-2026-003',
        2,
        '2026-03-01',
        '2027-03-01',
        'Basketball',
        'valide'
    ),
    (
        'Adam',
        'Alaoui',
        '2006-09-30',
        TRUE,
        'PS-2026-004',
        3,
        '2025-08-15',
        '2026-08-15',
        'Football',
        'expire'
    );


-- ============================================================
-- 3. ASSOCIATIONS
-- ============================================================

INSERT INTO association (
    nom,
    description,
    contact
)
VALUES
    (
        'Association Sportive Youssoufia',
        'Association dédiée aux activités sportives pour les jeunes.',
        '0600000001'
    ),
    (
        'Club Sportif Espoir',
        'Club proposant plusieurs activités sportives.',
        '0600000002'
    );


-- ============================================================
-- 4. INFRASTRUCTURES
-- ============================================================

INSERT INTO infrastructure (
    nom,
    type,
    capacite_erp,
    divisible
)
VALUES
    (
        'Complexe Sportif Central',
        'Terrain de football',
        100,
        FALSE
    ),
    (
        'Piscine Municipale',
        'Piscine',
        50,
        TRUE
    ),
    (
        'Salle Omnisports',
        'Salle couverte',
        80,
        TRUE
    );


-- ============================================================
-- 5. ACTIVITES
-- ============================================================

INSERT INTO activite (
    nom,
    prix_base,
    capacite_max,
    categorie_age,
    jour_semaine,
    heure_debut,
    heure_fin,
    type_public,
    association_id,
    infrastructure_id
)
VALUES
    (
        'Football Jeunes',
        150.00,
        25,
        '12-18 ans',
        'Samedi',
        '10:00',
        '12:00',
        'Jeunes',
        1,
        1
    ),
    (
        'Natation',
        120.00,
        20,
        '8-18 ans',
        'Mercredi',
        '15:00',
        '17:00',
        'Jeunes',
        1,
        2
    ),
    (
        'Basketball',
        100.00,
        20,
        '10-18 ans',
        'Vendredi',
        '16:00',
        '18:00',
        'Jeunes',
        2,
        3
    ),
    (
        'Football Adultes',
        200.00,
        22,
        '18+',
        'Dimanche',
        '09:00',
        '11:00',
        'Adultes',
        2,
        1
    );


-- ============================================================
-- 6. INSCRIPTIONS
-- ============================================================

-- Membre 1 -> Football Jeunes -> confirmée
INSERT INTO inscription (
    membre_id,
    activite_id,
    date_inscription,
    statut,
    prix_final,
    score_priorite,
    date_entree_liste_attente,
    delai_confirmation
)
VALUES
(
    3,
    4,
    '2026-09-03 09:00:00',
    'en_attente',
    200.00,
    75,
    '2026-09-03 09:00:00',
    NULL
);


-- Membre 2 -> Natation -> confirmée
INSERT INTO inscription (
    membre_id,
    activite_id,
    date_inscription,
    statut,
    prix_final
)
VALUES
    (
        2,
        2,
        '2026-09-02 14:30:00',
        'confirmee',
        120.00
    );


-- Membre 3 -> Football Adultes -> en attente
INSERT INTO inscription (
    membre_id,
    activite_id,
    date_inscription,
    statut,
    prix_final,
    score_priorite,
    date_entree_liste_attente,
    delai_confirmation
)
VALUES
    (
        3,
        4,
        '2026-09-03 09:00:00',
        'en_attente',
        200.00,
        75,
        '2026-09-03 09:00:00',
        '2026-09-10 09:00:00'
    );


-- Membre 4 -> Basketball -> confirmée
INSERT INTO inscription (
    membre_id,
    activite_id,
    date_inscription,
    statut,
    prix_final
)
VALUES
    (
        4,
        3,
        '2026-09-04 11:00:00',
        'confirmee',
        100.00
    );


-- Membre 5 -> Football Jeunes -> annulée
INSERT INTO inscription (
    membre_id,
    activite_id,
    date_inscription,
    statut,
    prix_final
)
VALUES
    (
        5,
        1,
        '2026-09-05 15:00:00',
        'annulee',
        150.00
    );


-- ============================================================
-- 7. PAIEMENTS
-- ============================================================

INSERT INTO paiement (
    montant,
    methode,
    nombre_echeances,
    statut,
    inscription_id
)
VALUES
    (
        150.00,
        'carte',
        1,
        'paye',
        1
    ),
    (
        120.00,
        'especes',
        1,
        'paye',
        2
    ),
    (
        100.00,
        'carte',
        2,
        'en_attente',
        4
    );


-- ============================================================
-- FIN DES SEEDS
-- ============================================================