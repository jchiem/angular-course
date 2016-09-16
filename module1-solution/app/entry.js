(() => {
    "use strict";
    var app = angular.module('MainApp', []).
    controller('MainController', MainController);
    MainController.$inject = ['$scope'];

    function MainController($scope) {
        const sc = $scope;
        sc.lunchMenu = '';

        sc.resetValidator = function() {
            $scope.validator = '';
        }

        sc.checkIfTooMuch = function() {
            if ($scope.lunchMenu === '') {
                $scope.validator = 'Please enter data first';
            } else {
                /* grabs all items and stores into array, filters out empty strings and counts the array */
                let lunchItemCount = $scope.lunchMenu.split(',')
                    .filter(v => v != '')
                    .length;

                if (lunchItemCount > 3) {
                    $scope.validator = 'Too much!';
                } else {
                    $scope.validator = 'Enjoy!';
                }
            }
        }
    }
})();