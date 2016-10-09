(() => {
    "use strict";

    angular.module('NarrowItDownApp', []).controller('NarrowItDownController', NarrowItDownController).service('MenuSearchService', MenuSearchService).directive('foundItems', foundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        let menu = this;
        menu.found = {};
        menu.noItems = false;
        menu.searchMenu = () => {
            if (!menu.searchTerm) {
                menu.found = {};
                menu.noItems = true;
            } else {
                MenuSearchService.getMatchedMenuItems(menu.searchTerm).then(result => {
                    menu.found = result;
                    menu.noItems = false;
                    console.log('menu found is', menu.found);
                });
            }
        };
        menu.removeItem = function (itemIndex) {
            menu.lastRemoved = "Last item removed was " + menu.found[itemIndex].name;
            menu.found.splice(itemIndex, 1);
        };
    }
    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
        let service = this;
        const apiURL = "https://davids-restaurant.herokuapp.com/menu_items.json";
        let currentList = {};

        service.getMatchedMenuItems = searchValue => {
            return $http({
                method: 'GET',
                url: apiURL
            }).then(result => {
                // process result and only keep items that match
                const foundItems = result.data.menu_items.filter(item => {
                    return item.description.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
                });
                console.log('Returned', foundItems);
                return foundItems;
            }, response => {
                // This is called if an error occurs:
                console.log('Error: ', response.statusText);
            });
        };

        service.setCurrentList = list => {
            currentList = list;
        };
        service.getCurrentList = () => {
            return currentList;
        };
        return service;
    }

    function foundItems() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&',
                noItems: '<'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'menuList',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController() {
        let menuList = this;
    }
})();