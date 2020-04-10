from location import location
from search_results import search_results
from mortgage_rates import mortgage_rates
from mortgage_calc import mortgage_calc, mortgage_calc_perc
from property_taxes import property_taxes
from insurance import *
from expenses import *
from analyze import *

def api():
    loc = location('3312-San-Domingo-St-Clearwater-FL-33759')
    address = loc['address'].replace(' ', '-')
    citystatezip = loc['city'] + '-' + loc['state'] +  '-'+ loc['zip']

    data = {}
    data['zestimates'] = search_results(address, citystatezip)
    data['mortgage_rate'] = mortgage_rates('30-year fixed rate')
    data['monthly_mortgage'] = mortgage_calc_perc(data['zestimates']['zestimate'], 0.2, data['mortgage_rate']['rate'], data['mortgage_rate']['years'])
    data['taxes'] = property_taxes(loc['state'], loc['county'], data['zestimates']['zestimate'])
    data['pi'] = property_insurance(data['zestimates']['zestimate'])
    data['pmi'] = mortgage_insurance(data['zestimates']['zestimate'] - data['monthly_mortgage']['down_payment'])
    data['fi'] = flood_insurance(data['zestimates']['zestimate'])
    data['pm'] = property_management_perc(0.1, data['zestimates']['rent_zestimate'])
    data['vacancy'] = vacancy(0.1, data['zestimates']['rent_zestimate'])
    data['repairs'] = repairs(0.1, data['zestimates']['rent_zestimate'])

    print(analyze(data))
    # Rent ratio
        # house_price
        # rental_estimate
    # NOI (No P&I)
        #
    # Cash on Cash Return
        # Down payment
        # Rehab Costs
        # Monthly Repairs (10%)
        # Monthly Vacancy (10%)
        # Property Management (10%)


api()
