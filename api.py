from location import location
from search_results import search_results
from mortgage_rates import mortgage_rates
from mortgage_calc import mortgage_calc, mortgage_calc_perc
from property_taxes import property_taxes
from insurance import insurance

def api():
    loc = location('3312-San-Domingo-St-Clearwater-FL-33759')
    address = loc['address'].replace(' ', '-')
    citystatezip = loc['city'] + '-' + loc['state'] +  '-'+ loc['zip']

    zestimates = search_results(address, citystatezip)
    mortgage_rate = mortgage_rates('30-year fixed rate')
    monthly_payment = mortgage_calc_perc(zestimates['zestimate'], 0.2, mortgage_rate['rate'], mortgage_rate['years'])
    taxes = property_taxes(loc['state'], loc['county'], zestimates['zestimate'])
    insurance_amts = insurance(zestimates['zestimate'])

    # Rent ratio
        # house_price
        # rental_estimate
    # Cash on Cash Return
        # Down payment
        # Monthly Repairs (10%)
        # Monthly Vacancy (10%)
        # Property Management (10%)


    print(zestimates)
    print(mortgage_rate['rate'])
    print(monthly_payment)
    print(taxes)
    print(insurance_amts)

api()
