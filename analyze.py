

def analyze(data):
    print(data)

    analysis = {}
    rent_ratio = round(data['zestimates']['rent_zestimate']/data['zestimates']['zestimate'], 4)
    total_operating_expenses = data['taxes']['tax_amt_mn'] + data['pi']['monthly'] + data['fi']['monthly'] + \
                                data['pmi']['monthly'] + data['pm']['amount'] + data['vacancy']['amount'] +  data['repairs']['amount']
    net_operating_income = data['zestimates']['rent_zestimate'] - total_operating_expenses
    cap_rate = net_operating_income * 12 / data['zestimates']['zestimate']
    #data['monthly_mortgage']['monthly_payment'] +
    print('rent ratio: ' + str(rent_ratio * 100))
    print('operating expenses: ' + str(total_operating_expenses) + '%')
    print('NOI: ' + str(net_operating_income))
    print('cap rate: ' + str(round(cap_rate * 100,2)) + '%')
    # Cash on Cash return
    # Cap rate
    # Return on Equity
