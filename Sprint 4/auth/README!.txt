je moet dit bestand hier zetten want git neemt dit bestand niet mee deze moet je hier plaatsen:

vlambeer\laravel\vendor\laravel\framework\src\Illuminate\Foundation\Auth




je moet ook nog dit downloaden via de terminal anders dan gaan de messages niet werken dit moet je doen


typ dit in je terminal: composer require laracasts/flash


hieronder is niet perse nodig dit heb ik al gedaan. misschien wel eventueel controlleren.

daarna moet je in de service provider die hier staat -> config/app.php
je moet 2 dingen veranderen daarna werkt het.(let goed op de namen providers en aliases die staan in hetzelfde bestand)

'providers' => [
    'Laracasts\Flash\FlashServiceProvider'
];




'aliases' => [
    'Flash' => 'Laracasts\Flash\Flash'
];