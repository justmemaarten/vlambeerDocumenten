 $(document).ready(function(){
        try {

        var domains = [
            'aim.com','aol.com','att.net','bellsouth.net','btinternet.com',
            'charter.net','comcast.com', 'comcast.net','cox.net','earthlink.net',
            'gmail.com','googlemail.com','icloud.com','mac.com','me.com','msn.com',
            'optonline.net','optusnet.com.au', 'rocketmail.com','rogers.com','sbcglobal.net',
            'shaw.ca','sympatico.ca','telus.net','verizon.net','ymail.com'];

        var secondLevelDomains = ['yahoo', 'hotmail', 'mail', 'live', 'outlook', 'gmx'];

        var topLevelDomains = ['com', 'com.au', 'com.tw', 'ca', 'co', 'co.nz', 'co.uk', 'de',
            'fl', 'fr', 'it', 'ru', 'net', 'org', 'edu', 'gov', 'jp', 'nl', 'kr', 'se', 'eu',
            'ie', 'co.il', 'us', 'at', 'be', 'dk', 'hk', 'es', 'gr', 'ch', 'no', 'cz',
            'in', 'net', 'net.au', 'info', 'biz', 'mil', 'co.jp', 'sg', 'hu'];

        $('#MERGE0').on('blur', function() {
            var submitBtn = $('input.button:submit')[0];
            if(submitBtn && submitBtn.value == "Subscribe to list"){ // Only show mailcheck warning on english forms.
                $(this).mailcheck({
                    domains: domains,
                    secondLevelDomains: secondLevelDomains,
                    topLevelDomains: topLevelDomains,
                    suggested: function(element, suggestion) {
                        var msg = 'Hmm, did you mean '+suggestion.full+'? If not, carry on.';
                        if ( $('#MERGE0_mailcheck').length == 0 ){
                            element.after('<div id="MERGE0_mailcheck" class="feedback">'+msg+'</div>');
                            element.closest('.field-group').addClass('mailcheck');
                        }
                        var enteredDomain = element[0].value.trim().split('@')[1];
                        ga('send', 'event', 'mailcheck', enteredDomain, suggestion.domain);
                    },
                    empty: function(element) {
                        if ( $('#MERGE0_mailcheck').length > 0 ){
                            $('#MERGE0_mailcheck').remove();
                            element.closest('.field-group').removeClass('mailcheck');
                        }
                        return;
                    }
                });
            }
        });
        } catch(e){ console.log(e); }
    });