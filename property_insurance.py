# 0.007365 of purchase price works from experience
# Percent lessens the more the house increases in price

def property_insurance(house_price):
    if house_price < 200000:
        insurance_rate = 0.007365
    else:
        insurance_rate = 0.004736

    insurance = {'type':'property'}
    insurance['yearly'] = round(house_price * insurance_rate)
    insurance['monthly'] = round(insurance['yearly'] / 12)

    return insurance
