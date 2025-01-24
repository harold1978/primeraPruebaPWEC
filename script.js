// Recuperamos los datos del almacenamiento local al cargar la página
let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
let asistencia = JSON.parse(localStorage.getItem('asistencia'))||[];

let nuevoEstudiante = {};
let nuevaAsistencia={};


// Función para guardar los datos en localStorage
function guardaEstudiante() {
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
}
function guardaAsistencia(){
    localStorage.setItem('asistencia',JSON.stringify(asistencia));
}

// Función para agregar un nuevo estudiante
function agregaEstudiante() {
    nuevoEstudiante.id = document.getElementById('idEstudiante').value.trim();
    nuevoEstudiante.nombre= document.getElementById('newStudentName').value.trim();
    //const studentName = document.getElementById('newStudentName').value.trim();
    //const fechaActual = new Date().toLocaleDateString();
    //const estudianteActual = attendance[nuevoEstudiante.id];
        if(nuevoEstudiante){// && !attendance[nuevoEstudiante.id]){
            const actual = estudiantes.find(est=>est.id==nuevoEstudiante.id);
            if(!actual){
                estudiantes.push({id:nuevoEstudiante.id,nombre:nuevoEstudiante.nombre}); //, status: null, date: null }); 
                guardaEstudiante(); // Guardamos los cambios en localStorage
      //          renderStudentList(); // Volvemos a renderizar la lista de estudiantes

            }else{
                alert("estudiante ya existe");
            }
            document.getElementById('newStudentName').value = ''; // Limpiar el campo de entrada
            document.getElementById('idEstudiante').value = '';
        }
}

// Función para eliminar un estudiante
function removeStudent(id) {
    estudiantes = estudiantes.filter(est=>est.id!==id);

        guardaEstudiante(); // Guardamos los cambios en localStorage
        //renderStudentList(); // Volvemos a renderizar la lista de estudiantes
        document.getElementById('idEstudiante').value = '';
}

// Función para marcar la estudiantes de un estudiante
function markAttendance(id, status) {
    const currentDate = new Date().toLocaleDateString(); // Obtenemos la fecha actual
    const aux = asistencia.find(asist=>asist.id==id && asist.fecha==currentDate && asist.status==status);
    if(aux){
        alert('la asistencia ya fue registrada');
        return;
    }
    const aux2 = asistencia.find(asist=>asist.id==id && asist.fecha==currentDate);
    if(aux2){
        for(let asist of asistencia){
            if(asist.id == aux2.id && asist.fecha==currentDate){
                asist.status = status;
                break;
            }
        }
        guardaAsistencia();
        alert("Estudiante con Id: "+id + " ha sido marcado como " + status + " el " + currentDate);
        return;
    }
    asistencia.push({id:id,status:status,fecha:currentDate});
   // asistencia[student].status = status;
   // estudiantes[student].date = currentDate; // Guardamos la fecha de estudiantes

    guardaAsistencia(); // Guardamos los cambios en localStorage
    alert("Estudiante con Id: "+id + " ha sido marcado como " + status + " el " + currentDate);
}

// Función para mostrar un resumen de la estudiantes
function showSummary() {
    document.getElementById("summary").innerHTML="";
    estudiantes.forEach(estud=>{
        const li = document.createElement('div');
        li.textContent = `${estud.id}--${estud.nombre}`;
        const ul = document.createElement('div');
        ul.className="segundo";
        const lista = asistencia.filter(a=>a.id==estud.id);
        lista.forEach(asist=>{
            const li2 = document.createElement('div');
            
            li2.textContent = `${asist.fecha}::${asist.status}`;
            ul.appendChild(li2);
        });
        li.appendChild(ul);
        document.getElementById("summary").appendChild(li);
    });

    // let summary = "";

    // for (let estudiante in estudiantes) {
    //     const { id, nombre } = estudiante;
    //     summary += `<li>${estudiante.id}--${estudiante.nombre}</li>`;
    //     summary += `<li>${estudiante.id}: ${status === null ? "No registrado" : status} (Fecha: ${date || "No registrada"})</li>`;
    // }

    // summary += "</ul>";
    // document.getElementById("summary").innerHTML = summary;
}

// Función para renderizar la lista de estudiantes en la tabla
function renderStudentList() {
    const tableBody = document.getElementById('studentsList');
    tableBody.innerHTML = ''; // Limpiamos la tabla antes de renderizarla
    const fechaactual =new Date().toLocaleDateString();
    estudiantes.forEach((student,index)=>{
        const row = document.createElement('tr');
        // Crear celdas para el nombre del estudiante, los botones de estudiantes y los botones de eliminación
        const studentCell = document.createElement('td');
        studentCell.textContent = student.id;
        const studentCellNombre = document.createElement('td');
        studentCellNombre.textContent = student.nombre;
        const attendanceCell = document.createElement('td');
        attendanceCell.innerHTML = `
            <button onclick="markAttendance('${student.id}', 'presente')">Presente</button>
            <button onclick="markAttendance('${student.id}', 'ausente')">Ausente</button>
        `;
        const dateCell = document.createElement('td');
        //const { date } = student;
        dateCell.textContent = fechaactual;//date || "No registrada"; // Si no se ha marcado la estudiantes, mostramos "No registrada"
    
        const actionCell = document.createElement('td');
        actionCell.innerHTML = `<button onclick="eliminaAsistencia('${student.id}')">Eliminar</button>`;
    
        // Añadir las celdas a la fila
        row.appendChild(studentCell);
        row.appendChild(studentCellNombre);
        row.appendChild(attendanceCell);
        row.appendChild(dateCell);
        row.appendChild(actionCell);
    
        // Agregar la fila a la tabla
        tableBody.appendChild(row);

    });

}

// Si hay datos en el almacenamiento local, los mostramos al cargar la página
//renderStudentList();
