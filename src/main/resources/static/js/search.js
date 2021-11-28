$( ".search" ).on("click", function() {
    var results = [];
    var location = document.getElementById("location").value;
    var cpu = document.getElementById("cpu").value;
    var ip = document.getElementById("dedicated-ip").checked;
    var sla = document.getElementById("sla").checked;
    var panel = document.getElementById("panel").value;
    var storage = document.getElementById("storage").value;
    var budget = document.getElementById("budget").value;
    var backups = document.getElementById("backups").value;

    /**var strict_location = document.getElementById("strict-location").checked;
     var strict_cpu = document.getElementById("strict-cpu").checked;
     var strict_ip = document.getElementById("strict-dedicated-ip").checked;
     var strict_sla = document.getElementById("strict-sla").checked;
     var strict_panel = document.getElementById("strict-panel").checked;
     var strict_storage = document.getElementById("strict-storage").checked;
     var strict_budget = document.getElementById("strict-budget").checked;
     var strict_backups = document.getElementById("strict-backups").checked;**/

    var strict_location = false, strict_cpu = false, strict_ip = false, strict_sla = false, strict_panel = false, strict_storage = false, strict_budget = false, strict_backups = false;
    /**
     https://atlasnode.net/minecraft
     https://aquatis.host/minecraft-hosting/
     **/
    $.getJSON("./hosts.json", function(json) {
        let i;
        document.getElementsByClassName("results")[0].innerHTML = "Searching...";
        var score;
        var matches;
        HOSTS:
            for (i = 0; i < json.length; i++) {
                console.log(json[i].host);
                PLANS:
                    for (var e = 0; e < json[i].plans.length; e++) {
                        var outof = 6;
                        score = 0;
                        matches = [];
                        var foundlocation = false;
                        var foundcpu = false;
                        console.log(json[i].plans[e].plan);
                        CPU:
                            for (let a = 0; a < json[i].plans[e].cpu.length; a++) {
                                if(json[i].plans[e].cpu[a].includes(cpu) || cpu === "any"){
                                    score += 1;
                                    matches.push("CPU: ✔️<br>");
                                    foundcpu = true;
                                    break CPU;
                                }
                            }
                        if(!foundcpu){
                            matches.push("CPU: ❌<br>");
                            if(strict_cpu){
                                continue PLANS;
                            }
                        }
                        if(json[i].plans[e].panel.includes(panel) || panel === "any"){
                            score += 1;
                            matches.push("Panel: ✔️<br>");
                        } else {
                            matches.push("Panel: ❌<br>");
                            if(strict_panel){
                                continue PLANS;
                            }
                        }
                        if(json[i].plans[e].storage.backups >= backups || backups === ""){
                            score += 1;
                            matches.push("Backups: ✔️<br>");
                        } else {
                            matches.push("Backups: ❌<br>");
                            if(strict_backups){
                                continue PLANS;
                            }
                        }
                        if(json[i].plans[e].storage.storage >= storage || storage === ""){
                            score += 1;
                            matches.push("Storage: ✔️<br>");
                        } else {
                            matches.push("Storage: ❌<br>");
                            if(strict_storage){
                                continue PLANS;
                            }
                        }
                        if(json[i].plans[e].price.permonth * json[i].plans[e].ram[0] <= budget || budget === ""){
                            score += 1;
                            matches.push("Budget: ✔️<br>");
                        } else {
                            matches.push("Budget: ❌<br>");
                            if(strict_budget){
                                continue PLANS;
                            }
                        }
                        LOCATION:
                            for (var o = 0; o < json[i].plans[e].location.length; o++) {
                                if(json[i].plans[e].location.includes(location) || location === "any"){
                                    score += 1;
                                    matches.push("Location: ✔️<br>");
                                    foundlocation = true;
                                    break LOCATION;
                                }
                            }
                        if(!foundlocation){
                            matches.push("Location: ❌<br>");
                            if(strict_location){
                                continue PLANS;
                            }
                        }
                        if(ip && json[i].plans[e].dedicatedip){
                            score += 1;
                            matches.push("Dedicated IP: ✔️<br>");
                        } else if (ip && !json[i].plans[e].dedicatedip){
                            matches.push("Dedicated IP: ❌<br>");
                            if(strict_ip){
                                continue PLANS;
                            }
                        }
                        if(ip){
                            outof += 1;
                        }
                        if(sla && json[i].plans[e].sla){
                            score += 1;
                            matches.push("SLA: ✔️<br>");
                        } else if (sla && !json[i].plans[e].sla){
                            matches.push("SLA: ❌<br>");
                            if(strict_sla){
                                continue PLANS;
                            }
                        }
                        if(sla){
                            outof += 1;
                        }
                        /**var plan = document.createElement("div");
                         plan.classList.add("tooltip");
                         plan.innerHTML = score + `/${outof} ` + json[i].host.link(json[i].website) + ": " + json[i].plans[e].plan + "<br>";
                         plan.setAttribute("id", id);
                         document.getElementById("results").appendChild(plan);
                         var hover = document.createElement("span");
                         hover.classList.add("tooltiptext");
                         for (var a = 0; a < matches.length; a++) {
                    hover.innerHTML = hover.innerHTML + matches[a] + "<br>";
                } target="_blank"
                         document.getElementById(id).appendChild(hover);**/
                        results.push(score + `/${outof} ` + `<a href="${json[i].website}" target="_blank">${json[i].host}</a>` + ": " + json[i].plans[e].plan + "#hover" + matches);
                    }
            }

        results.sort();
        results.reverse();
        document.getElementsByClassName("results")[0].innerHTML = "";
        for (i = 0; i < results.length; i++) {
            const result = results[i].split("#hover");
            const plan = document.createElement("div");
            plan.classList.add("tooltip");
            plan.innerHTML = result[0];
            plan.setAttribute("id", i);
            document.getElementsByClassName("results")[0].appendChild(plan);

            const hover = document.createElement("span");
            hover.classList.add("tooltiptext");
            hover.innerHTML = result[1].replaceAll(",", "");
            document.getElementById(i).appendChild(hover);
            console.log(plan);
        }
    });
});
