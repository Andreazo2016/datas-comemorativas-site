import requests
import xlwt
from bs4 import BeautifulSoup
import json

class SearchService:
    def __init__(self,month,year):
        self.month = month
        self.year = year
    
    def __get_site_by_url_parsered(self,url):
        site_em_html = requests.get(url)
        soup = BeautifulSoup(site_em_html.text, 'html.parser')
        return soup

    def __get_dates_from_site(self,site):
        table = site.find('table',class_='calendar-table')
        tbody = table.find('tbody')
        trs = tbody.select('tr')
        dates = []
        for tr in trs:
            tds = tr.select('td')
            for td in tds:
                classes = td['class']
                if(not 'is-empty' in classes):
                    day_number = td.find('span',class_='day-number').get_text()
                    day_week = td.find('span',class_='day-week').get_text()
                    uls =  td.find('ul',class_='day-dates')
                    if uls is not None:
                        lis = uls.select('li',class_='day-date')
                        data_info = []
                        for li in lis:
                            data_info.append(li.get_text())
                        
                        obj = {
                            "day_number":day_number,
                            "day_week":day_week,
                            "day_info":data_info
                        }
                        dates.append(obj)
        return dates
        
    def __save_in_json(self,data):
         with open('./static/dates.json', 'w',encoding='utf8') as f:
             json.dump(data, f, ensure_ascii=False)    


    def get_dates(self):
        url = "https://www.datascomemorativas.me/{}/{}".format(self.year,self.month)
        site_parsered = self.__get_site_by_url_parsered(url)
        dates = self.__get_dates_from_site(site_parsered)
        json = {
            "year":self.year,
            "month":self.month,
            "dates":dates
        }
        self.__save_in_json(json)

        return json