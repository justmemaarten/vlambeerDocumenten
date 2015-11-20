<?php
switch( $_POST['type'] ) {
case 'login' :
        if(login($_POST['username'],
            $_POST['password'])) {
            header('location: ../../public/views/dashboard/dashboard.php');
        } else {
            header('location: ../../public/views/auth/login.php');
        }
        break;

}

function login($username, $password) {
    global $messageBag;
    global $db;

    if(empty($username) ||
        empty($password)) {
        $messageBag->add('w', 'One or more fields are missing');
        return false;
    }

    $sql = "SELECT * FROM tbl_users WHERE username = :username";
    $q = $db->prepare($sql);
    $q->bindParam(':username', $username);
    $q->execute();

    // kijkt of de rij al bestaat
    if ($q->rowCount() > 0) {
        $user = $q->fetch(PDO::FETCH_ASSOC);

        if (password_verify($password, $user['password'])) {
            $_SESSION['user']['isadmin'] = $user['isadmin'];
            $_SESSION['user']['id'] = $user['user_id'];
            $messageBag->add('s', 'Welcome ' . $_SESSION['user']['username']);
            return true;
        } else {
            $messageBag->add('w', 'Username or password are incorrect');
        }
    } else {
        $messageBag->add('w', 'User does not excists');
        return false;
    }

    return false;
}
