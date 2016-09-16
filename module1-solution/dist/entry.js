'use strict';

(function () {
    "use strict";

    angular.module('MainApp', []).controller('MainController', function ($scope) {
        var sc = $scope;
        sc.lunchMenu = '';

        sc.resetValidator = function () {
            $scope.validator = '';
        };

        sc.checkIfTooMuch = function () {
            if ($scope.lunchMenu === '') {
                $scope.validator = 'Please enter data first';
            } else {
                /* grabs all items and stores into array, filters out empty strings and counts the array */
                var lunchItemCount = $scope.lunchMenu.split(',').filter(function (v) {
                    return v != '';
                }).length;

                if (lunchItemCount > 3) {
                    $scope.validator = 'Too much!';
                } else {
                    $scope.validator = 'Enjoy!';
                }
            }
        };
    });
})();