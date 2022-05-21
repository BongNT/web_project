import uvicorn
from fastapi import FastAPI
from app.controller import user_controller
from app.config import AppConfig
app = FastAPI()
app.include_router(user_controller.router)


@app.get("/")
async def root():
    return {"docs": f"{AppConfig.host}:{AppConfig.host}/docs"}

if __name__ == '__main__':
    uvicorn.run(app, host=AppConfig.host, port=AppConfig.port)


