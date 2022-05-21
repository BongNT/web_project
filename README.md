# **Web Project**


# 1. Setup Python environment
## 1.1 Install python version >= 3.6

To check python version with command:

> python --version

## - Create python environment with command

    python -m venv /path/to/new/virtual/environment

Example: 

    python -m venv c:\path\to\venv

## - Run virtual environment

Change dir to folder **web_project\WebSever**

    venv\Scripts\activate

## - Install libary
    pip install -r requirements.txt

# 2. Config app

## - Open **web_project\WebSever\app\config.py**

## - Change variables value base on your MySQL settings:
- hostname
- port
- username
- password
- database_name

## - Change variables value in AppConfig:
- host (optional)
- port (optional)
  
  
# 3. Run backend
## - Change dir to folder **web_project\WebSever**

    python main.py
> Ensure you have run virtual environment

## - Open docs
Example: http://127.0.0.1:8000/docs








