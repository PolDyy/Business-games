from services.bussines_games.roles.descriptions import RolesDescriptions
from services.bussines_games.roles.roles import (
    Bank,
    BaseGameRole,
    MinisterEconomy,
    MinisterEducation,
    MinisterJKH,
    MinisterMVD,
    President,
    RoleSMI,
)


class RolesDict:
    __builder = {
        "name": "Строитель",
        "alias": "builder",
        "description": RolesDescriptions.builder,
        "role": BaseGameRole,
    }
    __architect = {
        "name": "Архитектор",
        "alias": "architect",
        "description": RolesDescriptions.architect,
        "role": BaseGameRole,
    }
    __manufacturer = {
        "name": "Производитель",
        "alias": "manufacturer",
        "description": RolesDescriptions.manufacturer,
        "role": BaseGameRole,
    }
    __smi = {
        "name": "СМИ",
        "alias": "SMI",
        "description": RolesDescriptions.SMI,
        "role": RoleSMI,
    }

    __bank = {
        "name": "Коммерческий банк",
        "alias": "bank",
        "description": RolesDescriptions.bank,
        "role": Bank,
    }

    roles_dict = {
        1: {
            "name": "Президент",
            "alias": "president",
            "description": RolesDescriptions.president,
            "role": President,
        },
        2: {
            "name": "Министр экономики и финансов",
            "alias": "minister_economy",
            "description": RolesDescriptions.minister_economy,
            "role": MinisterEconomy,
        },
        3: {
            "name": "Министр ЖКХ",
            "alias": "minister_JKH",
            "description": RolesDescriptions.minister_JKH,
            "role": MinisterJKH,
        },
        4: {
            "name": "Министр образования",
            "alias": "minister_JKH",
            "description": RolesDescriptions.minister_education,
            "role": MinisterEducation,
        },
        5: {
            "name": "Министр внутренних дел",
            "alias": "minister_JKH",
            "description": " ",
            "role": MinisterMVD,
        },
        6: __bank,
        7: __builder,
        8: __builder,
        9: __builder,
        10: __builder,
        11: __manufacturer,
        12: __manufacturer,
        13: __manufacturer,
        14: __architect,
        15: __architect,
        16: __smi,
        17: __builder,
        18: __manufacturer,
        19: __bank,
        20: __architect,
        21: __builder,
        22: __manufacturer,
        23: __architect,
        24: __bank,
        25: __smi,
        26: __builder,
        27: __manufacturer,
        28: __bank,
        29: __architect,
        30: __builder,
        31: __manufacturer,
    }
