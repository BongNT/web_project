import uvicorn
from fastapi import FastAPI
from app.router import manager, user, facility, certificate, inspection, sample,authentication, user_information
from fastapi.middleware.cors import CORSMiddleware
from app.config import AppConfig

app = FastAPI()
app.include_router(authentication.router)
app.include_router(user.router)
app.include_router(manager.router)
app.include_router(facility.router)
app.include_router(certificate.router)
app.include_router(inspection.router)
app.include_router(sample.router)
app.include_router(user_information.router)
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:4000",
    "http://localhost:5000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"docs": f"{AppConfig.host}:{AppConfig.host}/docs"}

if __name__ == '__main__':
    uvicorn.run(app, host=AppConfig.host, port=AppConfig.port)


