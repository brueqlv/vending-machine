const prompts = require('prompts');
type Products = {
    title: string,
    price: number,
}

const products: Products[] = [
    {
        title: "Coffee",
        price: 200
    },
    {
        title: "Snickers",
        price: 100
    },
    {
        title: "Tea",
        price: 120
    },
    {
        title: "Hot Chocholate",
        price: 220
    }
];

const coins: number[] = [
    200, 100, 50, 20, 10, 5, 2, 1
];

(async () => {
    const response = await prompts({
        type: 'select',
        name: 'product',
        message: 'Please select your product',
        choices: products,
        initial: 0
    });

    const selectedProduct: Products = products[response.product];

    let wallet: number = 0;

    while (wallet < selectedProduct.price){
        //ask uset to insert coin
        //validate if this number exists/contains in "coins" constant
        //coins.contains(value)
        const coin = await prompts({
            type: 'number',
            name: 'value',
            message: 'Insert coin:',
            validate: (value: number) => !coins.includes(value) ? `Invalid coin.` : true
          });

        console.log(coin.value);
        wallet += coin.value;
    }

    let reminder: number = wallet - selectedProduct.price;

    console.log("REMINDER: " + reminder)

    coins.forEach(coin => {
        if (reminder <= 0) {
            return;
        }
        const times = Math.floor(reminder / coin);
        console.log(coin + " / " + times);
        reminder -= coin * times;
        console.log("Reminder is: " + reminder);
    });


})();