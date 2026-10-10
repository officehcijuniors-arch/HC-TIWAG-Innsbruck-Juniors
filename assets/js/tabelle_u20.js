const newData = {
  "data": {
    "rows": [
      {"tableRank":1,"teamLongname":"EC IDM VSV","gamesPlayed":7,"gamesWon":6,"gamesWonInOt":1,"gamesLostInOt":0,"gamesLost":0,"goalsFor":29,"goalsAgainst":18,"goalDifference":"+11","points":20},
      {"tableRank":2,"teamLongname":"EV Vienna Capitals","gamesPlayed":7,"gamesWon":4,"gamesWonInOt":0,"gamesLostInOt":0,"gamesLost":3,"goalsFor":19,"goalsAgainst":16,"goalDifference":"+3","points":12},
      {"tableRank":3,"teamLongname":"Vasas SC","gamesPlayed":5,"gamesWon":3,"gamesWonInOt":0,"gamesLostInOt":0,"gamesLost":2,"goalsFor":20,"goalsAgainst":15,"goalDifference":"+5","points":9},
      {"tableRank":4,"teamLongname":"DVTK Jegesmedvek Jegkorong Sportakademia","gamesPlayed":5,"gamesWon":2,"gamesWonInOt":1,"gamesLostInOt":1,"gamesLost":1,"goalsFor":19,"goalsAgainst":16,"goalDifference":"+3","points":9},
      {"tableRank":5,"teamLongname":"Hiti Academy Bled Hawks","gamesPlayed":7,"gamesWon":2,"gamesWonInOt":0,"gamesLostInOt":1,"gamesLost":4,"goalsFor":21,"goalsAgainst":27,"goalDifference":"-6","points":7},
      {"tableRank":6,"teamLongname":"HC TIWAG Innsbruck - Die Haie","gamesPlayed":5,"gamesWon":2,"gamesWonInOt":0,"gamesLostInOt":0,"gamesLost":3,"goalsFor":14,"goalsAgainst":17,"goalDifference":"-3","points":6},
      {"tableRank":7,"teamLongname":"Nordic Hockey Academy","gamesPlayed":6,"gamesWon":2,"gamesWonInOt":0,"gamesLostInOt":0,"gamesLost":4,"goalsFor":11,"goalsAgainst":16,"goalDifference":"-5","points":6},
      {"tableRank":8,"teamLongname":"Okanagan Hockey Academy","gamesPlayed":6,"gamesWon":1,"gamesWonInOt":0,"gamesLostInOt":0,"gamesLost":5,"goalsFor":13,"goalsAgainst":21,"goalDifference":"-8","points":3}
    ]
  }
};

function renderTabelle(data) {
  const tbody = $("#tabelle");
  tbody.empty();
  data.data.rows.forEach(team => {
    const innsbruck = team.teamLongname.includes("Innsbruck") ? "innsbruck-zeile" : "";
    tbody.append(`
      <tr class="${innsbruck}">
        <td data-label="Rang">${team.tableRank}</td>
        <td data-label="Team">${team.teamLongname}</td>
        <td data-label="Spiele">${team.gamesPlayed}</td>
        <td data-label="Siege">${team.gamesWon}</td>
        <td data-label="OT-Siege">${team.gamesWonInOt}</td>
        <td data-label="OT-Niederl.">${team.gamesLostInOt}</td>
        <td data-label="Niederl.">${team.gamesLost}</td>
        <td data-label="Tore">${team.goalsFor}:${team.goalsAgainst}</td>
        <td data-label="Tordiff.">${team.goalDifference}</td>
        <td data-label="Punkte" class="punkte">${team.points}</td>
      </tr>
    `);
  });
}

renderTabelle(newData);
