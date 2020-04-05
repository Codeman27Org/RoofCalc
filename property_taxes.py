from bs4 import BeautifulSoup
import pandas as pd
from urllib.request import urlopen, Request

def property_taxes(state, county):
    url = 'https://smartasset.com/taxes/' + state +'-property-tax-calculator'

    request = urlopen(url)
    response = request.read()

    soup = BeautifulSoup(response, 'html.parser')

    table = soup.findAll('table')[7]
    df = pd.read_html(str(table))[0]
    return df[df['County'] == county]['Average Effective Property Tax Rate'].values[0]

print(property_taxes('fl', 'Jefferson'))
print(property_taxes('fl', 'Alachua'))
