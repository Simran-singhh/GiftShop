function flat10Discount(products, subTotal) {
    const discountAmount = 10;
    console.log("Flat 10 Discount : ", discountAmount);
    return discountAmount;
}

function bulk5Discount(products, shortlistedProducts, subTotal) {
    let discountAmount = 0;

    for (const product of shortlistedProducts) {
        discountAmount += product[1] * product[2] * 0.05;
    }

    console.log("Bulk 5 Discount : ", discountAmount);
    return discountAmount;
}

function bulk10Discount(products, subTotal) {
    const discountAmount = subTotal * 0.1;
    console.log("Bulk 10 Discount : ", discountAmount);
    return discountAmount;
}

function tiered50Discount(products, shortlistedProducts, subTotal) {
    let discountAmount = 0;

    for (const product of shortlistedProducts) {
        discountAmount += (product[1] * (product[2] - 15)) * 0.5;
    }

    console.log("Tiered 50 Discount : ", discountAmount);
    return discountAmount;
}

function generateBill(products, isGiftW) {
    let subTotal = 0;
    let subUnits = 0;
    const bulk5DiscountArr = [];
    const tiered50DiscountArr = [];
    const discounts = [false, false, false, false];
    let flagTiered = false;

    console.log("Product List ");
    console.log("Name Units Amount");

    for (const product of products) {
        subTotal += product[1] * product[2];
        subUnits += product[2];

        if (product[2] > 10) {
            bulk5DiscountArr.push(product);
            discounts[1] = true;
        }

        if (product[2] > 15) {
            tiered50DiscountArr.push(product);
            flagTiered = true;
        }

        console.log(product[0], " ", product[2], " ", product[1] * product[2]);
    }

    console.log("Subtotal : ", subTotal);

    if (subUnits > 30 && flagTiered) {
        discounts[3] = true;
    }

    if (subUnits > 20) {
        discounts[2] = true;
    }

    if (subTotal > 200) {
        discounts[0] = true;
    }

    if (discounts[0]) {
        subTotal -= flat10Discount(products, subTotal);
    }

    if (discounts[1]) {
        subTotal -= bulk5Discount(products, bulk5DiscountArr, subTotal);
    }

    if (discounts[2]) {
        subTotal -= bulk10Discount(products, subTotal);
    }

    if (discounts[3]) {
        subTotal -= tiered50Discount(products, tiered50DiscountArr, subTotal);
    }

    const shippFee = 10 * Math.ceil(subUnits / 10);
    subTotal += shippFee;

    if (isGiftW) {
        subTotal += subUnits;
        console.log("Shipping and Gift Wrap Fee : ", shippFee + subUnits);
    } else {
        console.log("Shipping Fee : ", shippFee + subUnits);
    }

    console.log("Total Amount : ", subTotal);
}

const productsArray = [["A",20,30],["B",40,11],["C",50,7]];

generateBill(productsArray, true);