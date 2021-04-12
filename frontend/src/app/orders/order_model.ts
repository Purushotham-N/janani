export class OrderModel{
    orderId:number = 0;
    products : number = 0;
    shifts : number = 0;
    demandQuantity:number = 0;
    supplyQuantity:number = 0;
    orderDate:Date | undefined ;
    expectedDOD:Date | undefined;
    actualDOD:Date | undefined;
    customerId:number = 0;
}