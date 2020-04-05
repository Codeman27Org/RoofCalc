import requests
import xmltodict
import pandas as pd
from pandas.io.json import json_normalize
import api_keys

#url= 'http://www.zillow.com/webservice/GetRegionChildren.htm'
def search_results(address):
    url = 'https://www.zillow.com/webservice/GetSearchResults.htm'
    params = {
        'zws-id': api_keys.ZILLOW_API_KEY,
        'address': '3312-San-Domingo-St', #self._loc.state
        'citystatezip': 'Clearwater-FL-33759',
        'rentzestimate': True
    }
    try:
        result = requests.get(url, params=params)
    except requests.ConnectionError:
        print('failed to connect')
        return

    dict = xmltodict.parse(result.content)
    pd.set_option('max_columns', None)
    df = pd.DataFrame.from_records(dict['SearchResults:searchresults']['response']['results']['result'])
    #Grab the zestimate
    zestimate = list(df['zestimate']['amount'].items())[1][1]
    #zipcode =
    print(df['localRealEstate']['region'])
    #print(df)
    #print(df.loc[['homedetails'], :].columns)
    #print(df.columns)

address = 'does not work yet'
real_estate = search_results(address)
