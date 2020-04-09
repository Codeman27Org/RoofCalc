# Assume 1% of of the entire loan amount

def mortgage_insurance(loan):
    pmi_rate = 0.01

    insurance = {'type':'mortgage'}
    insurance['yearly'] = round(loan * pmi_rate)
    insurance['monthly'] = round(insurance['yearly'] / 12)

    return insurance
