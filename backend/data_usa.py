import requests
import pandas as pd
import json
from datetime import datetime

pd.set_option('display.max_columns', None)

def data_usa(citystate):
    response = requests.get('https://banana.datausa.io/api/search?dimension=Geography&hierarchy=Place&limit=50000')
    df = pd.DataFrame.from_dict(response.json()['results'])
    data_id = df[df['name'] == citystate]['id']

    url = 'https://datausa.io/api/data'
    params = {
        'Geography': data_id,
        'measures': 'Population',
    }
    try:
        response = requests.get(url, params=params)
    except requests.ConnectionError:
        print('failed to connect')
        return

    measures = ['Population'] #Household, Job Growth

    df = pd.DataFrame(response.json()['data'])
    df['pct_change'] = df['Population'].pct_change(-1)
    pop_change = df['pct_change'].mean()
    pop = df[df['Year'] == df['Year'].max()]['Population'][0]
    new_pop = pop * pow(1 + pop_change, int(datetime.now().year) - int(df['Year'].max()))
    print(pop_change)
    print(pop)
    print(round(new_pop))
    # print(df)
    # df = pd.DataFrame.from_dict(response.json()['data'])
    # print(df)



    # df = pd.read_csv(data)

    # df = pd.DataFrame.from_records(dict['SearchResults:searchresults']['response']['results']['result'])
    #
    # zestimates = {}
    # print(df['zestimate'])
    # try:
    #     zestimates['zestimate'] = float(df['zestimate']['amount']['#text'])
    #     zestimates['rent_zestimate'] = float(df['rentzestimate']['amount']['#text'])
    # except:
    #     zestimates['zestimate'] = 0
    #     zestimates['rent_zestimate'] = 0
    #
    # return zestimates

from location import location
loc = location('428 29 1/2 Rd Grand Junction CO 81504')
# loc = location('1810 E Palm Ave Apt 4208 Tampa, FL, 33605')
address = loc['address'].replace(' ', '-')
citystate = loc['city'] + ', ' + loc['state']
print(address)
print(citystate)
print(data_usa(citystate.replace('-' , ', ')))
