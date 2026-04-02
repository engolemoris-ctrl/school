// Utility: Load and Save
function loadData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Students
function loadStudents() {
  const list = document.getElementById("studentList");
  list.innerHTML = "";
  const students = loadData("students");
  students.forEach((s, i) => {
    list.innerHTML += `<li>${s.name} - ${s.class} 
      <button onclick="deleteStudent(${i})">Delete</button></li>`;
  });
}
function addStudent() {
  const name = document.getElementById("studentName").value;
  const studentClass = document.getElementById("studentClass").value;
  if (!name || !studentClass) return alert("Fill all fields");
  const students = loadData("students");
  students.push({ name, class: studentClass });
  saveData("students", students);
  document.getElementById("studentName").value = "";
  document.getElementById("studentClass").value = "";
  loadStudents();
}
function deleteStudent(i) {
  const students = loadData("students");
  students.splice(i, 1);
  saveData("students", students);
  loadStudents();
}

// Teachers
function loadTeachers() {
  const list = document.getElementById("teacherList");
  list.innerHTML = "";
  const teachers = loadData("teachers");
  teachers.forEach((t, i) => {
    list.innerHTML += `<li>${t.name} - ${t.subject} 
      <button onclick="deleteTeacher(${i})">Delete</button></li>`;
  });
}
function addTeacher() {
  const name = document.getElementById("teacherName").value;
  const subject = document.getElementById("teacherSubject").value;
  if (!name || !subject) return alert("Fill all fields");
  const teachers = loadData("teachers");
  teachers.push({ name, subject });
  saveData("teachers", teachers);
  document.getElementById("teacherName").value = "";
  document.getElementById("teacherSubject").value = "";
  loadTeachers();
}
function deleteTeacher(i) {
  const teachers = loadData("teachers");
  teachers.splice(i, 1);
  saveData("teachers", teachers);
  loadTeachers();
}

// Classes
function loadClasses() {
  const list = document.getElementById("classList");
  list.innerHTML = "";
  const classes = loadData("classes");
  classes.forEach((c, i) => {
    list.innerHTML += `<li>${c.name} - Teacher: ${c.teacher} 
      <button onclick="deleteClass(${i})">Delete</button></li>`;
  });
}
function addClass() {
  const name = document.getElementById("className").value;
  const teacher = document.getElementById("classTeacher").value;
  if (!name || !teacher) return alert("Fill all fields");
  const classes = loadData("classes");
  classes.push({ name, teacher });
  saveData("classes", classes);
  document.getElementById("className").value = "";
  document.getElementById("classTeacher").value = "";
  loadClasses();
}
function deleteClass(i) {
  const classes = loadData("classes");
  classes.splice(i, 1);
  saveData("classes", classes);
  loadClasses();
}

// Fees
function loadFees() {
  const list = document.getElementById("feeList");
  list.innerHTML = "";
  const fees = loadData("fees");
  fees.forEach((f, i) => {
    list.innerHTML += `<li>${f.student} - Amount: ${f.amount} 
      <button onclick="deleteFee(${i})">Delete</button></li>`;
  });
}
function addFee() {
  const student = document.getElementById("feeStudent").value;
  const amount = document.getElementById("feeAmount").value;
  if (!student || !amount) return alert("Fill all fields");
  const fees = loadData("fees");
  fees.push({ student, amount });
  saveData("fees", fees);
  document.getElementById("feeStudent").value = "";
  document.getElementById("feeAmount").value = "";
  loadFees();
}
function deleteFee(i) {
  const fees = loadData("fees");
  fees.splice(i, 1);
  saveData("fees", fees);
  loadFees();
}

// Initialize
loadStudents();
loadTeachers();
loadClasses();
loadFees();

// Export All Data (students, teachers, classes, fees)
function exportAllData() {
  const students = loadData("students");
  const teachers = loadData("teachers");
  const classes = loadData("classes");
  const fees = loadData("fees");

  let csvContent = "=== Students ===\nName,Class\n";
  students.forEach(s => {
    csvContent += `${s.name},${s.class}\n`;
  });

  csvContent += "\n=== Teachers ===\nName,Subject\n";
  teachers.forEach(t => {
    csvContent += `${t.name},${t.subject}\n`;
  });

  csvContent += "\n=== Classes ===\nClass Name,Teacher\n";
  classes.forEach(c => {
    csvContent += `${c.name},${c.teacher}\n`;
  });

  csvContent += "\n=== Fees ===\nStudent,Amount\n";
  fees.forEach(f => {
    csvContent += `${f.student},${f.amount}\n`;
  });

  // Create downloadable file
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "school_data_backup.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// Dashboard Summary
function updateDashboard() {
  const students = loadData("students");
  const teachers = loadData("teachers");
  const classes = loadData("classes");
  const fees = loadData("fees");

  // Calculate totals
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalClasses = classes.length;
  const totalFees = fees.reduce((sum, f) => sum + parseFloat(f.amount), 0);

  // Display dashboard
  const dashboardDiv = document.getElementById("dashboard");
  dashboardDiv.innerHTML = `
    <ul>
      <li><strong>Total Students:</strong> ${totalStudents}</li>
      <li><strong>Total Teachers:</strong> ${totalTeachers}</li>
      <li><strong>Total Classes:</strong> ${totalClasses}</li>
      <li><strong>Total Fees Collected:</strong> ${totalFees}</li>
    </ul>
  `;
}

// Call dashboard update whenever data changes
function refreshAll() {
  loadStudents();
  loadTeachers();
  loadClasses();
  loadFees();
  updateDashboard();
}

// Replace individual load calls with refreshAll
refreshAll();

