// const api = 'http://127.0.0.1:5000'
const api = 'http://ec2-34-239-111-10.compute-1.amazonaws.com'

const dummyData = {
  address: "123 Main St, Anytown, USA",
  zestimates: {
    rent_zestimate: 2000,
    zestimate: 300000
  },
  taxes: {
    tax_amt_yr: 3600,
    tax_rate: 0.02
  },
  pmi: {
    yearly: 3000
  },
  pi: {
    yearly: 1200
  },
  fi: {
    yearly: 800
  },
  utilities: {
    electric: 150,
    water: 50,
    gas: 75,
    trash: 25
  },
  rehab_estimate: 15000,
  data_usa: {
    "Population": 50000,
    "Population_Change": 0.023,
    "Household Income by Race": 65000,
    "Household Income by Race_Change": 0.034,
    "Workforce by Occupation and Gender": 25000,
    "Workforce by Occupation and Gender_Change": 0.015
  },
  monthly_mortgage: {
    down_payment: 40000,
    down_payment_perc: 0.20
  },
  mortgage_rate: {
    rate: 0.065,
    loan_type: "30-year"
  },
  closing_costs: {
    closing_costs: 10500
  }
}

export const getAll = (address) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

  return fetch(`${api}/analysis?address=${address}`, {
    signal: controller.signal
  })
    .then(response => {
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.warn('Failed to fetch data from backend:', error.message);
      console.log('Returning dummy data instead');
      return {
        ...dummyData,
        address: `DUMMY DATA - ${address}`, // Prefix the address to indicate dummy data
        error: 'Using fallback data - backend unavailable'
      };
    });
};
