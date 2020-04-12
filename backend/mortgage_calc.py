#Run this function if given down payment price
def mortgage_calc(house_price, down_payment, interest_rate, loan_type):
    months_in_year = 12
    loan = house_price - down_payment
    monthly_rate = interest_rate/months_in_year
    num_pmts = loan_type * months_in_year

    mortgage = {}
    mortgage['monthly_payment'] = round(loan*(monthly_rate*(1 + monthly_rate)**num_pmts)/((1 + monthly_rate)**num_pmts - 1))
    mortgage['down_payment'] = down_payment
    mortgage['loan_amount'] = house_price - down_payment

    return mortgage

#Run this function if given down payment percent
def mortgage_calc_perc(house_price, down_payment_perc, interest_rate, loan_type):
    months_in_year = 12
    loan = house_price - (down_payment_perc * house_price)
    monthly_rate = interest_rate/months_in_year
    num_pmts = loan_type * months_in_year

    mortgage = {}
    mortgage['monthly_payment'] = round(loan*(monthly_rate*(1 + monthly_rate)**num_pmts)/((1 + monthly_rate)**num_pmts - 1))
    mortgage['down_payment'] = round(down_payment_perc * house_price)
    mortgage['loan_amount'] = house_price - (down_payment_perc * house_price)

    return mortgage


#print(mortgage_calc(150000, 30000, 0.045, 30))
#print(mortgage_calc_perc(150000, 0.2, 0.045, 30))
