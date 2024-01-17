import math

def flat10Discount(products,sub_total):
    discount_amount = 10
    print("Flat 10 Discount : ",discount_amount)
    return discount_amount

def bulk5Discount(products,shortlisted_products,sub_total):
    discount_amount = 0
    
    for product in shortlisted_products:
        discount_amount += (product[1]*product[2])*0.05
    
    print("Bulk 5 Discount : ",discount_amount)
    return discount_amount

def bulk10Discount(products,sub_total):
    discount_amount = sub_total*0.1
    print("Bulk 5 Discount : ",discount_amount)
    return discount_amount

def tiered50Discount(products,shortlisted_products,sub_total):
    discount_amount = 0
    
    for product in shortlisted_products:
        discount_amount += (product[1]*(product[2]-15))*0.5
    
    print("Tiered 50 Discount : ",discount_amount)
    return discount_amount
    

def generateBill(products,isGiftW):
    sub_total = 0
    sub_units = 0
    bulk_5_dis = []
    tiered_50_dis = []
    
    discounts = [False]*4
    flag_tiered = False
    
    print("Product List ")
    print("Name Units Amount")
    
    for product in products:
        sub_total += product[1]*product[2]
        sub_units += product[2]
        
        if(product[2]>10):
            bulk_5_dis.append(product)
            discounts[1] = True
        
        if(product[2]>15):
            tiered_50_dis.append(product)
            flag_tiered = True
        
        print(product[0]," ",product[2]," ",product[1]*product[2])
    
    print("Subtotal : ",sub_total)
            
    if(sub_units>30 and flag_tiered):
        discounts[3] = True
    
    if(sub_units>20):
        discounts[2] = True
    
    if(sub_total>200):
        discounts[0] = True
        
    
    if(discounts[0]):
        sub_total -= flat10Discount(products,sub_total)
    
    if(discounts[1]):
        sub_total -= bulk5Discount(products,bulk_5_dis,sub_total)
    
    if(discounts[2]):
        sub_total -= bulk10Discount(products,sub_total)
    
    if(discounts[3]):
        sub_total -= tiered50Discount(products,tiered_50_dis,sub_total)
     
    shipp_fee =  10*(math.ceil(sub_units/10))
    sub_total += shipp_fee
    
    if(isGiftW):
        sub_total += sub_units
        print("Shipping and Gift Wrap Fee : ",shipp_fee+sub_units)
    else:
        print("Shipping Fee : ",shipp_fee+sub_units)
    
    print("Total Amount : ",sub_total)
    

generateBill([["A",20,30],["B",40,11],["C",50,7]],True)