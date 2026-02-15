-- Popula tabela genus
INSERT INTO
    genus (id, description, name)
VALUES (
        1,
        'Bulbophyllum',
        'bulbophyllum'
    ),
    (2, 'Cattleya', 'cattleya'),
    (3, 'Cymbidium', 'cymbidium'),
    (
        4,
        'Paphiopedilum',
        'paphiopedilum'
    ),
    (
        5,
        'Phalaenopsis',
        'phalaenopsis'
    );

-- Popula tabela type
INSERT INTO
    type (id, description, name)
VALUES (1, 'Espécie', 'species'),
    (2, 'Híbrido', 'hybrid');

-- Popula tabela luminosity
INSERT INTO
    luminosity (id, description, name)
VALUES (
        1,
        'Sombra total',
        'full-shade'
    ),
    (
        2,
        'Luz sombreada',
        'shaded-light'
    ),
    (
        3,
        'Luz filtrada',
        'filtered-light'
    ),
    (
        4,
        'Luz forte',
        'strong-light'
    );

-- Popula tabela temperature
INSERT INTO
    temperature (id, description, name)
VALUES (1, 'Frio', 'cold'),
    (2, 'Temperado', 'seasoned'),
    (3, 'Quente', 'hot'),
    (4, 'Muito quente', 'very-hot');

-- Popula tabela humidity
INSERT INTO
    humidity (id, description, name)
VALUES (1, '≤40%', 'lt40'),
    (2, '40% a 60%', '40-60'),
    (3, '60% a 80%', '60-80'),
    (4, '≥80%', 'gt80');

-- Popula tabela size
INSERT INTO
    size (id, description, name)
VALUES (1, 'Miniatura', 'miniature'),
    (2, 'Pequeno', 'small'),
    (3, 'Médio', 'medium'),
    (4, 'Grande', 'big');

-- Popula tabela orchid
INSERT INTO
    orchid (
        id,
        description,
        genus_id,
        type_id,
        luminosity_id,
        temperature_id,
        humidity_id,
        size_id,
        image
    )
VALUES (
        1,
        'Bulbophyllum eberhardtii',
        1,
        1,
        3,
        4,
        3,
        4,
        '/images/orchids/bulbophyllum/bulbophyllum-eberhardtii.jpg'
    ),
    (
        2,
        'Bulbophyllum echinolabium',
        1,
        1,
        3,
        3,
        4,
        4,
        '/images/orchids/bulbophyllum/bulbophyllum-echinolabium.jpg'
    ),
    (
        3,
        'Bulbophyllum frostii',
        1,
        1,
        2,
        3,
        3,
        1,
        '/images/orchids/bulbophyllum/bulbophyllum-frostii.jpg'
    ),
    (
        4,
        'Bulbophyllum Louis Sander',
        1,
        2,
        2,
        2,
        4,
        2,
        '/images/orchids/bulbophyllum/bulbophyllum-louis-sander.jpg'
    ),
    (
        5,
        'Bulbophyllum mastersianum',
        1,
        1,
        1,
        2,
        3,
        2,
        '/images/orchids/bulbophyllum/bulbophyllum-mastersianum.jpg'
    ),
    (
        6,
        'Cattleya Crystelle Smith',
        2,
        2,
        3,
        3,
        2,
        2,
        '/images/orchids/cattleya/cattleya-crystelle-smith.jpg'
    ),
    (
        7,
        'Cattleya Husky Boy',
        2,
        2,
        4,
        3,
        2,
        3,
        '/images/orchids/cattleya/cattleya-husky-boy.jpg'
    ),
    (
        8,
        'Cattleya labiata',
        2,
        1,
        4,
        3,
        2,
        3,
        '/images/orchids/cattleya/cattleya-labiata.jpg'
    ),
    (
        9,
        'Cattleya Ports of Paradise',
        2,
        2,
        4,
        3,
        2,
        4,
        '/images/orchids/cattleya/cattleya-ports-of-paradise.jpg'
    ),
    (
        10,
        'Cattleya tigrina',
        2,
        1,
        3,
        3,
        2,
        4,
        '/images/orchids/cattleya/cattleya-tigrina.jpg'
    ),
    (
        11,
        'Cymbidium Aiko Sama',
        3,
        2,
        4,
        2,
        1,
        4,
        '/images/orchids/cymbidium/cymbidium-aiko-sama.jpg'
    ),
    (
        12,
        'Cymbidium Gold Cadillac',
        3,
        2,
        4,
        2,
        1,
        4,
        '/images/orchids/cymbidium/cymbidium-gold-cadillac.jpg'
    ),
    (
        13,
        'Cymbidium Peter Pan',
        3,
        2,
        4,
        2,
        1,
        4,
        '/images/orchids/cymbidium/cymbidium-peter-pan.jpg'
    ),
    (
        14,
        'Cymbidium Red Beauty',
        3,
        2,
        4,
        2,
        1,
        4,
        '/images/orchids/cymbidium/cymbidium-red-beauty.jpg'
    ),
    (
        15,
        'Cymbidium Vogel Magic',
        3,
        2,
        4,
        2,
        1,
        4,
        '/images/orchids/cymbidium/cymbidium-vogel-magic.jpg'
    ),
    (
        16,
        'Paphiopedilum Americano',
        4,
        2,
        3,
        3,
        2,
        3,
        '/images/orchids/paphiopedilum/paphiopedilum-americano.jpg'
    ),
    (
        17,
        'Paphiopedilum leucochilum',
        4,
        1,
        2,
        2,
        4,
        2,
        '/images/orchids/paphiopedilum/paphiopedilum-leucochilum.jpg'
    ),
    (
        18,
        'Paphiopedilum Maudiae Femma',
        4,
        2,
        2,
        2,
        4,
        3,
        '/images/orchids/paphiopedilum/paphiopedilum-maudiae-femma.jpg'
    ),
    (
        19,
        'Paphiopedilum Montagnard',
        4,
        2,
        2,
        2,
        4,
        3,
        '/images/orchids/paphiopedilum/paphiopedilum-montagnard.jpg'
    ),
    (
        20,
        'Paphiopedilum spicerianum',
        4,
        1,
        1,
        2,
        4,
        2,
        '/images/orchids/paphiopedilum/paphiopedilum-spicerianum.jpg'
    ),
    (
        21,
        'Phalaenopsis Black Pearl',
        5,
        2,
        2,
        2,
        3,
        2,
        '/images/orchids/phalaenopsis/phalaenopsis-black-pearl.jpg'
    ),
    (
        22,
        'Phalaenopsis Liodoro',
        5,
        2,
        2,
        2,
        3,
        3,
        '/images/orchids/phalaenopsis/phalaenopsis-liodoro.jpg'
    ),
    (
        23,
        'Phalaenopsis Manhattan Rose',
        5,
        2,
        2,
        2,
        3,
        4,
        '/images/orchids/phalaenopsis/phalaenopsis-manhattan-rose.jpg'
    ),
    (
        24,
        'Phalaenopsis Spoted Harlequin',
        5,
        2,
        2,
        2,
        3,
        3,
        '/images/orchids/phalaenopsis/phalaenopsis-spoted-harlequin.jpg'
    ),
    (
        25,
        'Phalaenopsis Talin Gold',
        5,
        2,
        2,
        2,
        3,
        3,
        '/images/orchids/phalaenopsis/phalaenopsis-talin-gold.jpg'
    );