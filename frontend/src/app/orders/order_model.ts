export class OrderModel{
    orderId:number = 0;
    products : number = 0;
    shifts : number = 0;
    demandQuantity:number = 0;
    supplyQuantity:number = 0;
    orderDate:Date = new Date() ;
    expectedDOD:Date = new Date();
    actualDOD:Date = new Date();
    customerId:number = 0;


    getFiedNames(){
        return ["Order Id", "Products", "Shifts", "Demand Quantity", "Supply Quantity", "Order Date", "Expected Delivery", "Actual Delivery", "Customer Id"]
    }
}
