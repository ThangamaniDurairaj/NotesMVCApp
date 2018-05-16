/// <reference path="../app.js" />
app.controller('NotesController', function ($scope, $mdDialog, $mdSidenav, $window, $http, $filter) {




    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    var flag = 'left';

    $scope.Add = 1;
    $scope.update = 2;
    $scope.Delete = 3;
    function buildToggler(componentId) {

        return function () {

            $mdSidenav(componentId).toggle();
            if (flag == 'left') {
                //$("#sidenav").css('width', '250px')
                //$("#page").css('marginLeft', '250px')
                $scope.sidenav = { width: '250px' }
                $scope.myStyle = { marginLeft: '250px' }
                flag = 'right';
            }
            else if (flag == 'right') {
                //$("#sidenav").css('width', '0px')
                //$("#page").css('marginLeft', '0px')
                $scope.sidenav = { width: '0px' }
                $scope.myStyle = { marginLeft: '0px' }
                flag = 'left';
            }
        };
    }
    $scope.listgrid = function () {


        window.top.location.href = "/Notes/List";

    }



    $scope.rem1 = function (obj) {
        debugger;
        var Mode = $scope.update;
        var date = new Date();
        $scope.ddMMMMyyyy = $filter('date')(new Date(), 'MMMM dd, hh:mm a ');
        var object = {
            ID: obj.ID,
            UserID: obj.UserID,
            Content: obj.Content,
            Title: obj.Title,
            ColorCode: obj.ColorCode,
            Reminder: $scope.ddMMMMyyyy,
            IsPin: (obj.IsPin),
            IsArchive: obj.IsArchive,
            IsActive: obj.IsActive,
            IsDelete: obj.IsDelete,
            IsTrash: obj.IsTrash,
            ImageUrl: obj.ImageUrl,

            Mode: Mode,
        }
        $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
            window.location.reload();
        });

    }

    $scope.rem2 = function (obj) {
        debugger;
        var Mode = $scope.update;
        var date = new Date();
        var NextDay = new Date(date);
        NextDay.setDate(date.getDate() + 1);

        var MMMM = $filter('date')(new Date(NextDay), 'dd MMMM');
        var object = {
            ID: obj.ID,
            UserID: obj.UserID,
            Content: obj.Content,
            Title: obj.Title,
            ColorCode: obj.ColorCode,
            Reminder: MMMM + ", " + "8:00 PM ",
            IsPin: (obj.IsPin),
            IsArchive: obj.IsArchive,
            IsActive: obj.IsActive,
            IsDelete: obj.IsDelete,
            IsTrash: obj.IsTrash,
            ImageUrl: obj.ImageUrl,

            Mode: Mode,
        }
        $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
            window.location.reload();
        });
    }

    $scope.rem3 = function (obj) {
        debugger;
        var Mode = $scope.update;
        var DD = new Date();
        var NextWeek = new Date(DD);
        NextWeek.setDate(DD.getDate() + 7);
        var DD = $filter('date')(new Date(NextWeek), 'dd MMMM');

        var object = {
            ID: obj.ID,
            UserID: obj.UserID,
            Content: obj.Content,
            Title: obj.Title,
            ColorCode: obj.ColorCode,
            Reminder: DD + ", " + "8:00 PM ",
            IsPin: (obj.IsPin),
            IsArchive: obj.IsArchive,
            IsActive: obj.IsActive,
            IsDelete: obj.IsDelete,
            IsTrash: obj.IsTrash,
            ImageUrl: obj.ImageUrl,

            Mode: Mode,
        }
        $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
            window.location.reload();
        });
    }

    function GetNote() {
        debugger;
        //var UserID = UserID;

        $http.get("/Notes/GetNotes").then(function (response) {
            console.log(response);
        });
    }


    function GetInfo(UserID) {
        $http.get("/Directive/SideNav?UserId=" + UserID).then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(response);

            $scope.person = JSON.stringify(response.data);
        });
    }

    $(document).ready(function () {
        var UserID = localStorage.getItem("UserId");
        $scope.UserId = UserID;
        //GetNote();
        //GetInfo(UserID);


    });

    $scope.Addnote = function (id) {
        debugger;

        var UserId = id;
        var content = $('#Content').val();
        //var title = JSON.stringify($scope.model);
        //var title = document.getElementById('Title').innerHTML;
        var title = $('#Title').text();
        var colorcode = $scope.abc;
        var pin = $scope.pinVal;
        var Mode = $scope.Add;
        var obj = {
            UserID: UserId,
            Title: title,
            Content: content,
            ColorCode: colorcode,
            IsPin: pin,
            Mode: Mode
        };

        $http.post("/Notes/GetNotes", JSON.stringify(obj)).then(function (response) {
            //GetNote();
            window.location.reload();
            console.log(response);
        });
    }

    $scope.openMenu = function ($mdMenu, ev) {
        var originatorEv = ev;
        $mdMenu.open(ev);
    };

    $scope.color = function (obj, ColorCode) {
        var Mode = $scope.update;
        var object = {
            ID: obj.ID,
            UserID: obj.UserID,
            Content: obj.Content,
            Title: obj.Title,
            ColorCode: ColorCode,
            Reminder: obj.Reminder,
            DisplayOrde: obj.DisplayOrde,
            IsPin: (obj.IsPin),
            IsArchive: obj.IsArchive,
            IsActive: obj.IsActive,
            IsDelete: obj.IsDelete,
            IsTrash: obj.IsTrash,
            ImageUrl: obj.ImageUrl,

            Mode: Mode
        }

        $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
            //GetNote();
            window.location.reload();

        });

    }

    //$scope.CustomStyle = {
    //    'layout': row

    //};
    $scope.notecolor = function (color) {
        $scope.abc = color;
        $scope.CustomNote = {
            'background-color': color

        };
    }
    $scope.PinNote = function (obj) {
        debugger;
        //var ID = id;
        //var Pin = !(pin);

        var Mode = $scope.update;
        var object = {
            ID: obj.ID,
            UserID: obj.UserID,
            Content: obj.Content,
            Title: obj.Title,
            ColorCode: obj.ColorCode,
            Reminder: obj.Reminder,
            DisplayOrde: obj.DisplayOrde,
            IsPin: !(obj.IsPin),
            IsArchive: obj.IsArchive,
            IsActive: obj.IsActive,
            IsDelete: obj.IsDelete,
            IsTrash: obj.IsTrash,
            ImageUrl: obj.ImageUrl,

            Mode: Mode
        }
        $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
            window.location.reload();

        });
    }

    $scope.PinNote_Archive = function (obj) {

        var Mode = $scope.update;
        var object = {
            ID: obj.ID,
            UserID: obj.UserID,
            Content: obj.Content,
            Title: obj.Title,
            ColorCode: obj.ColorCode,
            Reminder: obj.Reminder,
            DisplayOrde: obj.DisplayOrde,
            IsPin: !(obj.IsPin),
            IsArchive: !(obj.IsArchive),
            IsActive: obj.IsActive,
            IsDelete: obj.IsDelete,
            IsTrash: obj.IsTrash,
            ImageUrl: obj.ImageUrl,

            Mode: Mode
        }
        $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
            window.location.reload();

        });
    }

    $scope.Deletenote = function (obj) {
        debugger;

        var Mode = $scope.update;
        var object = {
            ID: obj.ID,
            UserID: obj.UserID,
            Content: obj.Content,
            Title: obj.Title,
            ColorCode: obj.ColorCode,
            DisplayOrde: obj.DisplayOrde,
            IsPin: 0,
            IsArchive: (obj.IsArchive),
            IsActive: obj.IsActive,
            IsDelete: obj.IsDelete,
            IsTrash: !(obj.IsTrash),
            ImageUrl: obj.ImageUrl,

            Mode: Mode
        }

        $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
            window.location.reload();
        });
    }

    $scope.DeleteForever = function (obj) {
        var Mode = $scope.Delete;

        var object = {
            ID: obj.ID,
            UserID: obj.UserID,
            Content: obj.Content,
            Title: obj.Title,
            ColorCode: obj.ColorCode,
            Reminder: obj.Reminder,
            DisplayOrde: obj.DisplayOrde,
            IsPin: (obj.IsPin),
            IsArchive: (obj.IsArchive),
            IsActive: obj.IsActive,
            IsDelete: obj.IsDelete,
            IsTrash: obj.IsTrash,
            Mode: Mode
        }
        $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
            window.location.reload();
        });
    }

    $scope.Restore = function (obj) {
        debugger;
        var Mode = $scope.update;


        var object = {
            ID: obj.ID,
            UserID: obj.UserID,
            Content: obj.Content,
            Title: obj.Title,
            ColorCode: obj.ColorCode,
            Reminder: obj.Reminder,
            DisplayOrde: obj.DisplayOrde,
            IsPin: (obj.IsPin),
            IsArchive: (obj.IsArchive),
            IsActive: obj.IsActive,
            IsDelete: obj.IsDelete,
            IsTrash: !(obj.IsTrash),
            ImageUrl: obj.ImageUrl,

            Mode: Mode
        }
        $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
            window.location.reload();
        });
    }

    var pinValue = 0;
    $scope.isPin = function () {
        if (pinValue == 0) {
            $scope.pinVal = 1;
            pinValue = 1;
        }
        else {
            $scope.pinVal = 0;
            pinValue = 0;
        }
    }

    $scope.addArchive = function (obj) {
        debugger;
        var Mode = $scope.update;
        var object = {
            ID: obj.ID,
            UserID: obj.UserID,
            Content: obj.Content,
            Title: obj.Title,
            ColorCode: obj.ColorCode,
            Reminder: obj.Reminder,
            DisplayOrde: obj.DisplayOrde,
            IsPin: 0,
            IsArchive: !(obj.IsArchive),
            IsActive: obj.IsActive,
            IsDelete: obj.IsDelete,
            IsTrash: obj.IsTrash,
            ImageUrl: obj.ImageUrl,

            Mode: Mode
        }

        $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
            window.location.reload();
        });
    }



    $scope.CopyNote = function (obj) {
        debugger;
        var Mode = $scope.Add;
        var object = {
            ID: obj.ID,
            UserID: obj.UserID,
            Content: obj.Content,
            Title: obj.Title,
            ColorCode: obj.ColorCode,
            Reminder: obj.Reminder,
            ImageUrl: obj.ImageUrl,
            IsPin: obj.IsPin,
            IsArchive: obj.IsArchive,

            Mode: Mode
        }

        $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
            window.location.reload();
        });
    }


    $scope.PopUp = function (ev, note) {
        $mdDialog.show({
            controller: function () {
                var $ctrl = this;
                $ctrl.colorall = ['transparent', '#FF8A80', '#FFD180', '#FFFF8D', '#CFD8DC', '#80D8FF', '#A7FFEB', '#CCFF90'];
                $ctrl.colorselected = 'transparent';
                var dbColor = "transparent";
                $ctrl.Title = note.Title;
                $ctrl.Content = note.Content;
                $ctrl.colorselected = note.ColorCode;
                $ctrl.imgsrc = note.Image;
                $ctrl.ID = note.ID;
                $ctrl.IsPin = note.IsPin;
                $ctrl.IsArchive = note.IsArchive;
                $ctrl.IsTrash = note.IsTrash;
                $ctrl.Delete = note.IsDelete;
                $ctrl.ImageUrl = note.ImageUrl;
                $ctrl.Reminder = note.Reminder;
                $ctrl.AddNote = function (obj) {

                    var note1 = {
                        Title: obj.Title,
                        Content: obj.Content,
                        ColorCode: $ctrl.colorselected,
                        ID: $ctrl.ID,
                        mode: 2,
                        IsPin: (note.IsPin),
                        IsArchive: note.IsArchive,
                        Reminder: note.Reminder,
                        IsDelete: obj.IsDelete,
                        IsTrash: obj.IsTrash,
                    }



                    $http.post("/Notes/GetNotes", JSON.stringify(note1)).then(function (response) {
                        window.location.reload();
                    });


                }

                $ctrl.color = function (obj, ColorCode) {
                    var Mode = $scope.update;
                    var object = {
                        ID: obj.ID,
                        UserID: obj.UserID,
                        Content: obj.Content,
                        Title: obj.Title,
                        ColorCode: ColorCode,
                        Reminder: obj.Reminder,
                        DisplayOrde: obj.DisplayOrde,
                        IsPin: (note.IsPin),
                        IsArchive: obj.IsArchive,
                        IsActive: obj.IsActive,
                        IsDelete: obj.IsDelete,
                        IsTrash: obj.IsTrash,
                        ImageUrl: note.ImageUrl,

                        Mode: Mode
                    }

                    $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
                        window.location.reload();

                    });


                }

                $ctrl.IsPin = function (obj) {
                    debugger;
                    var Mode = $scope.update;
                    var object = {
                        ID: obj.ID,
                        UserID: obj.UserID,
                        Content: obj.Content,
                        Title: obj.Title,
                        ColorCode: $ctrl.colorselected,
                        Reminder: obj.Reminder,
                        DisplayOrde: obj.DisplayOrde,
                        IsPin: !(note.IsPin),
                        IsArchive: note.IsArchive,
                        IsActive: obj.IsActive,
                        IsDelete: obj.IsDelete,
                        IsTrash: obj.IsTrash,
                        ImageUrl: note.ImageUrl,

                        Mode: Mode
                    }
                    $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
                        window.location.reload();

                    });

                }

                $ctrl.IsArchive = function (obj) {

                    var Mode = $scope.update;
                    var object = {
                        ID: obj.ID,
                        UserID: obj.UserID,
                        Content: obj.Content,
                        Title: obj.Title,
                        ColorCode: $ctrl.colorselected,
                        Reminder: obj.Reminder,
                        DisplayOrde: obj.DisplayOrde,
                        IsPin: (note.IsPin),
                        IsArchive: !(note.IsArchive),
                        IsActive: obj.IsActive,
                        IsDelete: obj.IsDelete,
                        IsTrash: obj.IsTrash,
                        ImageUrl: note.ImageUrl,

                        Mode: Mode
                    }
                    $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
                        window.location.reload();

                    });

                }

                $ctrl.Deletenote = function (obj) {

                    var Mode = $scope.update;
                    var object = {
                        ID: obj.ID,
                        UserID: obj.UserID,
                        Content: obj.Content,
                        Title: obj.Title,
                        ColorCode: $ctrl.colorselected,
                        Reminder: obj.Reminder,
                        ImageUrl: note.ImageUrl,

                        IsTrash: !(note.IsTrash),
                        Mode: Mode
                    }

                    $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
                        window.location.reload();
                    });

                }


            },
            templateUrl: "/Notes/PopUp",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen,
            controllerAs: '$ctrl'
        })


    };

    $scope.remove = function (obj) {
        debugger;
        var Mode = $scope.update;
        var object = {
            ID: obj.ID,
            UserID: obj.UserID,
            Content: obj.Content,
            Title: obj.Title,
            ColorCode: obj.ColorCode,
            DisplayOrde: obj.DisplayOrde,
            IsPin: (obj.IsPin),
            IsArchive: (obj.IsArchive),
            IsActive: obj.IsActive,
            IsDelete: obj.IsDelete,
            IsTrash: obj.IsTrash,
            ImageUrl: obj.ImageUrl,
            Mode: Mode
        }

        $http.post("/Notes/GetNotes", JSON.stringify(object)).then(function (response) {
            window.location.reload();
        });
    }

    $scope.uploadImage = function (note) {
        $("#file1").click();
        //var userid = $cookieStore.get('userid').userid;
        var files = $("#file1").get(0).files;
        if (files.length > 0) {
            var data = new FormData();
            for (var i = 0; i < files.length; i++) {
                data.append("file" + i, files[i]);
            }

            //$scope.Rem = note.Reminder;
            data.append("Title", note.Title);
            data.append("Content", note.Content);
            data.append("ColorCode", note.ColorCode);
            data.append('ID', note.ID);
            //data.append('Reminder', note.Reminder);
            data.append('IsPin', note.IsPin);
            data.append('IsArchive', note.IsArchive);

            var settings =
                {
                    type: "POST",
                    url: "/api/NotesApi/PostImage",
                    data: data,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        console.log(response);
                    },
                    error: function (response) {
                        console.log(response);
                    }

                };

            $.ajax(settings).then(function (response) {
                console.log(response);
                $scope.imgsrc = response;
                localStorage.setItem("url", $scope.imgsrc);
                //getNotes();
                window.location.reload();
                $scope.smallcard = true;
                $scope.largecard = false;
                $scope.note.title = "";
                $scope.note.notes = "";
                $scope.color = "transparent";
                //$scope.imgsrc = null;
            });

        }




    }

});



//app.directive('dndList', function () {
//    return function ($scope, element, attrs) {
//        // variables used for dnd
//        var toUpdate;
//        var startIndex = -1;
//        // watch the model, so we always know what element
//        // is at a specific position
//        //scope.$watch(attrs.dndList, function (value, new1) {
//        //    toUpdate = value, new1;
//        //}, true);
//        // use jquery to make the element sortable (dnd). This is called
//        // when the element is rendered

//        $(element[0]).sortable({

//            start: function (event, ui) {
//                // on start we define where the item is dragged from
//                startIndex = ($(ui.item).index());


//            },
//            stop: function (event, ui) {
//                // on stop we determine the new index of the
//                // item and store it there



//                var newIndex = ($(ui.item).index());

//                var toMove = toUpdate[startIndex];
//                toUpdate.splice(startIndex, 1);

//                toUpdate.splice(newIndex, 0, toMove);
//                // we move items in the array, if we want
//                // to trigger an update in angular use $apply()
//                // since we're outside angulars lifecycle
//                scope.$apply($scope.notesdata);

//                console.log($scope.notesdata);
//            },

//        })
//    }



//})