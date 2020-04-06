# 0.007365 of purchase price works from experience

def insurance(house_price):
    if house_price < 200000:
        insurance_rate = 0.007365
    else:
        insurance_rate = 0.004736

    insurance = {}
    insurance['yearly'] = round(house_price * insurance_rate)
    insurance['monthly'] = round(insurance['yearly'] / 12)

    return insurance
