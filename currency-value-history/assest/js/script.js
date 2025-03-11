$(document).ready(function (){
    $("#display").click(getcurrency);
    $("#clear").click(clearform);
});

let myChart0; 

async function getcurrency(){
    "use strict";
    let form = $("#myform");

    if(form.valid()){
        let basecurrency = document.getElementById("basecurrency").value;
        let convertcurrency = document.getElementById("convertcurrency").value;
        let apikey = "YOUR_NEW_API_KEY";
        let fromdate = document.getElementById("fromdate").value;
        let todate = document.getElementById("todate").value;

        let mylink = `https://api.polygon.io/v2/aggs/ticker/C:${basecurrency}${convertcurrency}/range/1/day/${fromdate}/${todate}?apiKey=${apikey}`;

        let response = await fetch(mylink);

        if (response.ok){
            let data = await response.json();
            
            if (!data.result || data.results.length == 0){
                alert("No Data found from the currency you've selected");
                return;

            }

            let labels = [];
            let datapoints=[];

            data.results.forEach(item =>{
                let data = new Date(item.t);
                labels.push(`${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`);
                datapoints.push(parseFloat(item.c).toFixed(3));

            });
            let ctx0 = document.getElementById("chartjs-0").getContext('2d');

            if (myChart0){
                myChart0.destroy();
            }
            myChart0 = new Chart (ctx0, {
                type:"line", 
                data: {
                    labels: labels, 
                    datasets: [{ 
                        label: `One (${basecurrency} to ${convertcurrency})`,
                        data: datapoints, 
                        fill: false, 
                        borderColor: "rgb(75, 192, 192)",
                        lineTension: 0.1
                    }]
                }, 
                options: {
                    responsive: true, 
                    maintainAspectRatio: false, 
                    title: {
                        display:true, 
                        text:`${basecurrency} to ${convertcurrency}`
                    },
                    scales:{
                        yAxes: [{
                            scaleLabel: {
                                display: true, 
                                labelString: `${convertcurrency}`
                            },
                        }]
                    }
                }
            });
            
        } else{
            alert("Data not found! Status: " + response.status);
        }
    

        

    }
}

function clearform(){
    "use strict"; 
    $("#basecurrency").val("");
    $("#convertcurrency").val("");
    $("#fromdate").val("");
    $("#todate").val(""); 

    if (myChart0){
        myChart0.destroy();
        myChart0=null;
    }
    
}