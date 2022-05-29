import uvicorn
from fastapi import FastAPI
from app.router import manager, user, facility, certificate, inspection, sample

from app.config import AppConfig

app = FastAPI()
app.include_router(user.router)
app.include_router(manager.router)
app.include_router(facility.router)
app.include_router(certificate.router)
app.include_router(inspection.router)
app.include_router(sample.router)
@app.get("/")
async def root():
    return {"docs": f"{AppConfig.host}:{AppConfig.host}/docs"}

if __name__ == '__main__':
    uvicorn.run(app, host=AppConfig.host, port=AppConfig.port)


