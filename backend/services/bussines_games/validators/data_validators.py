from pydantic import BaseModel, validator


class TradeData(BaseModel):
    """Класс валидатор trade data."""

    seller_id: int
    resource: str
    quantity: int
    price_per_one: int

    @validator("resource")
    def correct_resource(cls, value):
        """Метод проверки, есть ли action."""
        resource = [
            "wood",
            "glass",
            "brick",
            "shingles",
            "small_area",
            "big_area",
            "crane",
            "communications",
            "plan_of_small_house",
            "plan_of_big_house",
            "small_house",
            "big_house",
        ]

        if value not in resource:
            raise ValueError("Такого ресурса не существует")

        return value


class AcceptOrCloseData(BaseModel):
    item_id: int


class CreditCounterOffer(BaseModel):
    item_id: int
    percent: int


class CreditData(BaseModel):
    bank_id: int
    money: int
    percents: int


class MakePayCreditData(BaseModel):
    item_id: int
    money: int


class TakeMoneyFromBankData(BaseModel):
    money: int


class AllWagesData(BaseModel):
    president: int
    MVD: int
    minister_economy: int
    minister_education: int
    minister_JKH: int
    SMI: int


class WagesData(BaseModel):
    total_wage: int
    payments: AllWagesData


class Limits(BaseModel):
    small_area: int
    big_area: int
    crane: int
    communications: int
    builder_diploma: int
    architect_diploma: int
    percent_credit: int
    tax: int


class AllChatData(BaseModel):
    message: str


class PrivateChatData(BaseModel):
    user_id: int
    message: str


class LifeTimeLicensesData(BaseModel):
    building_license: int = 0
    architecting_license: int = 0
    wood_license: int
    glass_license: int
    brick_license: int
    shingles_license: int


class ArchitectActions(BaseModel):
    method: str

    @validator("method")
    def is_correct(cls, value):
        valid_values = [
            "small_house_plan",
            "big_house_plan",
        ]
        if value not in valid_values:
            raise ValueError("Такого ресурса не существует")

        return value


class BuilderActions(BaseModel):
    method: str

    @validator("method")
    def is_correct(cls, value):
        valid_values = [
            "small_house",
            "big_house",
        ]
        if value not in valid_values:
            raise ValueError("Такого ресурса не существует")

        return value


class ManufacturerActions(BaseModel):
    method: str

    @validator("method")
    def is_correct(cls, value):
        valid_values = [
            "brick",
            "wood",
            "glass",
            "shingles",
        ]
        if value not in valid_values:
            raise ValueError("Такого ресурса не существует")

        return value


class TradeToMVDData(BaseModel):
    resource: str
    quantity: int
    price_per_one: int

    @validator("resource")
    def correct_resource(cls, value):
        """Метод проверки, есть ли action."""
        resource = [
            "small_area",
            "big_area",
            "crane",
            "communications",
        ]

        if value not in resource:
            raise ValueError("Такого ресурса не существует")

        return value


class TradeToJKH(BaseModel):
    resource_license: str
    price: int

    @validator("resource_license")
    def correct_resource_license(cls, value):
        """Метод проверки, есть ли action."""
        resource = [
            "building_license",
            "architecting_license",
            "wood_license",
            "glass_license",
            "brick_license",
            "shingles_license",
        ]

        if value not in resource:
            raise ValueError("Такого ресурса не существует")

        return value


class TradeToEducationMinister(BaseModel):
    diploma: str
    price: int

    @validator("diploma")
    def correct_diploma(cls, value):
        """Метод проверки, есть ли action."""
        resource = [
            "building_diploma",
            "architect_diploma",
        ]

        if value not in resource:
            raise ValueError("Такого ресурса не существует")

        return value


class TradeToSMI(BaseModel):
    smi_id: int
    quantity: int
    price_per_one: int
