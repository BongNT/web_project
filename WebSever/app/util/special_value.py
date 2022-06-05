from enum import Enum


class UserType(Enum):
    DEFAULT_ADMIN = 0
    ADMIN = 1
    MANAGER = 2

    @classmethod
    def get_list_value(cls):
        return [e.value for e in UserType]

    @classmethod
    def get_admin_value(cls):
        return [e.value for e in UserType if e.value != UserType.MANAGER.value]


class FacilityType(Enum):
    FOOD_PRODUCTION = 1
    FOOD_BUSINESS = 2
    FOOD_PRODUCTION_AND_BUSINESS = 3

    @classmethod
    def get_list_value(cls):
        return [e.value for e in FacilityType]


class CertificateStatus(Enum):
    VALID = 1
    EXPIRED = 2
    REVOKED = 3

    @classmethod
    def get_list_value(cls):
        return [e.value for e in CertificateStatus]


class SampleStatus(Enum):
    SENDING = 1
    CHECKING = 2
    FINISH = 3

    @classmethod
    def get_list_value(cls):
        return [e.value for e in SampleStatus]


class Gender(Enum):
    MALE = 1
    FEMALE = 2
    OTHER = 3

    @classmethod
    def get_list_value(cls):
        return [e.value for e in Gender]
