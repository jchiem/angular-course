(() => {
    "use strict";
    angular.module('ShoppingListApp', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        let toBuy = this;
        toBuy.items = ShoppingListCheckOffService.getItemsToBuy();
        toBuy.newItemName = '';
        toBuy.newItemQuantity = '';

        toBuy.addNewItemToShoppingList = () => {
            ShoppingListCheckOffService.addItemToBuyList(toBuy.newItemName, toBuy.newItemQuantity);
            toBuy.newItemName = '';
            toBuy.newItemQuantity = '';
        };

        toBuy.buyItem = (index) => {
            ShoppingListCheckOffService.setItemToBought(index);
        };
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        let bought = this;
        bought.items = ShoppingListCheckOffService.getItemsBought();
    }


    function ShoppingListCheckOffService() {
        let service = this;
        let buyItemsList = [{
                'name': 'Pretzels',
                'quantity': 10
            },
            {
                'name': 'Bananas',
                'quantity': 5
            },
            {
                'name': 'Potato',
                'quantity': 1
            },
            {
                'name': 'Dank memes',
                'quantity': 9001
            },
            {
                'name': 'Bacon',
                'quantity': 10
            }
        ];
        let boughtItemsList = [];

        service.addItemToBuyList = (itemName, quantity) => {
            let item = {
                'name': itemName,
                'quantity': quantity
            };

            buyItemsList.push(item);
        };

        service.setItemToBought = (itemIndex) => {
            //add the item to boughtItemsList Array
            boughtItemsList.push(buyItemsList[itemIndex]);
            //remove item from buyItemsList Array
            buyItemsList.splice(itemIndex, 1);
        };

        service.getItemsToBuy = () => {
            return buyItemsList;
        };

        service.getItemsBought = () => {
            return boughtItemsList;
        };

    }

})();