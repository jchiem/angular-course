'use strict';

(function () {
    "use strict";

    angular.module('ShoppingListApp', []).controller('ToBuyController', ToBuyController).controller('AlreadyBoughtController', AlreadyBoughtController).service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.items = ShoppingListCheckOffService.getItemsToBuy();
        toBuy.newItemName = '';
        toBuy.newItemQuantity = '';

        toBuy.addNewItemToShoppingList = function () {
            ShoppingListCheckOffService.addItemToBuyList(toBuy.newItemName, toBuy.newItemQuantity);
            toBuy.newItemName = '';
            toBuy.newItemQuantity = '';
        };

        toBuy.buyItem = function (index) {
            ShoppingListCheckOffService.setItemToBought(index);
        };
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bought = this;
        bought.items = ShoppingListCheckOffService.getItemsBought();
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var buyItemsList = [{
            'name': 'Pretzels',
            'quantity': 10
        }, {
            'name': 'Bananas',
            'quantity': 5
        }, {
            'name': 'Potato',
            'quantity': 1
        }, {
            'name': 'Dank memes',
            'quantity': 9001
        }, {
            'name': 'Bacon',
            'quantity': 10
        }];
        var boughtItemsList = [];

        service.addItemToBuyList = function (itemName, quantity) {
            var item = {
                'name': itemName,
                'quantity': quantity
            };

            buyItemsList.push(item);
        };

        service.setItemToBought = function (itemIndex) {
            //add the item to boughtItemsList Array
            boughtItemsList.push(buyItemsList[itemIndex]);
            //remove item from buyItemsList Array
            buyItemsList.splice(itemIndex, 1);
        };

        service.getItemsToBuy = function () {
            return buyItemsList;
        };

        service.getItemsBought = function () {
            return boughtItemsList;
        };
    }
})();