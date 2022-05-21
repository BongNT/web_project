from passlib.context import CryptContext

pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(pw):
    hashed_password = pwd_cxt.hash(pw)
    return hashed_password
