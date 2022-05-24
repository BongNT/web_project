import uvicorn
from fastapi import FastAPI
from app.router import manager
from app.router import user
from app.config import AppConfig

app = FastAPI()
app.include_router(user.router)
app.include_router(manager.router)


@app.get("/")
async def root():
    return {"docs": f"{AppConfig.host}:{AppConfig.host}/docs"}

if __name__ == '__main__':
    uvicorn.run(app, host=AppConfig.host, port=AppConfig.port)


