$("#myform").validate({
    
});

function calculate(){
    "use strict"
     if ($("#myform").valid()){
        let fromvalue = document.getElementById("fromvalue").value;
        let tovalue = document.getElementById("tovalue").value;

        let fromvaluefp = parseFloat(fromvalue);
        let tovaluefp = parseFloat(tovalue);

        let value;
            if (document.getElementById("fromcentimenters").checked){
                value = "cm";
        }
        if (document.getElementById("frommmeters").checked){
            value = "m";
        }

        if (document.getElementById("fromkilometers").checked){
            value = "km";
        }

        if (document.getElementById("frominches").checked){
            value = "in";
        }

        if (document.getElementById("fromfeet").checked){
            value = "ft";
        }
        if (document.getElementById("fromyards").checked){
            value = "yd";
        }
        if (document.getElementById("frommiles").checked){
            value = "mi";
        }

         let value;
            if (document.getElementById("fromcentimenters").checked){
                value = "cm";
        }
        if (document.getElementById("frommmeters").checked){
            value = "m";
        }

        if (document.getElementById("fromkilometers").checked){
            value = "km";
        }

        if (document.getElementById("frominches").checked){
            value = "in";
        }

        if (document.getElementById("fromfeet").checked){
            value = "ft";
        }
        if (document.getElementById("fromyards").checked){
            value = "yd";
        }
        if (document.getElementById("frommiles").checked){
            value = "mi";
        }

         let value;
            if (document.getElementById("fromcentimenters").checked){
                value = "cm";
        }
        if (document.getElementById("frommmeters").checked){
            value = "m";
        }

        if (document.getElementById("fromkilometers").checked){
            value = "km";
        }

        if (document.getElementById("frominches").checked){
            value = "in";
        }

        if (document.getElementById("fromfeet").checked){
            value = "ft";
        }
        if (document.getElementById("fromyards").checked){
            value = "yd";
        }
        if (document.getElementById("frommiles").checked){
            value = "mi";
        } 
        let tovalue;
        if (document.getElementById("tocentimenters").checked){
            value = "cm";
        }
        if (document.getElementById("tometers").checked){
        value = "m";
        }

        if (document.getElementById("tokilometers").checked){
        value = "km";
        }

        if (document.getElementById("toinches").checked){
            value = "in";
        }

        if (document.getElementById("tofeet").checked){
            value = "ft";
        }
        if (document.getElementById("toyards").checked){
            value = "yd";
        }
        if (document.getElementById("tomiles").checked){
            value = "mi";
        }

        let result;

            if (operator == "cm"){
                result = fromvaluefp + operand2fp;
            }
            else if (operator == "minus"){
                result = operand1fp - operand2fp;
            }
            else if (operator == "multiply"){
                result = operand1fp * operand2fp;
            }
            else if (operator == "divided"){
                result = operand1fp / operand2fp;
            }

            document.getElementById("Result").innerHTML = result.toString();

        

     }
}