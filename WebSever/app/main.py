import uvicorn
from fastapi import FastAPI
from controller import user_controller

app = FastAPI()
app.include_router(user_controller.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)


