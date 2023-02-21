window.DangKyController = function ($scope, $http, $location) {
    var apiURL = "http://localhost:3000/listClient";
    $scope.getData = function () {
        $http.get(apiURL).then(function (response) {
            $scope.listClient = response.data;
        });
    };
    $scope.getData();
    $scope.checkData = {
        name: false,
        cccd: false,
        cccdCheck: false,
        gender: false,
        birth: false,
        phoneNumber: false,
        phoneNumberCheck: false,
        email: false,
        emailCheck : false,
        address: false,
        course: false,
    }
    $scope.clear = function () {
        $scope.client = {
            name: "",
            cccd: "",
            birth: "",
            phoneNumber: "",
            email: "",
            address: "",
            // course: "",
        };
        $scope.editID = 0;
    };

    $scope.onSubmit = function () {
        var flag = false;
        var checkemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var sdtcheck = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        // check name
        if (!$scope.client || !$scope.client.name) {
            $scope.checkData.name = true;
            flag = true;
        } else {
            $scope.checkData.name = false;
        }
        // check cccd
        if (!$scope.client || !$scope.client.cccd) {
            $scope.checkData.cccd = true;
            flag = true;
        } else if (
            $scope.client != undefined &&
            isNaN($scope.client.cccd)
        ) {
            $scope.checkData.cccd = false;
            $scope.checkData.cccdCheck = true;
            flag = true;
        } else {
            $scope.checkData.cccdCheck = false;
            $scope.checkData.cccd = false;

        }
        // check nam sinh
        if (!$scope.client || !$scope.client.birth) {
            $scope.checkData.birth = true;
            flag = true;
        } else {
            $scope.checkData.birth = false;
        }
        // check phone
        if (!$scope.client || !$scope.client.phoneNumber) {
            $scope.checkData.phoneNumber = true;
            flag = true;
        } else if (
            $scope.client != undefined &&
            sdtcheck.test($scope.client.phoneNumber) == false
        ) {
            $scope.checkData.phoneNumber = false;
            $scope.checkData.phoneNumberCheck = true;
            flag = true;
        } else {
            $scope.checkData.phoneNumberCheck = false;
            $scope.checkData.phoneNumber = false;
        }
        // Check Email
        if (!$scope.client || !$scope.client.email) {
            $scope.checkData.email = true;
            flag = true;
        } else if (
            $scope.client != undefined &&
            checkemail.test($scope.client.email) == false
        ) {
            $scope.checkData.email = false;
            $scope.checkData.emailCheck = true;
            flag = true;
        } else {
            $scope.checkData.emailCheck = false;
            $scope.checkData.email = false;
        }
        // check address
        if (!$scope.client || !$scope.client.address) {
            $scope.checkData.address = true;
            flag = true;
        } else {
            $scope.checkData.address = false;
        }
        // check course
        // if (!$scope.client || !$scope.client.course) {
        //     $scope.checkData.course = true;
        //     flag = true;
        // } else {
        //     $scope.checkData.course = false;
        // }
        var khoahoc = document.getElementById('course').value;
        var gioitinh = document.getElementById('gender').value;
        // update
        if (flag == false) {

            var editID = $scope.editID;
            if (editID) {
                
                var updateItem = {
                    name: $scope.client.name,
                    cccd: $scope.client.cccd,
                    gender: gioitinh,
                    birth: $scope.client.birth,
                    phoneNumber: $scope.client.phoneNumber,
                    email: $scope.client.email,
                    address: $scope.client.address,
                    course: khoahoc
                };
                $http.put(
                    `${apiURL}/${editID}`,
                    updateItem,
                ).then(
                    function (response) {
                        if (response.status == 200) {
                            $location.path('dang-ky');
                            $scope.getData();
                        }
                    }
                )
                $scope.clear();
                swal("Thông báo", "Sửa thành công!", "success")
                return;
            }

            // add
            var newClient = {
                name: $scope.client.name,
                cccd: $scope.client.cccd,
                gender: gioitinh,
                birth: $scope.client.birth,
                phoneNumber: $scope.client.phoneNumber,
                email: $scope.client.email,
                address: $scope.client.address,
                course: khoahoc
            }
            $http.post(
                apiURL,
                newClient
            ).then(
                function (response) {
                    //console.log(reponse)
                    $location.path("dang-ky")
                    $scope.getData();
                }
            )
            swal("Thông báo", "Đăng ký khóa học thành công!", "success")
            $scope.clear();
        }
    }
    // click table len form
    $scope.onEdit = function (editID) {
        $scope.editID = editID;
        var editItem = {
            id: "",
            name: "",
            cccd: "",
            gender: "",
            birth: "",
            phoneNumber: "",
            email: "",
            address: "",
            course: "",

        };
        $http.get(`${apiURL}/${editID}`).then(
            function (response) {
                // console.log(response)
                if (response.status == 200) {
                    document.getElementById('course').value = response.data.course;
                    document.getElementById('gender').value = response.data.gender;
                    $scope.client = {
                        name: response.data.name,
                        cccd: response.data.cccd,
                        gender: response.data.gender,
                        birth: response.data.birth,
                        phoneNumber: response.data.phoneNumber,
                        email: response.data.email,
                        address: response.data.address,
                        course: response.data.course
                    }
                }
            }
        )
    }
    // xóa
    $scope.onDelete = function (deleteID) {
        var confirm = window.confirm("Are you sure you want to delete");
        if (confirm) {
            $http.delete(`${apiURL}/${deleteID}`).then(
                function (response) {
                    if (response.status == 200) {
                        $location.path('dang-ky');
                        $scope.getData();
                    }
                }
            )
        }
    };
}