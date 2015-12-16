require([
        "dojo/query",
        "dojo/dom",
        "dojo/dom-geometry",
        "dojo/dom-class",
        "dojo/dom-style",
        "dojo/dom-construct",
        "dijit/focus",
        "dojo/parser",
        "dijit/form/DateTextBox",
        "dojo/NodeList-traverse",
        "dojo/domReady!"
    ], function(query, dom, domGeom, domClass, domStyle, domConstruct, focusUtil, parser){

        // Move the focused-field class to the field-group that contains the focused input.
        var handle = focusUtil.watch("curNode", function(name, oldValue, newValue){
            var parent = query(newValue).closest('.field-group');
            if(!domClass.contains(parent, "focused-field")) {
                query('.focused-field').removeClass('focused-field');
                parent.addClass('focused-field');
            }
        });

        // Add error class to parent wrapper and only show error borders on empty fields in addresses
        query('.feedback.error').closest('.field-group').addClass('error');
        query('.addressfield input:text[value=""]').addClass('empty');

        // Focus first input of birthdayfield or phonefield-us when parent wrapper is clicked
        query('div.subfields').on("click", function(e){
            var firstInput = query('input', e.target)[0];
            focusUtil.focus(firstInput);
        });

        // Prevent image blowout in IE6 since it doesn't support max-width
        if (domClass.contains(query('html')[0], "ie-lte7")){

            query('img').forEach(function(node){
                var computedStyle = domStyle.getComputedStyle(node);
                var w = domGeom.getContentBox(node, computedStyle).w;
                console.log(w);
                if(w >= 600){
                    domStyle.set(node, "width", "600px");
                }
            });
        }

        // Use native checkboxes and radio buttons outside the app
        dojo.query(".radio input, .checkbox input").removeAttr("data-dojo-type");

        // Render DateTextBoxes
        parser.parse();

        query('form').on("submit",function(e){
            var invalidDate = dojo.query('.dijitTextBoxError');
            if(invalidDate.length){
                query('.dijitDateTextBox ~ .feedback.error').forEach(domConstruct.destroy);
                invalidDate.forEach(function(node) {
                    domConstruct.place('<div class="feedback error"><div class="errorText">Please enter a valid date</div></div>', node, 'after');
                });
                e.preventDefault();
            }
        });

        twemoji.parse(document.body, { size: 16 });
    });