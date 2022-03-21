// on-load
var originalMeats;

window
  .fetch('meats.json') // fetch our meat data
  .then((r) => r.json())
  .then((response) => {
    originalMeats = response.data;
    putMeatInTable(originalMeats);
  });

// functions

function searchMeats(term) {
  const searchValue = document.getElementById('searchTerm').value;
  clearTable();
  putMeatInTable(
    originalMeats.filter((m) =>
      m.Meat.toLowerCase().includes(searchValue.toLowerCase())
    )
  );
}

function clearTable() {
  var table = document.getElementById('meat-list');
  var rowCount = table.rows.length;
  // clear
  for (var i = rowCount - 1; i > 0; i--) {
    table.deleteRow(1);
  }
}

function putMeatInTable(data) {
  var tbody = document.getElementById('meat-list-body');

  // populate
  for (const meat of data) {
    var row = tbody.insertRow();
    var meatCell = row.insertCell();
    meatCell.appendChild(document.createTextNode(meat.Meat));

    var categoryCell = row.insertCell();
    categoryCell.appendChild(document.createTextNode(meat.Category));

    var tempCell = row.insertCell();
    tempCell.appendChild(
      document.createTextNode(
        meat.CookerRange.Low + ' - ' + meat.CookerRange.High
      )
    );

    var timeCell = row.insertCell();
    timeCell.appendChild(document.createTextNode(meat.RelativeTime));

    var targetTempCell = row.insertCell();
    targetTempCell.appendChild(
      document.createTextNode(
        meat.TargetRange.Text ||
          meat.TargetRange.Low + ' - ' + meat.TargetRange.High
      )
    );
  }
}
