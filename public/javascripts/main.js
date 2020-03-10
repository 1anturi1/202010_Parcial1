let socket = io.connect("http://localhost:3000", { "forceNew": true });

let mostar = false;
let termine = false;
let empresa = "";


if (!mostar) {
    document.getElementById('btnofertar').disabled = true;
}

function registrarse() {
    deshabForm();
    empresa = document.getElementById('razonsocial').value;
    mostar = true;
    habilOfertar();
}

function habilOfertar() {  
    document.getElementById('btnofertar').disabled = false;
}

function ofertar() {

    addPartici(empresa)
    document.getElementById('btnofertar').disabled = true;
    setTimeout(() => {
        if (!termine) {
            document.getElementById('btnofertar').disabled = false;
        }
    }, 30000);
}

socket.on("ofertas", data => {
    console.log(data);
    render(data);
});

function render(data) {
    let html = data.map((e, i) => {if (e.valor.includes("Oferta aceptada")) {
        document.getElementById('btnofertar').disabled = true;
        termine = true;
        return (`
        <div>
            <strong>${e.razonsocial}</strong>
            <strong>${e.valor}</strong>
        </div>
    `);
    }
    else{
        return (`
        <div>
            <strong>${e.razonsocial}</strong>
            <em>${e.valor}</em>
        </div>
    `);
    }
}).join("");
    document.getElementById("campofertas").innerHTML = html;
}



function addPartici(empresa) {    
    console.log("Emmiting new message");
    socket.emit("new-message", empresa);
    return false;
}

function deshabForm() {
    frm = document.forms['formulario'];
    for (i = 0; ele = frm.elements[i]; i++)
        ele.disabled = true;
}


