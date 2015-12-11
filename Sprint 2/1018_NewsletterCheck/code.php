<?php 

$user = \App\User::where('id', $id)->first();
$email = $user['hasnewsletter'];
if ($email == 1) {
	$email = true;
	echo 'Your email is allready registered';
} else {
	$email = false;
}

?> 