import './App.css';
  import { useState } from 'react';

  function App() {

    var [Loanamount , setLoanamount] = useState ('');
    var [loanyear , setLoanyear] = useState ('');
    var [loanrate , setLoanrate] = useState ('');
    var [paymentmonth , setPaymentmonth] = useState ('');
    var [ Monthlyemi, setMonthlyemi] = useState ('');
    var [totalamount , settotalamount] =useState ('');
    var [amountInterest , setamountInterest] = useState ('');
    var [flatRatePA , setflatRatePA] = useState('');
    var [flatRatePM , setflatRatePM] = useState('');
    var [amortizationTable, setAmortizationTable] = useState([]);

    var getdata = () => {
      var Loan_Amount = parseFloat(Loanamount);
      var loan_year = parseFloat(loanyear);
      var loan_rate = parseFloat(loanrate) / 100 ;
      
      var month = loan_year * 12;

      var monthly_EMI = loan_rate / 12;

      var emi = 
      (Loan_Amount * monthly_EMI * Math.pow(1 + monthly_EMI, month)) / 
      (Math.pow(1 + monthly_EMI,month) - 1)

      setPaymentmonth(month);
      setMonthlyemi(emi.toFixed(2));

      var total_amount = month * emi;
      settotalamount(total_amount);

      var s_i = total_amount - Loan_Amount;
      setamountInterest(s_i);
      
      var flat_rate_PA = ((s_i / Loan_Amount) / loan_year) * 100;
      setflatRatePA(flat_rate_PA.toFixed(2));

      var flat_rate_PM = flat_rate_PA / month * 10;
      setflatRatePM(flat_rate_PM.toFixed(2));

      var balance = Loan_Amount;
      var arr = ['January','February','March','April','May','June','July',
                    'August','September','October','November','December'];
                    
      var amortizationTableData = [];

      let  mon = 7 , yer = 2023;
      
      for(let i =1; i <= month; i++)
      {
        var interest = balance * monthly_EMI;
        var Principle_pym = emi - interest;
        var e_balance = balance - Principle_pym;

        amortizationTableData.push({
          index: i,
          month: arr[mon],
          year: yer,
          balance:balance.toFixed(0),
          emi: emi.toFixed(0),
          principle: Principle_pym.toFixed(0),
          interest: interest.toFixed(0),
          endingBalance: Math.abs(e_balance.toFixed(0)),
        }); 
        
        if(mon === 11)
        {
          mon = 0;
          yer++;
        }else
        {
          mon++;
        }

        balance -= Principle_pym;
      }
      setAmortizationTable(amortizationTableData);

    } 

    return (
      <div className="App">
        <table>
          <div className='loan'>
            <h2>Loan Amortization Calculator</h2>
            <h5 className='loan1'>

              loan amount :
              <input type='text' value={Loanamount} onChange={(e) => setLoanamount(e.target.value)}></input>

            </h5>
            <h5 className='loan1'>

              No Of Year :
              <input type='text' value={loanyear} onChange={(e) => setLoanyear(e.target.value)}></input>

            </h5>
            <h5 className="loan1">

              Rate :
              <input type="text" value={loanrate} onChange={(e) => setLoanrate(e.target.value)}></input>

            </h5>
            <h5 className="loan2">

              <input type="button" name="" value="SHOW AMORTIZATION TABLE" onClick={getdata}></input>

            </h5>
          </div>
        </table>
        <table>
          <tr>
            <td>Payment Duration :{paymentmonth}</td>
          </tr>
          <tr>
            <td>Calculated Monthly EMI : {Monthlyemi}</td>
          </tr>
          <tr>
            <td>Total Amount with Interest : {totalamount}</td>
          </tr>
          <tr>
            <td>Total Interest Amount : {amountInterest}</td>
          </tr>
          <tr>
            <td>Flat Interest Rate PA : {flatRatePA}</td>
          </tr>
          <tr>
            <td>Flat Interest Rate PM : {flatRatePM}</td>
          </tr>
        </table>

        <br></br>

        <table id="t_table" border="2">
          <thead>
            <tr className='tbl'>
              <th>No.</th>
              <th>month</th>
              <th>year</th>
              <th>starting balance</th>
              <th>Interest Paid</th>
              <th>EMI</th>
              <th>Principle Paid</th>
              <th>Ending Balance</th>
            </tr>
          </thead>
          <tbody>
            {amortizationTable.map((row) => (
              <tr key={row.index}>
                <td>{row.index}</td>
                <td>{row.month}</td>
                <td>{row.year}</td>
                <td>{row.balance}</td>
                <td>{row.emi}</td>
                <td>{row.principle}</td>
                <td>{row.interest}</td>
                <td>{row.endingBalance}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }

  export default App;