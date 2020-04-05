#Run this function if given down payment price
def mortgage_calc(house_price, down_payment, interest_rate, loan_type):
    months_in_year = 12
    loan = house_price - down_payment
    monthly_rate = interest_rate/months_in_year
    num_pmts = loan_type * months_in_year

    return round(loan*(monthly_rate*(1 + monthly_rate)**num_pmts)/((1 + monthly_rate)**num_pmts - 1))

#Run this function if given down payment percent
def mortgage_calc_perc(house_price, down_payment_perc, interest_rate, loan_type):
    months_in_year = 12
    loan = house_price - (down_payment_perc * house_price)
    monthly_rate = interest_rate/months_in_year
    num_pmts = loan_type * months_in_year

    return round(loan*(monthly_rate*(1 + monthly_rate)**num_pmts)/((1 + monthly_rate)**num_pmts - 1))


print(mortgage_calc(150000, 30000, 0.045, 30))
print(mortgage_calc_perc(150000, 0.2, 0.045, 30))
