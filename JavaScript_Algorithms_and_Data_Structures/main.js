function palindrome(str) {
    var re = /[\W_]/g;
    var lowRegStr = str.toLowerCase().replace(re, '');
    var reverseStr = lowRegStr.split('').reverse().join('');
    return reverseStr === lowRegStr;
}

function convertToRoman(num) {
    var roman = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    var romanNum = '';
    for (var i in roman) {
        while (num >= roman[i]) {
            romanNum += i;
            num -= roman[i];
        }
    }
    return romanNum;
}

function rot13(str) {
    var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var b = "NOPQRSTUVWXYZABCDEFGHIJKLM";
    var result = "";
    for (var i = 0; i < str.length; i++) {
        var c = str[i];
        if (c.match(/[a-z]/)) {
            c = c.toUpperCase();
            result += b[a.indexOf(c)];
        } else if (c.match(/[^A-Z^a-z^0-9]/)) {
            result += c;
        } else {
            result += b[a.indexOf(c)];
        }
    }
    return result;
}

function telephoneCheck(str) {
    var regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
    return regex.test(str);
}

function checkCashRegister(price, cash, cid) {
    const currency = {
        "PENNY": { "value": 0.01, "total": 0 },
        "NICKEL": { "value": 0.05, "total": 0 },
        "DIME": { "value": 0.01, "total": 0 },
        "QUARTER": { "value": 0.25, "total": 0 },
        "ONE": { "value": 1, "total": 0 },
        "FIVE": { "value": 5, "total": 0 },
        "TEN": { "value": 10, "total": 0 },
        "TWENTY": { "value": 20, "total": 0 },
        "ONE HUNDRED": { "value": 100, "total": 0 }
    }
    let currencyTotal = 0;
    for (let i = 0; i < cid.length; i++) {
        currency[cid[i][0]]["total"] = cid[i][1];
        currencyTotal += cid[i][1];
    }
    let change = cash - price;
    let changeArr = [];
    while (change > 0) {
        if (change >= currency["ONE HUNDRED"]["value"]) {
            changeArr.push(["ONE HUNDRED", currency["ONE HUNDRED"]["value"]]);
            change -= currency["ONE HUNDRED"]["value"];
        } else if (change >= currency["TWENTY"]["value"]) {
            changeArr.push(["TWENTY", currency["TWENTY"]["value"]]);
            change -= currency["TWENTY"]["value"];
        } else if (change >= currency["TEN"]["value"]) {
            changeArr.push(["TEN", currency["TEN"]["value"]]);
            change -= currency["TEN"]["value"];
        } else if (change >= currency["FIVE"]["value"]) {
            changeArr.push(["FIVE", currency["FIVE"]["value"]]);
            change -= currency["FIVE"]["value"];
        } else if (change >= currency["ONE"]["value"]) {
            changeArr.push(["ONE", currency["ONE"]["value"]]);
            change -= currency["ONE"]["value"];
        } else if (change >= currency["QUARTER"]["value"]) {
            changeArr.push(["QUARTER", currency["QUARTER"]["value"]]);
            change -= currency["QUARTER"]["value"];
        } else if (change >= currency["DIME"]["value"]) {
            changeArr.push(["DIME", currency["DIME"]["value"]]);
            change -= currency["DIME"]["value"];
        } else if (change >= currency["NICKEL"]["value"]) {
            changeArr.push(["NICKEL", currency["NICKEL"]["value"]]);
            change -= currency["NICKEL"]["value"];
        } else if (change >= currency["PENNY"]["value"]) {
            changeArr.push(["PENNY", currency["PENNY"]["value"]]);
        } else {
            return ({ status: "INSUFFICIENT_FUNDS", change: [] });
        }
    }

    let changeTracker = [["ONE HUNDRED", 0], ["TWENTY", 0], ["TEN", 0], ["FIVE", 0], ["ONE", 0], ["QUARTER", 0], ["DIME", 0], ["NICKEL", 0], ["PENNY", 0]];


    for (let i = 0; i < changeArr.length; i++) {
        for (let j = 0; j < changeTracker.length; j++) {
            if (changeTracker[j][0] === changeArr[i][0])
                changeTracker[j][1] += changeArr[i][1]
        }
    }

   
    let changetotal = 0;
    for (let i = 0; i < changeArr.length; i++) {
        changetotal += changeArr[i][1]
    }
    console.log(changetotal,currencyTotal)
    if (changetotal == currencyTotal) {
        return ({ status: "CLOSE", change: changeTracker });
    } else {
        return ({ status: "OPEN", change: changeT2 });
    }
}

const rs = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
console.log(rs);