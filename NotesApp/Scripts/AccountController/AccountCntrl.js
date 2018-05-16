/// <reference path="../app.js" />
app.controller('AccountCtrl', function ($scope, $mdToast, $mdDialog, $mdSidenav, $window, $http) {


    $scope.open = false;
    $scope.showPromptForgot = function (ev) {
        //var confirm = $mdDialog.prompt()
        //    .title('FORGOT PASSWORD')
        //    .textContent('Enter Your Email ID')
        //    .placeholder('EMAIL')
        //    .ariaLabel('Dog name')
        //    .initialValue('')
        //    .targetEvent(ev)
        //    .required(true)
        //    .ok('Okay!')
        //    .cancel('CANCEL');

        //$mdDialog.show(confirm).then(function (result) {
        //    $scope.status = 'Your ID ' + result + '.';
        //}, function () {
        //    $scope.status = ' ';
        //});
        $mdDialog.show({
            controller: DialogController,
            templateUrl: "/Account/ForgotPassword",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        //.then(function (answer) {
        //    $scope.status = 'You said the information was "' + answer + '".';
        //}, function () {
        //    $scope.status = 'You cancelled the dialog.';
        //});

    };

    $scope.showPromptOTP = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: "/Account/VerifyOTP",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        //.then(function (answer) {
        //    $scope.status = 'You said the information was "' + answer + '".';
        //}, function () {
        //    $scope.status = 'You cancelled the dialog.';
        //});

    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

    $scope.Register = function () {

        window.top.location.href = "/Account/Register";
    }


    //$scope.sign = function ()
    //{
    //    debugger;
    //    var user = "grant_type=password&username=" + $scope.email + "&password=" + $scope.password;

    //    $http.post("https://localhost:44399/Token", user).then(function (response) {
    //        console.log(response);
    //        alert(response.data.access_token);
    //        alert(response.data.userName);

    //    });
    //}




    //function GetNote() {
    //    $http.get("/Notes/Fun").then(function (response) {
    //        console.log(response);
    //    });
    //}

    //$(document).ready(function () {
    //    GetNote();
    //});

    //$scope.toggleLeft = buildToggler('left');
    //$scope.toggleRight = buildToggler('right');
    //var flag = 'left';

    //function buildToggler(componentId) {

    //    return function () {

    //        $mdSidenav(componentId).toggle();
    //        if (flag == 'left') {
    //            //$("#sidenav").css('width', '250px')
    //            //$("#page").css('marginLeft', '250px')
    //            $scope.sidenav = { width: '250px' }
    //            $scope.myStyle = { marginLeft: '250px' }
    //            flag = 'right';
    //        }
    //        else if (flag == 'right') {
    //            //$("#sidenav").css('width', '0px')
    //            //$("#page").css('marginLeft', '0px')
    //            $scope.sidenav = { width: '0px' }
    //            $scope.myStyle = { marginLeft: '0px' }
    //            flag = 'left';
    //        }
    //    };
    //}

    //$scope.Addnote = function () {

    //    var content = $('#Content').val();
    //    //var title = JSON.stringify($scope.model);
    //    //var title = document.getElementById('Title').innerHTML;
    //    var title = $('#Title').text();
    //    var colorcode = $scope.abc;
    //    var obj = {
    //        Title: title,
    //        Content: content,
    //        ColorCode: colorcode
    //    };

    //    $http.post("/Notes/Fun", JSON.stringify(obj)).then(function (response) {
    //        window.location.reload();
    //        console.log(response);
    //    });
    //}


    //$scope.color = function (color) {
    //    debugger;
    //    $scope.color = 'Red';
    //}
    //$scope.color = function (color, id) {
    //    var colorcode = color;
    //    var id = id;
    //    var obj = {
    //        ColorCode: colorcode,
    //        ID: id
    //    }

    //    $http.post("/Notes/UpdateColor", JSON.stringify(obj)).then(function (response) {
    //        window.location.reload();
    //        console.log(response);
    //    });
    //    //$scope.CustomStyle = {
    //    //    'background-color': color

    //    //};

    //}

    //$scope.notecolor = function (color) {
    //    $scope.abc = color;
    //    $scope.CustomNote = {
    //        'background-color': color

    //    };
    //}
    //ng-click="openMenu($mdMenu, $event)" ng-mouseenter="$mdMenu.open()"
    //$scope.openMenu = function ($mdMenu, ev) {
    //    var originatorEv = ev;
    //    $mdMenu.open(ev);
    //};


    //$scope.PinNote = function (id, pin) {
    //    var ID = id;
    //    var Pin = pin;
    //    var obj = {
    //        ID: ID,
    //        IsPin: Pin
    //    }
    //    $http.post("/Notes/UpdatePin", JSON.stringify(obj)).then(function (response) {
    //        window.location.reload();

    //    });
    //}

    //$scope.Deletenote = function (id, trash) {
    //    debugger;
    //    var ID = id;
    //    var Trash = trash;
    //    var obj = {
    //        ID: ID,
    //        IsTrash: Trash
    //    }

    //    $http.post("/Notes/UpdateTrash", JSON.stringify(obj)).then(function (response) {
    //        window.location.reload();
    //    });
    //}

    //$scope.DeleteForever = function (id, trash) {
    //    debugger;
    //    var ID = id;
    //    var Trash = trash;
    //    var obj = {
    //        ID: ID,
    //        IsTrash: Trash
    //    }
    //    $http.post("/Notes/DeleteNote", JSON.stringify(obj)).then(function (response) {
    //        window.location.reload();
    //    });
    //}

    //$scope.Restore = function (id) {
    //    debugger;
    //    var ID = id;
    //    var obj = {
    //        ID: ID
    //    }
    //    $http.post("/Notes/Restore", JSON.stringify(obj)).then(function (response) {
    //        window.location.reload();
    //    });
    //}
});