from location import location
from search_results import search_results
from mortgage_rates import mortgage_rates
from mortgage_calc import mortgage_calc, mortgage_calc_perc
from property_taxes import property_taxes

def api():
    loc = location('3312-San-Domingo-St-Clearwater-FL-33759')
    address = loc['address'].replace(' ', '-')
    citystatezip = loc['city'] + '-' + loc['state'] +  '-'+ loc['zip']

    zestimates = search_results(address, citystatezip)
    mortgage_rate = mortgage_rates('30-year fixed rate')
    monthly_payment = mortgage_calc_perc(zestimates['zestimate'], 0.2, mortgage_rate['rate'], mortgage_rate['years'])
    taxes = property_taxes(loc['state'], loc['county'], zestimates['zestimate'])
    print(zestimates)
    print(mortgage_rate['rate'])
    print(monthly_payment)
    print(taxes)
    # Get location based on address
    # Get zestimate and rental zestimate based on location
    # Get mortgage rate based on loan type
    # Get mortgage calc based on mortgage rate

api()
