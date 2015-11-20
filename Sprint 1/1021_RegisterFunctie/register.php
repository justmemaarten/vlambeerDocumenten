<?php
switch($_POST['type']){

    case 'register':

        if(register($db, $_POST['username'],$_POST['password'],$_POST['email'],$messageBag)){
            header('Location: ' . ROOT . '...');
        } else {

            header('Location: ' . ROOT . '...');
        }
        break;

}


function register($db,$username,$password, $email, $messageBag){
    global $messageBag;
    global $db;

    // kijkt of alles is ingevuld
    if(empty($username) || empty($password)|| empty($password)){
        $messageBag->Add('a',"One or more fields aren't filled in!");
        return false;
    } else {

        $sql = 'SELECT * FROM tbl_users where username = :username';
        $q = $db->prepare($sql);
        $q->bindParam(':username', $username);
        $q->execute();

    // kijkt of de rij al bestaat
        if ($q->rowCount() > 0) {
            $messageBag->Add('a', 'Username already exisct!');
            return false;

        } else {
            $hashed = password_hash($password,PASSWORD_DEFAULT);

            $sql = 'INSERT INTO tbl_users (username, password, email)  VALUES (:username,:hashed, :email)';

            $q = $db->prepare($sql);
            $q->bindParam(':username', $username);
            $q->bindParam(':hashed', $hashed);
            $q->bindParam(':email', $email);
            $q->execute();
            $messageBag->Add('a','User succesfully created!');
            return true;
        }
    }
}


?>

