#https://www.valuepenguin.com/flood-insurance/flood-zones-affect-insurance-premiums

def flood_insurance(house_price):
    insurance = {'type': 'flood'}
    insurance['yearly'] = round(house_price/100 * 0.29)
    insurance['monthly'] = round(insurance['yearly'] / 12)

    return insurance
