import uvicorn
from fastapi import FastAPI
from app.controller import user_controller

app = FastAPI()
app.include_router(user_controller.router)


@app.get("/")
async def root():
    return {"docs": "127.0.0.1:8000/docs"}

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)


