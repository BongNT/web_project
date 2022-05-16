from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import DatabaseConfig

# connect to database
URL = DatabaseConfig().get_URL()
engine = create_engine(URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#
def get_db():
    """
    Each instance of the SessionLocal class will be a database session. The class itself is not a database session yet.
    But once we create an instance of the SessionLocal class, this instance will be the actual database session.
    :returns: SessionLocal
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()