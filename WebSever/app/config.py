
class DatabaseConfig:
    """
    This data base using is mysql.
    If you want to using others database, you can search this link
    https://docs.sqlalchemy.org/en/14/core/engines.html#database-urls
    You must change the value of hostname, port, username, password, database_name
    base on your database config.
    """
    hostname = "localhost"
    port = 3307
    username = "root"
    password = ""
    database_name = "web"

    def get_URL(self):
        # mysql+pymysql://<username>:<password>@<host>/<dbname>
        return f"mysql+pymysql://{self.username}:{self.password}@{self.hostname}:{self.port}/{self.database_name}?charset=utf8mb4"
