import requests
import xmltodict
import pandas as pd
from pandas.io.json import json_normalize
import api_keys

#url= 'http://www.zillow.com/webservice/GetRegionChildren.htm'
def search_results(address, citystatezip):
    url = 'https://www.zillow.com/webservice/GetSearchResults.htm'
    params = {
        'zws-id': api_keys.ZILLOW_API_KEY,
        'address': address, #self._loc.state
        'citystatezip': citystatezip,
        'rentzestimate': True
    }
    try:
        result = requests.get(url, params=params)
    except requests.ConnectionError:
        print('failed to connect')
        return

    dict = xmltodict.parse(result.content)
    df = pd.DataFrame.from_records(dict['SearchResults:searchresults']['response']['results']['result'])

    zestimates = {}
    try:
        zestimates['zestimate'] = float(df['zestimate']['amount']['#text'])
        zestimates['rent_zestimate'] = float(df['rentzestimate']['amount']['#text'])
    except:
        zestimates['zestimate'] = 0
        zestimates['rent_zestimate'] = 0

    return zestimates

# address = 'does not work yet'
from location import location
loc = location('428-29-1/2-Rd-Grand-Junction-CO-81504-USA')
address = loc['address'].replace(' ', '-')
citystatezip = loc['city'] + '-' + loc['state'] +  '-'+ loc['zip']
print(search_results(address, citystatezip))
