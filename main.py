from fastapi import FastAPI,Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from DateSearchService import SearchService

app = FastAPI()

# install pip install fastapi[all]
# run server command (uvicorn main:app --reload)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get('/dates-from/{year}/{month}')
async def dates(year,month):
    search_service = SearchService(month,year)
    dates = search_service.get_dates()
    return dates

@app.get("/")
async def root(request:Request):
    return templates.TemplateResponse("index.html",{"request":request})