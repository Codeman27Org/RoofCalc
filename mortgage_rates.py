from bs4 import BeautifulSoup
import pandas as pd
from urllib.request import urlopen, Request

def mortgage_rates(loan_type):
    url = 'https://www.nerdwallet.com/mortgages/mortgage-rates'

    request = urlopen(url)
    response = request.read()

    soup = BeautifulSoup(response, 'html.parser')

    table = soup.find('table')
    df = pd.read_html(str(table))[0]

    return df[df['Product'] == loan_type]['Interest rate'].values[0]

print(mortgage_rates('30-year fixed rate'))
print(mortgage_rates('15-year fixed rate'))
print(mortgage_rates('5/1 ARM rate'))
#encode('utf-8')
#print(soup.encode('utf-8'))
