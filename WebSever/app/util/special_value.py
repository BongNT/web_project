from enum import Enum


class UserType(Enum):
    DEFAULT_ADMIN = 0
    ADMIN = 1
    MANAGER = 2

    @classmethod
    def get_list_value(cls):
        return [e.value for e in UserType]


class FacilityType(Enum):
    FOOD_PRODUCTION = 1
    FOOD_BUSINESS = 2
    FOOD_PRODUCTION_AND_BUSINESS = 3

    @classmethod
    def get_list_value(cls):
        return [e.value for e in FacilityType]


class CertificateStatus(Enum):
    VALID = 0
    EXPIRED = 1
    REVOKED = 2

    @classmethod
    def get_list_value(cls):
        return [e.value for e in CertificateStatus]