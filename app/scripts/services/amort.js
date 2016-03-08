define(['interface'], function(__interface__) {
  __interface__.factory("amortizationService", [function() {
    return {
      calcPayments : function(principal, periodRate, numPeriods) {
        if (periodRate === 0) { return principal / numPeriods; } // no interest

        // formula: A = P * [ r * (1+r)^n / (1+r)^n - 1]
        var r = Math.pow(1 + periodRate, numPeriods); // (1+r)^n;
        r = (periodRate * r) / (r - 1);
        return principal * r;
      },

      getPeriodRate : function(annualRate, compPeriod, yrFreq) {
        // formula: r = [(1+annualRate/compPeriod)^(compPeriod/yrFreq)] - 1
        annualRate = annualRate / 100;
        var r = 1 + (annualRate / compPeriod); // (1+i/n)
        return Math.pow(r, compPeriod/yrFreq) - 1;
      },

      createPayment : function(paymentAmt, prevBalance, periodRate, index) {
        var interest = periodRate * prevBalance;
        if (interest + prevBalance < paymentAmt) { // last payment could be less than paymentAmt
          paymentAmt = prevBalance + interest; // < old paymentAmt; need to update
        }
        var principal = paymentAmt - interest;
        var balance = prevBalance - principal;

        return {
          paymentIndex : index,
          amount : paymentAmt,
          interest : interest,
          principal : principal,
          balance : balance
        };
      }

    }
  }])
});
