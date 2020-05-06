from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from location import location
from search_results import search_results
from mortgage_rates import mortgage_rates
from mortgage_calc import mortgage_calc, mortgage_calc_perc
from property_taxes import property_taxes
from insurance import *
from expenses import *
from analyze import *

application = Flask(__name__)
CORS(application)

@application.route('/analysis', methods=['GET'])
def get_data():
    user_input = {
        'rehab_costs': 20000,
        'address': ''
    }
    user_input['address'] = request.args.get('address', default='')
    user_input['address'] = user_input['address'].replace(',', '').replace(' ', '-')
    # # print(address)
    loc = location('102-59th-Ave-E-A-Bradenton-FL-34203')
    address = loc['address'].replace(' ', '-')
    citystatezip = loc['city'] + '-' + loc['state'] +  '-'+ loc['zip']
    #
    data = {}
    data['zestimates'] = search_results(address, citystatezip)
    data['mortgage_rate'] = mortgage_rates('30-year fixed rate')
    data['monthly_mortgage'] = mortgage_calc_perc(data['zestimates']['zestimate'], 0.2, data['mortgage_rate']['rate'], data['mortgage_rate']['years'])
    data['taxes'] = property_taxes(loc['state'], loc['county'], data['zestimates']['zestimate'])
    data['pi'] = property_insurance(data['zestimates']['zestimate'])
    data['pmi'] = mortgage_insurance(data['zestimates']['zestimate'] - data['monthly_mortgage']['down_payment'], 0.2)
    data['fi'] = flood_insurance(data['zestimates']['zestimate'])
    data['pm'] = property_management_perc(0.1, data['zestimates']['rent_zestimate'])
    data['vacancy'] = vacancy(0.1, data['zestimates']['rent_zestimate'])
    data['repairs'] = repairs(0.1, data['zestimates']['rent_zestimate'])
    data['closing_costs'] = closing_costs_perc(data['monthly_mortgage']['loan_amount'])
    data['rehab_costs'] = user_input['rehab_costs']
    data['input_address'] = user_input['address']

    return jsonify(data)

if __name__ == '__main__':
    application.run(debug=True)
