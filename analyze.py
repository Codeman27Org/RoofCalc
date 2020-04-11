

def analyze(data):
    print(data)

    analysis = {}
    rent_ratio = round(data['zestimates']['rent_zestimate']/data['zestimates']['zestimate'], 4)
    total_operating_expenses = data['taxes']['tax_amt_mn'] + data['pi']['monthly'] + data['fi']['monthly'] + \
                                data['pmi']['monthly'] + data['pm']['amount'] + data['vacancy']['amount'] +  data['repairs']['amount']
    net_operating_income = data['zestimates']['rent_zestimate'] - total_operating_expenses
    cap_rate = net_operating_income * 12 / data['zestimates']['zestimate']
    net_monthly_income = net_operating_income - data['monthly_mortgage']['monthly_payment']
    cash_on_cash = (net_monthly_income * 12)/(data['monthly_mortgage']['down_payment'] + data['closing_costs']['closing_costs'] + data['rehab_costs'])

    print('rent ratio: ' + str(round(rent_ratio * 100,2)) + '%')
    print('operating expenses: $' + str(total_operating_expenses))
    print('NOI: $' + str(round(net_operating_income)))
    print('cap rate: ' + str(round(cap_rate * 100, 2)) + '%')
    print('Net monthly income: $' + str(net_monthly_income))
    print('cap rate: '+ str(round(cash_on_cash * 100, 2)) + '%')
    # Cash on Cash return
    # Cap rate
    # Return on Equity
