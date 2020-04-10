def property_management_perc(perc, rent_estimate):
    property_management = {}

    property_management['type'] = 'property_management_perc'
    property_management['perc'] = perc
    property_management['amount'] = round(perc * rent_estimate)

    return property_management

def property_management_amt(amt, rent_estimate):
    property_management = {}

    property_management['type'] = 'property_management_amt'
    property_management['amount'] = amt
    property_management['perc'] = round(amt / rent_estimate, 4)

    return property_management

def vacancy(perc, rent_estimate):
    vacancy = {}

    vacancy['type'] = 'vacancy'
    vacancy['perc'] = perc
    vacancy['amount'] = round(perc * rent_estimate)

    return vacancy

def repairs(perc, rent_estimate):
    repairs = {}

    repairs['type'] = 'repairs'
    repairs['perc'] = perc
    repairs['amount'] = round(perc * rent_estimate)

    return repairs
