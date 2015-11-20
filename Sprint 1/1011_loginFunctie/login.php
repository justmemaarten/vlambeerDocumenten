<?php
switch( $_POST['type'] ) {
case 'login' :
        if(login() {
            header('location: ../../public/views/dashboard/dashboard.php'); //location will be based on the ROOT constant

        } else {
            header('location: ../../public/views/auth/login.php'); //location will be based on the ROOT constant
        }
        break;

}

function login() {
    global $messageBag;
    global $db;

    $username = $_POST['username'];
    $password = $_POST['password'];

    if(empty($username) || empty($password)) {
        $messageBag->add('w', 'One or more fields are missing');
        return false;
    }

    $sql = "SELECT * FROM tbl_users WHERE username = :username";
    $q = $db->prepare($sql);
    $q->bindParam(':username', $username);
    $q->execute();

    // Check if the row exists
    if ($q->rowCount() == 0) {
        $messageBag->add('w', 'User does not excists');
        return false;
    }

    $user = $q->fetch(PDO::FETCH_ASSOC);

    if (password_verify($password, $user['password'])) {

        $_SESSION['user']['isadmin'] = $user['isadmin'];
        $_SESSION['user']['id'] = $user['user_id'];
        $messageBag->add('s', 'Welcome ' . $_SESSION['user']['username']);
        
        return true;

    } else {

        $messageBag->add('w', 'Username or password are incorrect');
    }

    return false;
}
