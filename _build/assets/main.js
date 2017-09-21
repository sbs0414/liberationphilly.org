function showDiv() {
  document.getElementById('hidden_form').style.display = "block";
  document.getElementById("dim-box").style.display = "block";
}

function hideDiv() {
  document.getElementById('hidden_form').style.display = "none";
  document.getElementById("dim-box").style.display = "none";
}

function clearField() {
  document.getElementById('email-field').value = "";
}
