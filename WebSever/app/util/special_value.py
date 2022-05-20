from enum import Enum


class UserType(Enum):
    DEFAULT_ADMIN = 0
    ADMIN = 1
    MANAGER = 2

    @classmethod
    def get_list_value(cls):
        return [e.value for e in UserType]

