const backupData = {
  "data": {
    "rows": [
      {"tableRank":1,"teamLongname":"EC KAC","gamesPlayed":21,"gamesWon":16,"gamesWonInOt":3,"gamesLostInOt":1,"gamesTied":0,"gamesLost":1,"goalsFor":122,"goalsAgainst":43,"goalDifference":"+79","points":55},
      {"tableRank":2,"teamLongname":"SPG OHA / LAS","gamesPlayed":23,"gamesWon":16,"gamesWonInOt":0,"gamesLostInOt":0,"gamesTied":0,"gamesLost":7,"goalsFor":190,"goalsAgainst":56,"goalDifference":"+134","points":48},
      {"tableRank":3,"teamLongname":"EC IDM VSV","gamesPlayed":20,"gamesWon":15,"gamesWonInOt":0,"gamesLostInOt":1,"gamesTied":0,"gamesLost":4,"goalsFor":115,"goalsAgainst":48,"goalDifference":"+67","points":46},
      {"tableRank":4,"teamLongname":"Eishockey Akademie Steiermark","gamesPlayed":22,"gamesWon":12,"gamesWonInOt":1,"gamesLostInOt":3,"gamesTied":0,"gamesLost":6,"goalsFor":134,"goalsAgainst":73,"goalDifference":"+61","points":41},
      {"tableRank":5,"teamLongname":"EC Red Bull Salzburg","gamesPlayed":21,"gamesWon":9,"gamesWonInOt":2,"gamesLostInOt":0,"gamesTied":0,"gamesLost":10,"goalsFor":99,"goalsAgainst":87,"goalDifference":"+12","points":31},
      {"tableRank":6,"teamLongname":"HC TIWAG Innsbruck - Die Haie","gamesPlayed":20,"gamesWon":9,"gamesWonInOt":1,"gamesLostInOt":0,"gamesTied":0,"gamesLost":10,"goalsFor":94,"goalsAgainst":92,"goalDifference":"+2","points":29},
      {"tableRank":7,"teamLongname":"EV Vienna Capitals","gamesPlayed":21,"gamesWon":6,"gamesWonInOt":1,"gamesLostInOt":2,"gamesTied":0,"gamesLost":12,"goalsFor":94,"goalsAgainst":82,"goalDifference":"+12","points":22},
      {"tableRank":8,"teamLongname":"Steel Wings Linz","gamesPlayed":21,"gamesWon":2,"gamesWonInOt":0,"gamesLostInOt":1,"gamesTied":0,"gamesLost":18,"goalsFor":87,"goalsAgainst":151,"goalDifference":"-64","points":7},
      {"tableRank":9,"teamLongname":"Ultras Spittal","gamesPlayed":17,"gamesWon":0,"gamesWonInOt":0,"gamesLostInOt":0,"gamesTied":0,"gamesLost":17,"goalsFor":14,"goalsAgainst":317,"goalDifference":"-303","points":0}
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

renderTabelle(backupData);
