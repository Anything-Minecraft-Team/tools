(function(){
    $.getJSON("./hosts.json", function(json) {
        let i;
        const hosts = [];
        for (i = 0; i < json.length; i++) {
            hosts.push(`<a href="${json[i].website}" target="_blank">${json[i].host}</a>`);
        }
        hosts.sort();
        for (i = 0; i < hosts.length; i++) {
            const host = document.createElement("li");
            host.classList.add("list-group-item");
            host.setAttribute("id", "host-id-" + i);
            document.getElementsByClassName("list-group")[0].appendChild(host);

            const hover = document.createElement("div");
            hover.innerHTML = hosts[i];
            document.getElementById("host-id-" + i).appendChild(hover);
            console.log(host);
        }
    })
})();
