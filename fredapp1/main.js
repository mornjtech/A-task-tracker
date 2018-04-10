document.getElementById('taskInputForm').addEventListener('submit', saveTask);

function saveTask(e) {
  var taskDesc = document.getElementById('taskDescInput').value;
  var taskSeverity = document.getElementById('taskSeverityInput').value;
  var taskAssignedTo = document.getElementById('taskAssignedToInput').value;
  var taskId = chance.guid();
  var taskStatus = 'Open';

  var task = {
    id: taskId,
    description: taskDesc,
    severity: taskSeverity,
    assignedTo: taskAssignedTo,
    status: taskStatus
  }

  if (localStorage.getItem('tasks') == null) {
    var tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  document.getElementById('taskInputForm').reset();

  fetchTasks();

  e.preventDefault();
}

function setStatusClosed(id) {
  var tasks = JSON.parse(localStorage.getItem('tasks'));

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i].status = 'Closed';
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  fetchtasks();
}

function deleteTask(id) {
  var tasks = JSON.parse(localStorage.getItem('tasks'));

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks.splice(i, 1);
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  fetchtasks();
}

function fetchTasks() {
  var tasks = JSON.parse(localStorage.getItem('tasks'));
  var tasksListe = document.getElementById('tasksList');

  tasksList.innerHTML = '';

  for (var i = 0; i < tasks.length; i++) {
    var id = tasks[i].id;
    var desc = tasks[i].description;
    var severity = tasks[i].severity;
    var assignedTo = tasks[i].assignedTo;
    var status = tasks[i].status;

    tasksList.innerHTML +=   '<div class="well">'+
                              '<h6>task ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deletetask(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
  }
}
