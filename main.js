angular.module('myApp',['ngRoute']).config(function($routeProvider) {
    $routeProvider.when('/',{
        templateUrl: 'views/TrangChu.html',
        controller: TrangChuController
    }).when('/gioi-thieu',{
        templateUrl: 'views/GioiThieu.html',
        controller: GioiThieuController
    }).when('/lien-he',{
        templateUrl: 'views/LienHe.html',
        controller: LienHeController
    }).when('/khoa-hoc',{
        templateUrl: 'views/KhoaHoc.html',
        // controller: LienHeController
    }).otherwise({
        redirectTo: '/'
    })
})