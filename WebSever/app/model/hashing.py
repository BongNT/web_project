from passlib.context import CryptContext

pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(pw):
    hashed_password = pwd_cxt.hash(pw)
    return hashed_password

def verify(hashed_password, plain_password):
    return pwd_cxt.verify(plain_password, hashed_password)